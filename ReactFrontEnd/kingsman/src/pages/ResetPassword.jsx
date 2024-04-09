import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../image/logo.png';
import { Alert, Button, Label, Spinner, TextInput } from 'flowbite-react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
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

    //Show password visibility
    const toggleNewPasswordVisibility = () => {
        setShowNewPassword(!showNewPassword);
    };

    const toggleConfirmPasswordVisibility = () => {
        setShowConfirmPassword(!showConfirmPassword);
    };


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
            dispatch(resetPasswordFailure(error));
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
                dispatch(resetPasswordFailure('Invalid OTP, please try again.'));
            }
        } catch (error) {
            dispatch(resetPasswordFailure(error));
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
                dispatch(resetPasswordFailure('Password reset failed. Please try again.'));
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

  return (
        <div className='min-h-screen mt-20'>
            <div className='flex p-3 max-w-3xl mx-auto flex-col md:flex-row md:items-center'>

                {/* Left side */}
                {/* <div className='flex-1'>
                    <img src={logo} alt='logo' className='w-80 h-80' />
                </div> */}

                {/* Right side */}
                <div className='flex-1 flex justify-center '>
                    
                    {/* Username Form */}
                    {!showOtpForm && !showPasswordForm && (
                        <form onSubmit={handleSubmitUsername} className="flex flex-col gap-4 w-1/2 border-2 px-2">
                            <h1 className="text-3xl font-bold text-center mt-8 mb-4">Forgot Password</h1>
                            <div>
                                <Label value="Username" />
                                <TextInput type='text' placeholder="Username" id='PRusername' onChange={(e) => setUsername(e.target.value)} value={username || ''} />
                            </div>
                            <button type="submit" className="bg-green-700 hover:bg-green-900 text-white font-bold py-2 px-4 rounded">Send OTP</button>
                            <Link to="/login" className="text-grey-500 mt-4 font-semibold">Go Back</Link> {/* Go Back link */}
                        </form>

                    )}

                    {/* OTP Form */}
                    {showOtpForm && !showPasswordForm && (
                        <form onSubmit={handleSubmitOtp} className="flex flex-col gap-4  w-1/2 border-2 px-2">
                            <h1 className="text-3xl font-bold text-center mt-8 mb-4">Verify OTP </h1>
                            <div>
                                <Label value="OTP" />
                                <TextInput type='text' placeholder="Enter OTP" id='PRotp' onChange={(e) => setOtp(e.target.value)} value={otp || ''} />
                            </div>
                            <button type="submit" className="bg-green-700 hover:bg-green-900 text-white font-bold py-2 px-4 rounded">Verify OTP</button>
                            <Link to="/login" className="text-grey-500 mt-4 font-semibold">Go Back</Link> {/* Go Back link */}
                        </form>
                    )}

                    {/* Password Form */}
                    {showPasswordForm && (
                        <form onSubmit={handleSubmitPassword} className="flex flex-col gap-4 border-2 px-4">
                            <h1 className="text-3xl font-bold text-center mt-8 mb-4">Reset Password</h1>
                            <div>
                                <Label value="New Password" />
                                <TextInput type={showNewPassword ? 'text' : 'password'} placeholder="New Password" id='PRnewPassword' onChange={handlePasswordChange} value={newPassword || ''} />
                                {/* password visibility */}
                                <div className='flex justify-between'>
                                    <span></span>
                                    <Link
                                        type='button'
                                        onClick={toggleNewPasswordVisibility}>
                                        {showNewPassword ? 'Hide Password' : 'Show Password'}
                                    </Link>
                                </div>

                                <Label value="Confirm Password" />
                                <TextInput type={showConfirmPassword ? 'text' : 'password'} placeholder="Confirm Password" id='PRconfirmPassword' onChange={(e) => setConfirmPassword(e.target.value)} value={confirmPassword || ''} />
                                <div className='flex justify-between'>
                                    <span></span>
                                    <Link
                                        type='button'
                                        onClick={toggleConfirmPasswordVisibility}>
                                        {showConfirmPassword ? 'Hide Password' : 'Show Password'}
                                    </Link>
                                </div>
                                
                            </div>
                            <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Reset Password</button>
                            <Link to="/login" className="text-blue-500 mt-4">Go Back</Link> {/* Go Back link */}

                            {/* Password requirements */}
                                <div className='flex flex-col gap-2 mt-4'>
                                    <span className={requirementsMet.length ? 'text-green-500' : 'text-red-500'}>At least 6 characters</span>
                                    <span className={requirementsMet.uppercase ? 'text-green-500' : 'text-red-500'}>At least one uppercase letter</span>
                                    <span className={requirementsMet.lowercase ? 'text-green-500' : 'text-red-500'}>At least one lowercase letter</span>
                                    <span className={requirementsMet.numberOrSpecialChar ? 'text-green-500' : 'text-red-500'}>At least one number or special character</span>
                                </div> 
                        </form>
                    )}
                </div>
            </div>
        </div>
    );
}

export default ResetPassword;