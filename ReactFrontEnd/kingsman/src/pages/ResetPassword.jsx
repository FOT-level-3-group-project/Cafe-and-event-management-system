import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../image/logo.png';
import { Alert, Button, Label, Spinner, TextInput } from 'flowbite-react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { resetPasswordStart, resetPasswordSuccess, resetPasswordFailure } from '../redux/user/userSlice';

function ResetPassword(){
    const [username, setUsername] = useState('');
    const [otp, setOtp] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [email, setEmail] = useState('');
    const [showOtpForm, setShowOtpForm] = useState(false);
    const [showPasswordForm, setShowPasswordForm] = useState(false);
    const [error, setError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [requirementsMet, setRequirementsMet] = useState({
        length: false,
        uppercase: false,
        lowercase: false,
        numberOrSpecialChar: false
    });
    const dispatch = useDispatch();
    const navigate = useNavigate();

    //Getting username
    const handleSubmitUsername = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8080/reset-password-request', { username });
            setEmail(response.data.email); 
            alert("OTP sent to your email address. Please check your email.");
            setShowOtpForm(true);
        } catch (error) {
            setError('Error:', error);
            dispatch(setResetPasswordError(error));
        }
    };

//Getting OTP
  const handleSubmitOtp = async (e) => {
  e.preventDefault();
  try {
    const response = await axios.post('http://localhost:8080/verify-otp', { 
      username,
      otp 
    });
    if (response.data.includes("verified successfully")) {
      setShowPasswordForm(true);
    } else {
      alert('Invalid OTP, please try again.');
    }
  } catch (error) {
    alert('Error:', error);
  }
};

