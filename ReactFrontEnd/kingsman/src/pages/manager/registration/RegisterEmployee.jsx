import React, { useEffect, useState } from 'react';
import { Alert, Button, Label, Spinner, TextInput } from 'flowbite-react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Link } from 'react-router-dom'

export default function RegisterEmployee() {
    const [formData, setFormData] = useState({
        first_name: '',
        last_name: '',
        username: '',
        password: '',
        position: '',
        contact_number: '',
        email: '',
        address: '',
        gender: '',
        IDNumber: '',
        joined_date: new Date(),
        uniform_size: '',
        emergency_contact: ''
    });
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    const generatePassword = () => {
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#&';
        const length = 6;
        let newPassword = '';
        for (let i = 0; i < length; i++) {
            const randomIndex = Math.floor(Math.random() * characters.length);
            newPassword += characters.charAt(randomIndex);
        }
        return newPassword;
    };

    const handleResetForm = () => {
        setFormData({
                first_name: '',
                last_name: '',
                username: '',
                password: generatePassword(),
                position: '',
                contact_number: '',
                email: '',
                address: '',
                gender: '',
                IDNumber: '',
                joined_date: '',
                uniform_size: '',
                emergency_contact: ''
            }); 
            // setError('');
    };

    const handleChange = (e) => {
       const { name, value } = e.target;
    let errorMessage = '';

    if (name === 'contact_number' || name === 'emergency_contact') {
            if (!/^\d+$/.test(value)) {
                setError('Please enter only numbers for mobile number');
            }
        } else if (name === 'first_name' || name === 'last_name') {
            if (!/^[a-zA-Z]+$/.test(value)) {
                setError('Please enter only letters for first name and last name');
            }
        }

    setFormData({
        ...formData,
        [name]: value,
        error: errorMessage 
    });

     setValidationErrors({
            ...validationErrors,
            [name]: errorMessage
        });
    };

    const handleSubmit = async (e) => {
         e.preventDefault();
       handleResetForm();
       setError('Registered successfully!');

        try {
            const response = await axios.post('http://localhost:8080/register', formData);
            console.log(response.data);
            setError('Registered successfully!');

        } catch (error) {
            setError('Username is already taken');
        }
    };

    useEffect(() => {
        setFormData({
            ...formData,
            password: generatePassword()
        });
    }, []);

    return (
        <div className='flex p-3 max-w-3xl mx-auto flex-col md:flex-row w-full '>
            <div className='flex-1 flex justify-center'>
                <form className='flex flex-col gap-4 w-full' onSubmit={handleSubmit}>
                    <h1 className='flex justify-center font-bold'> Add New Employee</h1> <hr></hr>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <Label value='First Name' />
                            <TextInput type='text' placeholder='First Name' id='FirstName' />
                        </div>
                        <div>
                            <Label value='Last Name' />
                            <TextInput type='text' placeholder='Last Name' id='LastName' />
                        </div>
                        <div>
                            <Label value='Username' />
                            <TextInput type='text' placeholder='Username' id='Username' />
                        </div>
                        <div>
                            <Label value='Position' /> <br/>
                            <select id='Position' value={formData.position} onChange={handleChange} className='w-full px-3 py-2 border rounded-md bg-gray-700 text-gray-400'>
                                <option value=''>Select Position</option>
                                <option value='Cashier'>Cashier</option>
                                <option value='Chef'>Chef</option>
                                <option value='Waiter'>Waiter</option>
                            </select>
                        </div>
                        <div>
                            <Label value='Email' />
                            <TextInput type='text' placeholder='Email' id='Email' />
                        </div>
                        <div>
                            <Label value='Contact Number' />
                            <TextInput type='text' placeholder='Contact Number' id='Contact' />
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <Label value='Address' />
                            <TextInput type='text' placeholder='Address' id='Address' />
                        </div>
                        <div>
                            <Label value='Gender' /> <br/>
                            <select id='Gender' value={formData.gender} onChange={handleChange} className='w-full px-3 py-2 border rounded-md bg-gray-700 text-gray-400'>
                                <option value=''>Select Gender</option>
                                <option value='male'>Male</option>
                                <option value='female'>Female</option>
                                <option value='other'>Other</option>
                            </select>
                        </div>
                        <div>
                            <Label value='ID Number' />
                            <TextInput type='text' placeholder='ID Number' id='IDNumber' />
                        </div>
                        <div>
                            <Label value='Joined Date' />
                            <TextInput type='date' placeholder='Joined Date' id='JoinedDate' className='text-gray-400' />
                        </div> 
                        <div>
                            <Label value='Uniform Size' /> <br/>
                            <select id='UniformSize' value={formData.uniform_size} onChange={handleChange} className='w-full px-3 py-2 border rounded-md bg-gray-700 text-gray-400' >
                                <option value=''>Select</option>
                                <option value='Extra Small'>Extra Small</option>
                                <option value='Small'>Small</option>
                                <option value='Medium'>Medium</option>
                                <option value='Large'>Large</option>
                                <option value='Extra Large'>Extra Large</option>
                            </select>
                        </div>
                        <div>
                            <Label value='Emergency Contact' />
                            <TextInput type='text' placeholder='Emergency Contact' id='EmergencyContact' />
                        </div>
                    </div>

                    <div>
                        <Label value='Password' />
                        <TextInput type='text' placeholder='Password' id='Password' value={formData.password} />
                    </div>

                    <div className="flex justify-between">
                        <button type="button" className="bg-slate-500 hover:bg-slate-700 text-white font-bold py-2 mr-2 rounded w-full md:w-1/2 " id="clearbtn" onClick={handleResetForm}> Clear </button>
                        <button type="submit" className="bg-green-700 hover:bg-green-900 text-white font-bold py-2 ml-2 rounded w-full md:w-1/2 "> Register Employee </button>
                    </div>
                </form>

                {errorMessage && (
                    <Alert className='mt-5' color='failure'>
                        {errorMessage}
                    </Alert>
                )}
            </div>
        </div>
);
}
