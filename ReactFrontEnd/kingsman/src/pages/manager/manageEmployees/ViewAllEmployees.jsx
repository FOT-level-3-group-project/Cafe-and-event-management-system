import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Table, Label, TextInput } from "flowbite-react";
import { Tab } from '@mui/material';

const ViewAllEmployees = () => {
    const [employees, setEmployees] = useState([]);
    const [employeeUpdate, setEmployeeUpdate] = useState(null); // State to store employee details for updating

    const [errorMessage, setErrorMessage] = useState('');
    const [emailErrorMessage, setEmailErrorMessage] = useState('');
    const [contactErrorMessage, setContactErrorMessage] = useState('');
    const [EmergencyContactErrorMessage, setEmergencyContactErrorMessage] = useState(''); 
    const [IDNumberError, setIDNumberError] = useState();
    const [showAddPositionModal, setShowAddPositionModal] = useState(false);
    const [positions, setPositions] = useState(() => {
        // Retrieve positions from local storage or use default positions
        const savedPositions = localStorage.getItem('positions');
        return savedPositions ? JSON.parse(savedPositions) : ['Cashier', 'Chef', 'Waiter', 'Kitchen Helper'];
    });

    //search bar
    const [searchQuery, setSearchQuery] = useState('');
    const [searchCriteria, setSearchCriteria] = useState('');
    const [selectedStatus, setSelectedStatus] = useState('');

    //filter by job role
    const [selectedJobRole, setSelectedJobRole] = useState('');

    useEffect(() => {
        const ViewAllEmployees = async () => {
            try {
                let url = 'http://localhost:8080/api/user/manage-employees';
                if (searchQuery || selectedJobRole) {
                    url += `?`;
                    if (searchQuery) {
                        url += `${searchCriteria}=${searchQuery}`;
                    }
                    if (searchQuery && selectedJobRole) {
                        url += `&`;
                    }
                    if (selectedJobRole) {
                        url += `position=${selectedJobRole}`;
                    }
                }
                const response = await fetch(url);
                const data = await response.json();
                setEmployees(data);
            }
            catch (error) {
                console.log(err.message);
            }
        }
        ViewAllEmployees();
    }, [searchQuery, searchCriteria, selectedJobRole]);

    //Delete employee
    const handleDelete = async (id, username) => {
        if (window.confirm(`Are you sure you want to delete the employee ${username}?`)) {
            try {
                await axios.delete(`http://localhost:8080/api/user/delete/${id}`);
                setEmployees(employees.filter(employee => employee.id !== id));
            } catch (error) {
                console.error(error);
            }
        }
    }

    //Update employee
     const handleUpdate = async (id) => {
        try {
            const response = await axios.get(`http://localhost:8080/api/user/getEmployee/${id}`);
            const employeeData = response.data;
            setEmployeeUpdate(employeeData); // Set employee details in the state
        } catch (error) {
            console.error(error);
        }
    }

    //  handle form submission for updating event
    const handleSubmitUpdate = async (e) => {
        e.preventDefault();
        try {
            // Make API call to update event with updated details
            await axios.put(`http://localhost:8080/api/user/updateEmployee/${employeeUpdate.id}`, employeeUpdate);
            // Clear the eventToUpdate state and fetch updated events
            setEmployeeUpdate(null);
            ViewAllEmployees();
        } catch (error) {
            console.error(error);
        }
    };


    //handle search
    const handleSearch = async () => {
        try {
            let url = 'http://localhost:8080/api/user/manage-employees';
            if (searchQuery || selectedJobRole) {
                url += `?`;
                if (searchQuery) {
                    url += `${searchCriteria}=${searchQuery}`;
                }
                if (searchQuery && selectedJobRole) {
                    url += `&`;
                }
                if (selectedJobRole) {
                    url += `position=${selectedJobRole}`;
                }
            }
            const response = await fetch(url);
            const data = await response.json();
            setEmployees(data);
            console.log(data);
        } catch (error) {
            console.log(error.message);
        }
    };


    const handleChange = (e) => {
        setEmployeeUpdate({ ...employeeUpdate, [e.target.name]: e.target.value });

        const fetchEmployeeDetails = async (id) => {
          try {
            // Send a GET request to the backend endpoint to fetch event details
            const response = await axios.get(`http://localhost:8080/api/inform/get/${id}`);
            
            // Check if the response is successful
            if (response.status === 200) {
                return response.data; // Return event details
            } else {
                // Handle other response statuses if needed
                console.error('Unexpected response:', response);
                throw new Error('Failed to fetch employee details');
            }
        } catch (error) {
            console.error('Error fetching event details:', error);
            throw new Error('Failed to fetch employee details');
        }
    }
        //validate contacts
        if (name === 'contact_number' || name === 'emergency_contact') {
            if ( value !== '' && !/^\d+$/.test(value)) {
                // errorMessage('Please enter only numbers for mobile number');
                errorMessage('');
            }else if (name === 'contact_number'){
                if(value.length > 10) {
                    errorMessage('');
                }else if (value.length < 10) {
                    setContactErrorMessage('Mobile number should not be less than 10 digits');
                }else{
                    setContactErrorMessage('');
                }
            }else if (name === 'emergency_contact') {
                if(value.length > 10) {
                    // errorMessage('Emergency contact number should not exceed 10 digits');
                    errorMessage('');
                }else if (value.length < 10) {
                    setEmergencyContactErrorMessage('Mobile number should not be less than 10 digits');
                }else{
                    setEmergencyContactErrorMessage('');
                }
            }
        }else if (name === 'email') {
            if (!/\S+@\S+\.\S+/.test(value)) {
            setEmailErrorMessage('Please enter a valid email address');
        }else {
            setEmailErrorMessage('');
        }
        }
        //validate ID Number
       if (name === 'idNumber') {
            if (value.length === 12 && /^\d+$/.test(value)) {
                setIDNumberError(''); // Clear ID Number error message
            } else if (value.length === 10 && /^\d{9}[VX]$/.test(value.toUpperCase())) {
                setIDNumberError(''); // Clear ID Number error message
            } else {
                setIDNumberError('Invalid ID Number format');
            }
        }



         if (value === 'Add New') {
            setShowAddPositionModal(true);
        } else {
            setShowAddPositionModal(false);
        }
            // For other input fields
            setFormData({
                ...formData,
                [name]: value,
            });
            setErrorMessage(errorMessage); 
        };


    if(employeeUpdate) {
        return (
            <div className='flex p-3 max-w-3xl mx-auto flex-col md:flex-row w-full '>
            <div className='flex-1 flex justify-center'>
                <form className='flex flex-col gap-4 w-full' onSubmit={handleSubmitUpdate}>
                    <h1 className='flex justify-center text-3xl font-bold mb-4 '> Update Employee</h1> <hr></hr>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <Label value='First Name' />
                            <TextInput type='text' id='FirstName' value={employeeUpdate.first_name || ''} name="first_name" readOnly />
                        </div>
                        <div>
                            <Label value='Last Name' />
                            <TextInput type='text' id='LastName' value={employeeUpdate.last_name || ''} onChange={handleChange} name="last_name" readOnly />
                        </div>
                        <div>
                            <Label value='Username*' />
                            <TextInput type='text' placeholder='Username' id='Username' value={employeeUpdate.username || ''} onChange={handleChange} name="username" required/>
                        </div>
                        
                        <div>
                            <Label value='Position*' /> <br/>
                            <select id='Position' value={employeeUpdate.position} onChange={handleChange} name='position' className='w-full' required>
                                <option value='' >Select Position</option>
                                {positions.map((position, index) => (
                                    <option key={index} value={position}>
                                        {position}
                                    </option>
                                ))}
                                <option value='Add New' >Add New Position</option>
                            </select>
                        </div>

                        <div>
                            <Label value='Email*' />
                            <TextInput type='text' placeholder='Email' id='Email' value={employeeUpdate.email} onChange={handleChange} name="email"  required/>
                            {emailErrorMessage && <div className="text-red-500 text-sm ">{emailErrorMessage}</div>}
                        </div>
                        <div>
                            <Label value='Contact Number' />
                            <TextInput type='text' placeholder="Contact Number" id='Contact' value={employeeUpdate.contact_number} onChange={handleChange} name="contact_number" />
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <Label value='Address' />
                            <TextInput type='text' placeholder='Address' id='Address' value={employeeUpdate.address} onChange={handleChange}  name="address" />
                        </div>
                        <div>
                            <Label value='Gender' /> <br/>
                            <select id='Gender' value={employeeUpdate.gender} onChange={handleChange} name='gender' className='w-full px-3 py-2 border rounded-md dark:bg-gray-700 ' >
                                <option value=''>Select Gender</option>
                                <option value='male'>Male</option>
                                <option value='female'>Female</option>
                                <option value='other'>Other</option>
                            </select>
                        </div>

                       <div>
                            <Label value='ID Number' />
                            <TextInput type='text' id='idNumber' value={employeeUpdate.idNumber}  name='idNumber' readOnly />
                        </div>
                    
                        <div>
                            <Label value='Joined Date' />
                            <TextInput type='date' id='JoinedDate' className='text-gray-400' value={employeeUpdate.joined_date} name="joined_date" readOnly/>
                        </div> 
                        <div>
                            <Label value='Uniform Size' /> <br/>
                            <select id='UniformSize' value={employeeUpdate.uniform_size} name='uniform_size' className='w-full px-3 py-2 border rounded-md dark:bg-gray-700' readOnly>
                                <option value=''>Select Size</option>
                                <option value='Extra Small'> XS </option>
                                <option value='Small'> S </option>
                                <option value='Medium'> M </option>
                                <option value='Large'> L </option>
                                <option value='Extra Large'> XL </option>
                            </select>
                        </div>
                        <div>
                            <Label value='Emergency Contact' />
                            <TextInput type='text' placeholder='Emergency Contact' id='EmergencyContact' value={employeeUpdate.emergency_contact} onChange={handleChange} name="emergency_contact" />
                            {EmergencyContactErrorMessage && <div className="text-red-500 text-sm ">{EmergencyContactErrorMessage}</div>}
                        </div>
                         
                        {/* <div>
                            <Label value='Password' />
                            <TextInput type='text' placeholder='Password' id='Password' value={formData.password} />
                        </div> */}
                    </div>

                    <div className="flex justify-between">
                        {/* <button type="reset" className="bg-slate-500 hover:bg-slate-700 text-white font-bold py-2 mr-2 rounded w-full md:w-1/2 " id="clearbtn" onClick={handleResetForm}> Clear </button> */}
                        <button type="submit" className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 ml-2 rounded w-full "> Update Employee </button>
                    </div>

                    {errorMessage && (
                    <Alert className='mt-5' color='failure'>
                        {errorMessage}
                    </Alert>
                    )}

                    {/* Render AddPositionModal */}
                    {showAddPositionModal && (
                        <AddPositionModal
                            isOpen={handleShowAddPositionModal}
                            onClose={handleCloseAddPositionModal}
                            onAddPosition={handleAddPosition}
                        />
                    )}

                </form>
            </div>
        </div>
        );
    }

     return (
        <div className="container mx-auto px-4 py-8">
            <div className="container mx-auto px-4 py-8 flex justify-between items-center">
                <h1 className="text-3xl font-bold mb-4">Manage Employees</h1>

                <div className="flex items-center">
                    {/* Search Bar */}
                    <div className="flex-grow px-3 border rounded-full dark:bg-gray-600">
                        <input
                            type="search"
                            placeholder="Search Employee..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="flex-grow px-4 py-2 border-none outline-none focus:ring-0 dark:bg-gray-600 dark:text-white"
                        />
                    </div>

                    {/* Job Role filter */}
                    <div className="ml-2">
                        <select
                            value={selectedJobRole}
                            onChange={(e) => setSelectedJobRole(e.target.value)}
                            className="py-2 px-4 bg-white border border-gray-300 dark:bg-gray-700 dark:text-white dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                        >
                            <option value="">All Job Roles</option>
                            <option value="manager">Manager</option>
                            <option value="cashier">Cashier</option>
                            <option value="chef">Chef</option>
                            <option value="waiter">Waiter</option>
                        </select>
                    </div>

                    {/* Add Employee button */}
                    <Link to="/manager?tab=new-employee" className="bg-green-500 hover:bg-green-700 text-white font-semibold py-2 ml-2 rounded px-4">
                        Add Employee
                    </Link>
                </div>
            </div>

            {/* Table */}
            <div className="relative overflow-x-auto drop-shadow-lg bg-slate-50">
                <Table hoverable>
                    <Table.Head>
                        <Table.HeadCell className='bg-green-100'>Username</Table.HeadCell>
                        <Table.HeadCell className='bg-green-100'>Name</Table.HeadCell>
                        <Table.HeadCell className='bg-green-100'>Job Role</Table.HeadCell>
                        <Table.HeadCell className='bg-green-100'>Contact</Table.HeadCell>
                        <Table.HeadCell className='bg-green-100'>Email</Table.HeadCell>
                        <Table.HeadCell className='bg-green-100'>Address</Table.HeadCell>
                        <Table.HeadCell className='bg-green-100'>Gender</Table.HeadCell>
                        <Table.HeadCell className='bg-green-100'>ID Number</Table.HeadCell>
                        <Table.HeadCell className='bg-green-100'>Joined Date</Table.HeadCell>
                        <Table.HeadCell className='bg-green-100'>Uniform Size</Table.HeadCell>
                        <Table.HeadCell className='bg-green-100'>Emergency Contact</Table.HeadCell>
                        <Table.HeadCell className='bg-green-100' colSpan={2}></Table.HeadCell>
                    </Table.Head>
                    <Table.Body className="divide-y">
                        {employees
                            .filter((employee) => {
                                if (!searchQuery && !selectedJobRole) {
                                    return true;
                                } else {
                                    return (
                                        Object.values(employee).some(
                                            (value) =>
                                                value &&
                                                value.toString().toLowerCase().includes(searchQuery.toLowerCase()) &&
                                                (!selectedJobRole || employee.position === selectedJobRole)
                                        )
                                    );
                                }
                            })
                            .map((employee, index) => (
                                <Table.Row key={employee.id} className={index % 2 === 0 ? "bg-gray-100 dark:bg-gray-500 dark:text-white" : "bg-gray-150 dark:bg-gray-700 dark:text-white"}>
                                    <Table.Cell className='text-black dark:text-slate-200 dark:bg-gray-600'>{employee.username}</Table.Cell>
                                    <Table.Cell className='text-black dark:text-slate-200 dark:bg-gray-600'>{`${employee.first_name} ${employee.last_name}`}</Table.Cell>
                                    <Table.Cell className='text-black dark:text-slate-200 dark:bg-gray-600'>{employee.position}</Table.Cell>
                                    <Table.Cell className='text-black dark:text-slate-200 dark:bg-gray-600'>{employee.contact_number}</Table.Cell>
                                    <Table.Cell className='text-black dark:text-slate-200 dark:bg-gray-600'>{employee.email}</Table.Cell>
                                    <Table.Cell className='text-black dark:text-slate-200 dark:bg-gray-600'>{employee.address}</Table.Cell>
                                    <Table.Cell className='text-black dark:text-slate-200 dark:bg-gray-600'>{employee.gender}</Table.Cell>
                                    <Table.Cell className='text-black dark:text-slate-200 dark:bg-gray-600'>{employee.idNumber}</Table.Cell>
                                    <Table.Cell className='text-black dark:text-slate-200 dark:bg-gray-600'>{employee.joined_date}</Table.Cell>
                                    <Table.Cell className='text-black dark:text-slate-200 dark:bg-gray-600'>{employee.uniform_size}</Table.Cell>
                                    <Table.Cell className='text-black dark:text-slate-200 dark:bg-gray-600'>{employee.emergency_contact}</Table.Cell>
                                    <Table.Cell className='dark:bg-gray-600'>
                                        <button onClick={() => handleUpdate(employee.id)}  className="font-medium text-blue-600 dark:text-blue-400 hover:scale-110 ">
                                            Update
                                        </button>
                                    </Table.Cell>
                                    <Table.Cell className='dark:bg-gray-600'>
                                        <button onClick={() => handleDelete(employee.id, employee.username)} className="font-medium text-red-800 dark:text-red-400 hover:scale-110">
                                            Remove
                                        </button>
                                    </Table.Cell>
                                </Table.Row>
                            ))}
                    </Table.Body>
                </Table>
            </div>
        </div>
    );
}

export default ViewAllEmployees;