//Getting new password
  const handleSubmitPassword = async (e) => {
    e.preventDefault();
    try {
       // Password validation logic
      if (!validatePassword(newPassword)) {
        alert('Password must have at least 6 characters, one uppercase letter, one lowercase letter, and one number or special character.');
        return;
      }
      if (newPassword !== confirmPassword) {
        alert('Passwords do not match.');
        return;
      }

      const response = await axios.post('http://localhost:8080/reset-password', {
        username,
        newPassword,
        confirmPassword
        });
console.log('Response data:', response.data); // Log the response data to the console
    if (response.data.includes("Password reset successful")) {
      alert('Password reset successful!');
      navigate('/login');
    } else {
      alert('Password reset failed. Please try again.');
    }
  } catch (error) {
    alert('Error:', error);
  }
};

 const validatePassword = (password) => {
    // Password must have at least 6 characters, one uppercase letter, one lowercase letter, and one number or special character
    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z!@#$%^&*()_+]).{6}$/;
    return passwordRegex.test(password);
  };

 const handlePasswordChange = (e) => {
    const { value } = e.target;
    setNewPassword(value);

    // Password requirements validation
    setRequirementsMet({
      length: value.length >= 6,
      uppercase: /[A-Z]/.test(value),
      lowercase: /[a-z]/.test(value),
      numberOrSpecialChar: /[\d!@#$%^&*()_+]/.test(value)
    });
    setPasswordError('');
  };
const clearFieldsUsername = () => {
    setUsername('');
  };

const clearFieldsOTP = () => {
    setOtp('');
  };

   const clearFieldsPwd = () => {
    setNewPassword('');
    setConfirmPassword('');
    setError('');
    setPasswordError('');
    setRequirementsMet({
      length: false,
      uppercase: false,
      lowercase: false,
      numberOrSpecialChar: false
    });
    setShowNewPassword(false);
    setShowConfirmPassword(false);
  };

//   return (
//         <div className="container mx-auto">
//             <h1 className="text-3xl font-bold text-center mt-8 mb-4">Forgot Password</h1>
//             {!showOtpForm && !showPasswordForm && (
//                 <form onSubmit={handleSubmitUsername} className="flex flex-col gap-4">
//                     <label>
//                         Username:
//                         <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} className="border border-gray-300 p-2 rounded" />
//                     </label>
//                     <button type="button" onClick={clearFieldsUsername} className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded">Clear</button>
//                     <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Submit</button>
//                 </form>
//             )}
//             {showOtpForm && !showPasswordForm && (
//                 <form onSubmit={handleSubmitOtp} className="flex flex-col gap-4">
//                     <label>
//                         OTP:
//                         <input type="text" value={otp} onChange={(e) => setOtp(e.target.value)} className="border border-gray-300 p-2 rounded" />
//                     </label>
//                     <button type="button" onClick={clearFieldsOTP} className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded">Clear</button>
//                     <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Submit</button>
//                 </form>
//             )}
//             {showPasswordForm && (
//                 <form onSubmit={handleSubmitPassword} className="flex flex-col gap-4">
//                     <label>
//                         New Password:
//                         <input type={showNewPassword ? 'text' : 'password'} value={newPassword} onChange={handlePasswordChange} className="border border-gray-300 p-2 rounded" />
//                     </label>
//                     {newPassword && (
//                         <ul className="list-disc pl-4">
//                             <li className={requirementsMet.length ? 'text-green-500' : 'text-red-500'}>Password must have at least 6 characters</li>
//                             <li className={requirementsMet.uppercase ? 'text-green-500' : 'text-red-500'}>Password must contain at least one uppercase letter</li>
//                             <li className={requirementsMet.lowercase ? 'text-green-500' : 'text-red-500'}>Password must contain at least one lowercase letter</li>
//                             <li className={requirementsMet.numberOrSpecialChar ? 'text-green-500' : 'text-red-500'}>Password must contain at least one number or special character</li>
//                         </ul>
//                     )}
//                     {passwordError && <div className="text-red-500">{passwordError}</div>}
//                     <label>
//                         Confirm Password:
//                         <input type={showConfirmPassword ? 'text' : 'password'} value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} className="border border-gray-300 p-2 rounded" />
//                     </label>
//                     <div>
//                         <input type="checkbox" id="showPassword" checked={showNewPassword} onChange={() => setShowNewPassword(!showNewPassword)} className="mr-2" />
//                         <label htmlFor="showNewPassword">Show New Password</label>
//                     </div>
//                     <div>
//                         <input type="checkbox" id="showConfirmPassword" checked={showConfirmPassword} onChange={() => setShowConfirmPassword(!showConfirmPassword)} className="mr-2" />
//                         <label htmlFor="showConfirmPassword">Show Confirm Password</label>
//                     </div>
//                     <button type="button" onClick={clearFieldsPwd} className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded">Clear</button>
//                     <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Submit</button>
//                 </form>
//             )}
//         </div>
//     );

 return (
    <div className='min-h-screen mt-20'>
        <div className= 'flex p-3 max-w-3xl mx-auto flex-col md:flex-row md:items-center'>
            <div>
                {/* left side */}
                <div className='flex-1'>
                    <img src={logo} alt='logo' className='w-80 h-80' />
                </div>

                {/* right side */}
                <div className='flex-1'>
                    <h1 className="text-3xl font-bold text-center mt-8 mb-4">Forgot Password</h1>

                    {!showOtpForm && !showPasswordForm && (
                        <form onSubmit={handleSubmitUsername} className="flex flex-col gap-4">
                            <label>
                                Username:
                                <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} className="border border-gray-300 p-2 rounded" />
                            </label>
                            <button type="button" onClick={clearFieldsUsername} className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded">Clear</button>
                            <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Submit</button>
                        </form>
                    )}   
                </div>
            </div>
           
            <div>
                {showOtpForm && !showPasswordForm && (
                    <form onSubmit={handleSubmitOtp} className="flex flex-col gap-4">
                        <label>
                            OTP:
                            <input type="text" value={otp} onChange={(e) => setOtp(e.target.value)} className="border border-gray-300 p-2 rounded" />
                        </label>
                            <button type="button" onClick={clearFieldsOTP} className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded">Clear</button>
                            <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Submit</button>
                        </form>
                    )}
            </div>
                    


            {showPasswordForm && (
                <form onSubmit={handleSubmitPassword} className="flex flex-col gap-4">
                    <label>
                        New Password:
                        <input type={showNewPassword ? 'text' : 'password'} value={newPassword} onChange={handlePasswordChange} className="border border-gray-300 p-2 rounded" />
                    </label>
                    {newPassword && (
                        <ul className="list-disc pl-4">
                            <li className={requirementsMet.length ? 'text-green-500' : 'text-red-500'}>Password must have at least 6 characters</li>
                            <li className={requirementsMet.uppercase ? 'text-green-500' : 'text-red-500'}>Password must contain at least one uppercase letter</li>
                            <li className={requirementsMet.lowercase ? 'text-green-500' : 'text-red-500'}>Password must contain at least one lowercase letter</li>
                            <li className={requirementsMet.numberOrSpecialChar ? 'text-green-500' : 'text-red-500'}>Password must contain at least one number or special character</li>
                        </ul>
                    )}
                    {passwordError && <div className="text-red-500">{passwordError}</div>}
                    <label>
                        Confirm Password:
                        <input type={showConfirmPassword ? 'text' : 'password'} value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} className="border border-gray-300 p-2 rounded" />
                    </label>
                    <div>
                        <input type="checkbox" id="showPassword" checked={showNewPassword} onChange={() => setShowNewPassword(!showNewPassword)} className="mr-2" />
                        <label htmlFor="showNewPassword">Show New Password</label>
                    </div>
                    <div>
                        <input type="checkbox" id="showConfirmPassword" checked={showConfirmPassword} onChange={() => setShowConfirmPassword(!showConfirmPassword)} className="mr-2" />
                        <label htmlFor="showConfirmPassword">Show Confirm Password</label>
                    </div>
                    <button type="button" onClick={clearFieldsPwd} className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded">Clear</button>
                    <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Submit</button>
                </form>
            )}
            </div>
        </div>
    );


}

export default ResetPassword;