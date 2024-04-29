import React from 'react';
import logo from '../image/logo.png';
import { Alert, Button, Label, Spinner, TextInput } from 'flowbite-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logInStart, logInSuccess, logInFailure } from '../redux/user/userSlice';
import axios from 'axios';
import { Link } from 'react-router-dom';


export default function Login() {
    const [formData, setFormData] = useState({});
    const { loading, error: errorMessage } = useSelector(state => state.user);
    const { currentUser } = useSelector((state) => state.user);
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');
    const [employee, setEmployee] = useState('');

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.id]: e.target.value.trim() })
    };

    console.log(formData);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!formData.username || !formData.password) {
            setError("please enter the username and the password!");
            return;
        }

        console.log(formData);

        try {
            dispatch(logInStart());
            const response = await axios.post('http://localhost:8080/api/user/login', formData);
            console.log(response);
            const data = response.data;
            setEmployee(data);
            console.log("employee", employee);

            if (data.success == false) {
                dispatch(logInFailure(data.message)); //error message
                navigate('/');
                console.log(logInFailure(data.message));
                setError(data.message);
            }

            if (response.status === 200) {
                dispatch(logInSuccess(data));
                console.log("data stored in redux");

                console.log("Position:", employee.position);
                
                    if ((employee.position) === 'manager') { // Check the user's position
                        navigate('/manager?tab=dashboard');
                    } else if ((employee.position) === 'cashier') {
                        navigate('/cashier?tab=dashboard');
                    } else if ((employee.position) === 'chef') {
                        navigate('/chef?tab=dashboard');
                    } else if ((employee.position) === 'waiter') {
                        navigate('/waiter?tab=dashboard');
                    }
                    // else {
                    //     navigate('/updateProfile');
                    // }
            }
        } catch (error) {
            setError("Invalid username or password");
            setFormData({});
        }
    };
    
    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (
        <div className='h-screen '>
            <div className='flex p-3 max-w-3xl mx-auto flex-col md:flex-row md:items-center shadow-lg bg-white mt-40 rounded-lg'>

                {/* left side */}
                <div className='flex-1'>
                    <img src={logo} alt='logo' className='w-80 h-80' />
                </div>

                {/* right side */}
                <div className='flex-1'>
                    <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
                        <div>
                            <Label value='Username' />
                            <TextInput type='text' placeholder='Username' id='username' onChange={handleChange} value={formData.username || ''} />
                        </div>

                        <div>
                            <Label value='Password' />
                            <TextInput type={showPassword ? 'text' : 'password'} placeholder='Password' id='password' onChange={handleChange} value={formData.password || ''} />
                            {/* password visibility */}
                            <div className='flex justify-between'>
                                <span></span>
                                <Link
                                    type='button'
                                    onClick={togglePasswordVisibility}>
                                    {showPassword ? 'Hide Password' : 'Show Password'}
                                </Link>
                            </div>
                        </div>
                        
                        <Button gradientDuoTone='greenToBlue' type='submit' className='mt-4' disabled={loading}>
                            {
                                loading ? (
                                    <>
                                        <Spinner size='sm' />
                                        <span className='pl-3'> Loading ...</span>
                                    </>
                                ) : 'Log in'
                            }
                        </Button>
                        <Link to='/ResetPassword' className="text-red-700 dark:text-slate-400 text-sm"> Forgot Password?</Link>

                    </form>
                    {
                        error && (
                            <Alert className='mt-5' color='failure'>
                                {error}
                            </Alert>
                        )
                    }
                </div>
            </div>
        </div>
    );
}   
