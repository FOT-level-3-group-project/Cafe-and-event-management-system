import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const ViewAllEmployees = () => {
    const [employees, setEmployees] = useState([]);

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
    
    return (
        <div className="container mx-auto px-4 py-8">
        <div className='container mx-auto px-4 py-8 flex justify-between items-center'>
            <h1 className="text-3xl font-bold mb-4">Manage Employees</h1>

            <div className="flex items-center">
                {/* Add search bar */}
                <div className='flex-grow px-4 py-2 border rounded-full dark:bg-gray-600 '>
                    <input type="search" placeholder="Search Employee..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} id="search"   className='flex-grow px-4 py-2 border-none outline-none focus:ring-0 dark:bg-gray-600 dark:text-white' />   
                </div>

                {/* Job Role filter */}
                <div className="container mx-auto px-4 py-2">
                    <select 
                        className="block py-2 px-4 bg-white border border-gray-300 dark:bg-gray-700 dark:text-white dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                        value={selectedJobRole} 
                        onChange={(e) => setSelectedJobRole(e.target.value)}
                    >
                        <option value="">All Job Roles</option>
                        <option value="manager">Manager</option>
                        <option value="cashier">Cashier</option>
                        <option value="Chef">Chef</option>
                        <option value="Waiter">Waiter</option>
                    </select>
                </div>
            
                {/* Add Employee button */} 
                <Link to="/manager?tab=new-employee" className="bg-green-700 hover:bg-green-900 text-white font-bold py-2 ml-2 rounded px-2 w-full text-center">Add Employee</Link>
            </div>
        </div>

            {/* Table */}
            <div className="relative overflow-x-auto">
                <table className="w-full table-auto text-gray-700 dark:text-white-400 border-collapse bg-gray-50 ">
                    <thead className="text-gray-700 text-sm uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-700">
                        <tr className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 dark:border-gray-700">
                            <th className="px-4 py-2 text-center bg-gray-200">Username</th>
                            <th className="px-4 py-2 text-center bg-gray-200">Name</th>
                            <th className="px-4 py-2 text-center bg-gray-200">Job Role</th>
                            <th className="px-4 py-2 text-center bg-gray-200">Contact</th>
                            <th className="px-4 py-2 text-center bg-gray-200">Email</th>
                            <th className="px-4 py-2 text-center bg-gray-200">Address</th>
                            <th className="px-4 py-2 text-center bg-gray-200">Gender</th>
                            {/* <th className="px-4 py-2 text-center bg-gray-200">ID Number</th> */}
                            <th className="px-4 py-2 text-center bg-gray-200 w-32">Joined Date</th>
                            <th className="px-4 py-2 text-center bg-gray-200">Uniform Size</th>
                            <th className="px-4 py-2 text-center bg-gray-200">Emergency Contact</th>
                            <th className="px-4 py-2 text-center bg-gray-200" colSpan='2'>Actions</th>
                        </tr>
                    </thead>

                    <tbody>
                        {employees.filter(employee => {
                            // Filter employees based on the search query and selected job role
                            if (!searchQuery && !selectedJobRole) {
                                return true; // Return all employees if there's no search query or selected job role
                            } else {
                                // Check if any of the employee properties contain the search query and the job role matches
                                return Object.values(employee).some( value =>
                                    value && value.toString().toLowerCase().includes(searchQuery.toLowerCase()) && (!selectedJobRole || employee.position === selectedJobRole)
                                );
                            }
                        })
                        .map((employee, index) => (
                            <tr key={employee.id} className={index % 2 === 0 ? "bg-gray-100 dark:bg-gray-600 dark:text-white" : "bg-gray-200 dark:bg-gray-700 dark:text-white"}>
                                <td className="px-4 py-2">{employee.username}</td>
                                <td className="px-4 py-2">{employee.first_name} {employee.last_name}</td>
                                <td className="px-4 py-2">{employee.position}</td>
                                <td className="px-4 py-2">{employee.contact_number}</td>
                                <td className="px-4 py-2">{employee.email}</td>
                                <td className="px-4 py-2">{employee.address}</td>
                                <td className="px-4 py-2">{employee.gender}</td>
                                {/* <td className="px-4 py-2">{employee.IDNumber}</td> */}
                                <td className="px-4 py-2">{employee.joined_date}</td>
                                <td className="px-4 py-2">{employee.uniform_size}</td>
                                <td className="px-4 py-2">{employee.emergency_contact}</td>
                                <td className="px-6 py-4 text-right"> <a href="#" className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Update</a> </td>
                                <td className="px-6 py-4 text-right"> 
                                    <button onClick={() => handleDelete(employee.id, employee.username)} className="font-medium text-red-800 dark:text-red-500 hover:underline">Remove</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default ViewAllEmployees;

