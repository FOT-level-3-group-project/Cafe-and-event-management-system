import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Table } from "flowbite-react";

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
    <div className="container mx-auto px-4 py-8 w-full">
      <div className='container mx-auto px-4 py-8 flex justify-between items-center'>
        <h1 className="text-3xl font-bold mb-4">Manage Employees</h1>
        
        <div className="flex items-center">
          {/* Search bar */}
          <div className='flex-grow px-4 border rounded-full dark:bg-gray-600'>
            <input 
              type="search" 
              placeholder="Search Employee..." 
              value={searchQuery} 
              onChange={(e) => setSearchQuery(e.target.value)} 
              id="search"   
              className='flex-grow px-4 py-2 border-none outline-none focus:ring-0 dark:bg-gray-600 dark:text-white' 
            />   
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
          <Link to="/manager?tab=new-employee" className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 ml-2 rounded px-2 w-full text-center">Add Employee</Link>
        </div>
      </div>

      {/* Table */}
      <div className="relative overflow-x-auto drop-shadow-lg bg-slate-50">
        <Table className='drop-shadow-lg' hoverable>
          <Table.Head>
            <Table.HeadCell className='bg-green-100'>Username</Table.HeadCell>
            <Table.HeadCell className='bg-green-100'>Name</Table.HeadCell>
            <Table.HeadCell className='bg-green-100'>Job Role</Table.HeadCell>
            <Table.HeadCell className='bg-green-100'>Contact</Table.HeadCell>
            <Table.HeadCell className='bg-green-100'>Email</Table.HeadCell>
            <Table.HeadCell className='bg-green-100'>Address</Table.HeadCell>
            <Table.HeadCell className='bg-green-100'>Gender</Table.HeadCell>
            <Table.HeadCell className='bg-green-100'>Joined Date</Table.HeadCell>
            <Table.HeadCell className='bg-green-100'>Uniform Size</Table.HeadCell>
            <Table.HeadCell className='bg-green-100'>Emergency Contact</Table.HeadCell>
            <Table.HeadCell className='bg-green-100'></Table.HeadCell> {/* Empty cell for actions */}
          </Table.Head>
          <Table.Body>
            {employees
              .filter(employee => {
                // Filter employees based on the search query and selected job role
                if (!searchQuery && !selectedJobRole) {
                  return true; // Return all employees if there's no search query or selected job role
                } else {
                  // Check if any of the employee properties contain the search query and the job role matches
                  return Object.values(employee).some(value =>
                    value && value.toString().toLowerCase().includes(searchQuery.toLowerCase()) && (!selectedJobRole || employee.position === selectedJobRole)
                  );
                }
              })
              .map(employee => (
                <Table.Row key={employee.id}>
                  <Table.Cell className='text-black dark:text-slate-200 dark:bg-gray-600'>{employee.username}</Table.Cell>
                  <Table.Cell className='text-black dark:text-slate-200 dark:bg-gray-600'>{`${employee.first_name} ${employee.last_name}`}</Table.Cell>
                  <Table.Cell className='text-black dark:text-slate-200 dark:bg-gray-600'>{employee.position}</Table.Cell>
                  <Table.Cell className='text-black dark:text-slate-200 dark:bg-gray-600'>{employee.contact_number}</Table.Cell>
                  <Table.Cell className='text-black dark:text-slate-200 dark:bg-gray-600'>{employee.email}</Table.Cell>
                  <Table.Cell className='text-black dark:text-slate-200 dark:bg-gray-600'>{employee.address}</Table.Cell>
                  <Table.Cell className='text-black dark:text-slate-200 dark:bg-gray-600'>{employee.gender}</Table.Cell>
                  <Table.Cell className='text-black dark:text-slate-200 dark:bg-gray-600'>{employee.joined_date}</Table.Cell>
                  <Table.Cell className='ttext-black dark:text-slate-200 dark:bg-gray-600'>{employee.uniform_size}</Table.Cell>
                  <Table.Cell className='text-black dark:text-slate-200 dark:bg-gray-600'>{employee.emergency_contact}</Table.Cell>
                  <Table.Cell className='text-black dark:text-slate-200 dark:bg-gray-600'>
                    <button onClick={() => handleDelete(employee.id, employee.username)} className="font-medium text-red-800 dark:text-red-400 hover:scale-110">Remove</button>
                  </Table.Cell>
                </Table.Row>
              ))}
          </Table.Body>
        </Table>
      </div>
    </div>
  );
};

export default ViewAllEmployees;

