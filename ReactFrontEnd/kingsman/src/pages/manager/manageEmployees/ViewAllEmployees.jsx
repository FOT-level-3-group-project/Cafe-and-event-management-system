import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ViewAllEmployees = () => {
    const [employees, setEmployees] = useState([]);

    useEffect(() => {
        const ViewAllEmployees = async () => {
            try {
                const response = await fetch('http://localhost:8080/api/user/manage-employees');
                const jsonData = await response.json();
                setEmployees(jsonData);
            }
            catch (err) {
                console.error(err.message);
            }
        }
        ViewAllEmployees();
    }, []);
    
    return (
        <div className="container mx-auto px-4 py-8">
    <h1 className="text-3xl font-bold mb-4">Manage Employees</h1>
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
                    <th className="px-4 py-2 text-center bg-gray-200">ID Number</th>
                    <th className="px-4 py-2 text-center bg-gray-200 w-32">Joined Date</th>
                    <th className="px-4 py-2 text-center bg-gray-200">Uniform Size</th>
                    <th className="px-4 py-2 text-center bg-gray-200">Emergency Contact</th>
                    <th className="px-4 py-2 text-center bg-gray-200" colSpan='2'>Actions</th>
                </tr>
            </thead>

            <tbody>
                {employees.map((employee, index) => (
                    <tr key={employee.id} className={index % 2 === 0 ? "bg-gray-100 dark:bg-gray-600 dark:text-white" : "bg-gray-200 dark:bg-gray-700 dark:text-white"}>
                        <td className="px-4 py-2">{employee.username}</td>
                        <td className="px-4 py-2">{employee.first_name} {employee.last_name}</td>
                        <td className="px-4 py-2">{employee.position}</td>
                        <td className="px-4 py-2">{employee.contact_number}</td>
                        <td className="px-4 py-2">{employee.email}</td>
                        <td className="px-4 py-2">{employee.address}</td>
                        <td className="px-4 py-2">{employee.gender}</td>
                        <td className="px-4 py-2">{employee.IDNumber}</td>
                        <td className="px-4 py-2">{employee.joined_date}</td>
                        <td className="px-4 py-2">{employee.uniform_size}</td>
                        <td className="px-4 py-2">{employee.emergency_contact}</td>
                        <td className="px-6 py-4 text-right"> <a href="#" className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Update</a> </td>
                        <td className="px-6 py-4 text-right"> <a href="#" className="font-medium text-red-800 dark:text-red-500 hover:underline">Remove</a></td>
                    </tr>
                ))}
            </tbody>
        </table>
    </div>
</div>

    );
}

export default ViewAllEmployees;
