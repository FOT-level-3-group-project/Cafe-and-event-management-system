import React, { useState, useEffect, useRef } from "react";
import axios from 'axios'; // Import axios for HTTP requests
import { Table, Button, Modal, TextInput, Label, Pagination } from "flowbite-react";
import { FaUserEdit } from "react-icons/fa"; // Importing user edit icon

function AttendanceFrManager() {
  const [attendance, setAttendance] = useState([]); // State to hold attendance data
  const [showModal, setShowModal] = useState(false); // State to control modal visibility
  const emailInputRef = useRef(null); // Reference to email input field
  const [currentPage, setCurrentPage] = useState(1); // State to manage pagination
  const itemsPerPage = 6; // Number of items to display per page

  useEffect(() => {
    fetchAttendanceData(); // Fetch attendance data for the current date on component mount
  }, []);

  // Function to fetch attendance data for the current date from backend
  const fetchAttendanceData = () => {
    // Make HTTP GET request to fetch attendance data for current date
    axios.get('http://localhost:8080/current-date')
      .then(response => {
        setAttendance(response.data); // Set fetched data to state
      })
      .catch(error => {
        console.error('Error fetching attendance data:', error); // Log error if request fails
      });
  };

  // Function to fetch attendance data for the current month from backend
  const fetchAttendanceDataForCurrentMonth = () => {
    // Make HTTP GET request to fetch attendance data for current month
    axios.get('http://localhost:8080/current-month')
      .then(response => {
        setAttendance(response.data); // Set fetched data to state
      })
      .catch(error => {
        console.error('Error fetching attendance data for current month:', error); // Log error if request fails
      });
  };

  // Calculate indexes for pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = attendance.slice(indexOfFirstItem, indexOfLastItem);

  // Function to handle page change
  const onPageChange = (page) => setCurrentPage(page);

  // Function to handle "This Month" button click
  const handleThisMonthClick = () => {
    setShowModal(false); // Close modal if it's open
    fetchAttendanceDataForCurrentMonth(); // Fetch attendance data for current month
  };

    // Function to handle "Current Date" button click
    const handleCurrentDateClick = () => {
      setShowModal(false); // Close modal if it's open
      fetchAttendanceData(); // Fetch attendance data for current month
    };

    const handleSubmitEdit = (formData) => {
      axios.put('http://localhost:8080/update', formData)
        .then(response => {
          console.log('Attendance updated successfully:', response.data);
          handleCloseEditModal();
          fetchAttendanceData(); // Reload attendance data
        })
        .catch(error => {
          console.error('Error updating attendance:', error);
        });
    };

  return (
    <div className="flex flex-col mt-4 p-10 ">
      {/* Filter controls */}
      <div className="flex items-center justify-between border-b pb-2">
        {/* Dropdown for Name */}
        <div className="flex gap-4">
          <div>
            <label htmlFor="attendanceType" className="text-lg font-semibold">Name: </label>
            <select id="attendanceType" name="attendanceType" className="p-2 border border-gray-300 rounded-md w-40">
              <option value="select">-- Select --</option>
              <option value="view">M.W.D.Piyath</option>
              <option value="edit">G.H.K.Sudath</option>
              {/* Add more options as needed */}
            </select>
          </div>
          {/* Dropdown for Type */}
          <div>
            <label htmlFor="department" className="text-lg font-semibold">Type: </label>
            <select id="department" name="department" className="p-2 border border-gray-300 rounded-md w-40">
              <option value="select">-- Select --</option>
              <option value="management">Today</option>
              <option value="staff" onClick={handleThisMonthClick}>This Month</option>
              {/* Add more options as needed */}
            </select>
          </div>
          {/* Submit button */}
          <button className="px-4 py-2 bg-blue-600 hover:bg-blue-800 text-white rounded-md">Submit</button>
        </div>
        {/* Buttons for predefined time periods */}
        <div className="flex gap-4">
          <button className="px-4 py-2 bg-blue-600 hover:bg-blue-800 text-white rounded-md" onClick={handleCurrentDateClick}>Today</button>
          <button className="px-4 py-2 bg-blue-600 hover:bg-blue-800 text-white rounded-md" onClick={handleThisMonthClick}>This Month</button>
          <button className="px-4 py-2 bg-blue-600 hover:bg-blue-800 text-white rounded-md" onClick={() => setShowModal(true)}>By Date Range</button>
        </div>
      </div>
      
      {/* Attendance table */}
      <div>
        <Table hoverable className="my-5 ">
          <Table.Head>
            <Table.HeadCell>#</Table.HeadCell>
            <Table.HeadCell>EMP ID</Table.HeadCell>
            <Table.HeadCell>EMP Name</Table.HeadCell>
            <Table.HeadCell>Position</Table.HeadCell>
            <Table.HeadCell>Date</Table.HeadCell>
            <Table.HeadCell>In Time</Table.HeadCell>
            <Table.HeadCell>Out Time</Table.HeadCell>
            <Table.HeadCell>Action</Table.HeadCell>
          </Table.Head>
          <Table.Body className="divide-y">
            {currentItems.map((employee, index) => (
              <Table.Row 
                key={index} 
                className="bg-slate-900 hover:bg-emerald-400"
              >
                <Table.Cell className="text-white">{indexOfFirstItem + index + 1}</Table.Cell>
                <Table.Cell className="text-white">{employee.empId}</Table.Cell>
                <Table.Cell className="text-white">{employee.empName}</Table.Cell>
                <Table.Cell className="text-white">{employee.position}</Table.Cell>
                <Table.Cell className="text-white">{employee.date}</Table.Cell>
                <Table.Cell className="text-white">{employee.inTime}</Table.Cell>
                <Table.Cell className="text-white">{employee.outTime}</Table.Cell>
                <Table.Cell>
                  <Button style={{ backgroundColor: "blue", color: "white", outline: "none" }}>
                    <FaUserEdit style={{ fontSize: "25px" }} className="w-4 h-4" />
                  </Button>
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
        {/* Pagination */}
        <div className="flex justify-center">
          <Pagination currentPage={currentPage} totalPages={Math.ceil(attendance.length / itemsPerPage)} onPageChange={onPageChange} />
        </div>
      </div>
      
      {/* Modal */}
      <Modal show={showModal} size="md" popup onClose={() => setShowModal(false)} initialFocus={emailInputRef}>
        <Modal.Header />
        <Modal.Body>
          <div className="space-y-6">
            <h3 className="text-xl font-medium text-gray-900 dark:text-white">Custom Date Range</h3>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="fromDate" value="From Date" />
              </div>
              <TextInput id="fromDate" ref={emailInputRef} type="date" required />
            </div>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="toDate" value="To Date" />
              </div>
              <TextInput id="toDate" type="date" required />
            </div>
            <div className="w-full">
              <Button>Submit</Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default AttendanceFrManager;
