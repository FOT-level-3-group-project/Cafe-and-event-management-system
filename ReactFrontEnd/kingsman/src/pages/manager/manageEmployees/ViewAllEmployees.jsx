import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Table } from "flowbite-react";
import { Link } from 'react-router-dom';
import UpdateEmployeeModal from './UpdateEmployeeModal';


const ViewAllEmployees = () => {
    const [employees, setEmployees] = useState([]);
    const [showUpdateModal, setShowUpdateModal] = useState(false);
    const [employeeUpdate, setEmployeeUpdate] = useState(null);
    const [isImageModalOpen, setIsImageModalOpen] = useState(false);
    const [clickedImageURL, setClickedImageURL] = useState("");
    const defaultPropic = 'https://upload.wikimedia.org/wikipedia/commons/6/67/User_Avatar.png';
 
    //search bar
    const [searchQuery, setSearchQuery] = useState('');
    const [searchCriteria, setSearchCriteria] = useState('');


    //filter by job role
    const [selectedJobRole, setSelectedJobRole] = useState('');
    const [jobRoles, setJobRoles] = useState([]);

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
        };
        const fetchJobRoles = async () => {
            try {
                const response = await axios.get('http://localhost:8080/api/user/job-roles');
                setJobRoles(response.data); // Assuming the response is an array of job roles
            }catch (error) {
                console.error('Failed to fetch job roles:', error);
            }
         };
        ViewAllEmployees();
        fetchJobRoles();
    }, []);

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


    const handleUpdateClick = (employee) => {
        setEmployeeUpdate(employee);
        setShowUpdateModal(true);
    };

    const handleCloseModal = () => {
        setShowUpdateModal(false);
        setEmployeeUpdate(null);
    };
  
    const handleImageClick = (imageUrl) => {
      if (imageUrl && imageUrl !== defaultPropic) {
          setClickedImageURL(imageUrl);
          setIsImageModalOpen(true);
      }
    };


     return (
       <div className="flex flex-col w-full bg-gray-200">
         <div className="flex items-center m-4 justify-between border-b bg-white dark:bg-gray-500 p-3 shadow-md rounded-md">
           <h1 className="text-2xl font-bold mb-3">Employee Details</h1>

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
                {jobRoles.map((role, index) => (
                  <option key={index} value={role}>
                    {role}
                  </option>
                ))}
              </select>

            </div>

             {/* Add Employee button */}
             <Link
               to="/manager?tab=new-employee"
               className="bg-green-500 hover:bg-green-700 text-white font-semibold py-2 ml-2 rounded px-4"
             >
               Add Employee
             </Link>
           </div>
         </div>

          {/* Update Employee Modal */}
         {showUpdateModal && (
           <UpdateEmployeeModal
             employee={employeeUpdate}
             handleClose={handleCloseModal}
           />
         )}

         <div className='flex justify-center'>
            {/* Image Modal */}
            {isImageModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-800 bg-opacity-50">
                    <div className="max-w-sm max-h-lg bg-slate-100 rounded-lg relative">
                        <img src={clickedImageURL} alt="Profile" className="max-w-full max-h-full" />
                        <button
                            onClick={() => setIsImageModalOpen(false)}
                            className="absolute top-2 right-2 text-gray-700 hover:text-red-500 focus:outline-none"
                        >
                            X
                        </button>
                    </div>
                </div>
            )}
        </div>



         {/* Table */}
         <div className="m-4 relative overflow-x-auto shadow-md bg-white rounded-md">
           <Table hoverable>
             <Table.Head>
               <Table.HeadCell className="bg-green-100"> Profile Picture </Table.HeadCell>
               <Table.HeadCell className="bg-green-100"> Username </Table.HeadCell>
               <Table.HeadCell className="bg-green-100"> Name </Table.HeadCell>
               <Table.HeadCell className="bg-green-100"> Job Role </Table.HeadCell>
               <Table.HeadCell className="bg-green-100"> Contact</Table.HeadCell>
               <Table.HeadCell className="bg-green-100"> Email</Table.HeadCell>
               <Table.HeadCell className="bg-green-100"> Address</Table.HeadCell>
               <Table.HeadCell className="bg-green-100"> Gender</Table.HeadCell>
               <Table.HeadCell className="bg-green-100"> ID Number </Table.HeadCell>
               <Table.HeadCell className="bg-green-100"> Joined Date </Table.HeadCell>
               <Table.HeadCell className="bg-green-100"> Uniform Size </Table.HeadCell>
               <Table.HeadCell className="bg-green-100"> Emergency Contact </Table.HeadCell>
               <Table.HeadCell className="bg-green-100" colSpan={2}> </Table.HeadCell>
             </Table.Head>
             <Table.Body className="divide-y">
               {employees
                 .filter((employee) => {
                   if (!searchQuery && !selectedJobRole) {
                     return true;
                   } else {
                     return Object.values(employee).some(
                       (value) =>
                         value &&
                         value
                           .toString()
                           .toLowerCase()
                           .includes(searchQuery.toLowerCase()) &&
                         (!selectedJobRole ||
                           employee.position === selectedJobRole)
                     );
                   }
                 })
                 .map((employee, index) => (
                   <Table.Row
                     key={employee.id}
                     className={
                       index % 2 === 0
                         ? "bg-gray-100 dark:bg-gray-500 dark:text-white"
                         : "bg-gray-150 dark:bg-gray-700 dark:text-white"
                     }
                   >
                     <Table.Cell onClick={() => handleImageClick(employee.profilePicture)} style={{ cursor: 'pointer' }} className="text-black dark:text-slate-200 dark:bg-gray-600 ">
                         {employee.profilePicture ? (
                          <img
                            src={employee.profilePicture}
                            className="rounded-full w-full h-full object-cover"
                          />
                        ) : (
                          <img
                            src={defaultPropic}
                            className="rounded-full w-full h-full object-cover opacity-50"
                          />
                        )}

                      </Table.Cell>
                     <Table.Cell className="text-black dark:text-slate-200 dark:bg-gray-600">{employee.username} </Table.Cell>
                     <Table.Cell className="text-black dark:text-slate-200 dark:bg-gray-600">{`${employee.first_name} ${employee.last_name}`} </Table.Cell>
                     <Table.Cell className="text-black dark:text-slate-200 dark:bg-gray-600">{employee.position}</Table.Cell>
                     <Table.Cell className="text-black dark:text-slate-200 dark:bg-gray-600">{employee.contact_number} </Table.Cell>
                     <Table.Cell className="text-black dark:text-slate-200 dark:bg-gray-600">{employee.email}</Table.Cell>
                     <Table.Cell className="text-black dark:text-slate-200 dark:bg-gray-600">{employee.address}</Table.Cell>
                     <Table.Cell className="text-black dark:text-slate-200 dark:bg-gray-600">{employee.gender}</Table.Cell>
                     <Table.Cell className="text-black dark:text-slate-200 dark:bg-gray-600">{employee.idNumber}</Table.Cell>
                     <Table.Cell className="text-black dark:text-slate-200 dark:bg-gray-600">{employee.joined_date} </Table.Cell>
                     <Table.Cell className="text-black dark:text-slate-200 dark:bg-gray-600">{employee.uniform_size}</Table.Cell>
                     <Table.Cell className="text-black dark:text-slate-200 dark:bg-gray-600">{employee.emergency_contact}</Table.Cell>
                     <Table.Cell className="dark:bg-gray-600">
                       <button onClick={() => handleUpdateClick(employee)}
                         className={`font-medium text-blue-600 ${employee.position === "manager"? "cursor-not-allowed text-gray-400": "hover:scale-110"}`}
                          disabled={employee.position === "manager"} >
                            Update
                       </button>
                     </Table.Cell>
                     <Table.Cell className="dark:bg-gray-600">
                       <button onClick={() => handleDelete(employee.id, employee.username)} className="font-medium text-red-800 dark:text-red-400 hover:scale-110"> Remove </button>
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

