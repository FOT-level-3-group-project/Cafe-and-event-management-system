import React, { useState, useEffect, useRef } from "react";
import axios from 'axios'; // Import axios for HTTP requests
import { Table, Button, Modal, TextInput, Label, Pagination, Alert } from "flowbite-react";
import { FaUserEdit, FaTrash } from "react-icons/fa"; // Importing user edit icon
import { DeleteConfirmationModal } from "./DeleteConfirmationModal"; // Import the new confirmation modal component
import { HiInformationCircle } from "react-icons/hi";


function AttendanceFrManager() {
  const [attendance, setAttendance] = useState([]); // State to hold attendance data
  const [showModal, setShowModal] = useState(false); // State to control modal visibility
  const [showEditModal, setShowEditModal] = useState(false); // State to control edit modal visibility
  const [selectedAttendance, setSelectedAttendance] = useState(null); // State to hold selected attendance for deletion
  const [confirmDelete, setConfirmDelete] = useState(false); // State to confirm delete action
  const emailInputRef = useRef(null); // Reference to email input field
  const [currentPage, setCurrentPage] = useState(1); // State to manage pagination
  const itemsPerPage = 6; // Number of items to display per page
  const [editData, setEditData] = useState({}); // State to hold data for editing
  const [empIds, setEmpIds] = useState([]); // State to hold employee IDs

  useEffect(() => {
    fetchAttendanceData(); // Fetch attendance data for the current date on component mount
    fetchEmployeeIds(); // Fetch employee IDs from backend
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

  // Function to fetch employee IDs from backend
  const fetchEmployeeIds = () => {
    // Make HTTP GET request to fetch employee IDs
    axios.get('http://localhost:8080/employeeIds')
      .then(response => {
        setEmpIds(response.data); // Set fetched employee IDs to state
      })
      .catch(error => {
        console.error('Error fetching employee IDs:', error); // Log error if request fails
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

  // Function to handle edit button click
  const handleEditClick = (data) => {
    setEditData(data);
    setShowEditModal(true);
  };

  // Function to handle delete button click
  const handleDeleteClick = (data) => {
    setSelectedAttendance(data);
    setConfirmDelete(true);
  };

  // Function to handle modal closing
  const handleCloseEditModal = () => {
    setShowEditModal(false);
    setEditData({});
  };

  // Function to handle form submission for editing
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

  const [showAlert, setShowAlert] = useState(false);

  // Function to handle confirm delete
  const handleConfirmDelete = () => {
    const { empId, date } = selectedAttendance;
    axios.delete(`http://localhost:8080/DeleteAttendance/${empId}/${date}`)
      .then(response => {
        console.log('Attendance deleted successfully:', response.data);
        setConfirmDelete(false);
        fetchAttendanceData(); // Reload attendance data
        setShowAlert(true); // Show alert
        setTimeout(() => {
          setShowAlert(false); // Hide alert after 2 seconds
        }, 1700);
      })
      .catch(error => {
        console.error('Error deleting attendance:', error);
      });
  };

  // Add state variables to hold the date range
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  // Function to handle form submission for date range
  const handleSubmitDateRange = () => {
    // Make sure both start date and end date are provided
    if (!startDate || !endDate) {
      console.error("Please select both start date and end date.");
      return;
    }

    // Make HTTP GET request to fetch attendance data for the specified date range
    axios.get(`http://localhost:8080/fetch-by-date-range/${startDate}/${endDate}`)
      .then(response => {
        setAttendance(response.data); // Set fetched data to state
        setShowModal(false); // Close the modal after fetching data
      })
      .catch(error => {
        console.error('Error fetching attendance data for the specified date range:', error); // Log error if request fails
      });
  };

  const handleFilterSubmit = () => {
    // Get selected EMP ID and Type values
    const empId = document.getElementById("attendanceType").value;
    const type = document.getElementById("department").value;

    // Check if either EMP ID or Type is not selected
    if (empId === "select" || type === "select") {
      alert("Please select both EMP ID and Type.");
      return;
    }

    // Define the endpoint based on selected Type
    let endpoint = "";
    if (type === "today") {
      endpoint = `http://localhost:8080/attendance/${empId}/Today`;
    } else if (type === "this") {
      endpoint = `http://localhost:8080/attendance/${empId}/This%20Month`;
    }

    // Make GET request to fetch attendance data based on EMP ID and Type
    axios.get(endpoint)
      .then(response => {
        setAttendance(response.data); // Set fetched data to state
      })
      .catch(error => {
        console.error('Error fetching attendance data based on filter:', error); // Log error if request fails
      });
  };





  return (

    <div className="flex flex-col mt-7  mr-10 w-full ml-5">
      {/* Filter controls */}
      <div className="flex items-center justify-between border-b pb-2">
        {/* Dropdown for Name */}
        <div className="flex gap-4">
          <div>
            <label htmlFor="attendanceType" className="text-lg font-semibold">EMP ID: </label>
            <select id="attendanceType" name="attendanceType" className="p-2 border border-gray-300 rounded-md w-40">
              <option value="select">-- Select --</option>
              {empIds.map((empId, index) => (
                <option key={index} value={empId}>{empId}</option>
              ))}
            </select>
          </div>
          {/* Dropdown for Type */}
          <div>
            <label htmlFor="department" className="text-lg font-semibold">Type: </label>
            <select id="department" name="department" className="p-2 border border-gray-300 rounded-md w-40">
              <option value="select">-- Select --</option>
              <option value="today">Today</option>
              <option value="this">This Month</option>

              {/* Add more options as needed */}
            </select>
          </div>
          {/* Submit button */}
          <Button color='success' size='s' className="px-4 py-2 bg-green-600 hover:bg-blue-800 text-white rounded-md" onClick={handleFilterSubmit}>Submit</Button>
        </div>
        {/* Buttons for predefined time periods */}
        <div className="flex gap-4">
          <Button color='success' size='s' className="px-4 py-2 bg-green-500 hover:bg-blue-800 text-white rounded-md" onClick={handleCurrentDateClick}>Today</Button>
          <Button color='success' size='s' className="px-4 py-2 bg-green-500 hover:bg-blue-800 text-white rounded-md" onClick={handleThisMonthClick}>This Month</Button>
          <Button color='success' size='s' className="px-4 py-2 bg-green-500 hover:bg-blue-800 text-white rounded-md" onClick={() => setShowModal(true)}>By Date Range</Button>
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
                <Table.Cell className="flex">
                  <Button
                    style={{ backgroundColor: "blue", color: "white", outline: "none" }}
                    onClick={() => handleEditClick(employee)}
                  >
                    <FaUserEdit className="w-4 h-4" />
                  </Button>
                  <Button className="ml-3"
                    style={{ backgroundColor: "red", color: "white", outline: "none" }}
                    onClick={() => handleDeleteClick(employee)} // Pass employee data to delete function
                  >
                    <FaTrash className="w-3 h-4" />
                  </Button>
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>

            {/* Alert for successful deletion */}
      {showAlert && (
        <div className="mt-5 ml-10 mr-10">
          <Alert color="info">
            Attendance record deleted successfully!
          </Alert>
        </div>
      )}
        {/* Pagination */}
        <div className="flex justify-center">
          <Pagination currentPage={currentPage} totalPages={Math.ceil(attendance.length / itemsPerPage)} onPageChange={onPageChange} />
        </div>
      </div>

  

      {/* Date Range Modal */}
      <Modal show={showModal} size="md" popup onClose={() => setShowModal(false)} initialFocus={emailInputRef}>
        <Modal.Header />
        <Modal.Body>
          <div className="space-y-6">
            <h3 className="text-xl font-medium text-gray-900 dark:text-white">Custom Date Range</h3>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="fromDate" value="From Date" />
              </div>
              <TextInput
                id="fromDate"
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                required
              />
            </div>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="toDate" value="To Date" />
              </div>
              <TextInput
                id="toDate"
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                required
              />
            </div>
            <div className="w-full">
              <Button onClick={handleSubmitDateRange}>Submit</Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>

      {/* Edit modal */}
      <Modal show={showEditModal} size="md" onClose={handleCloseEditModal} popup>
        <Modal.Header />
        <Modal.Body>
          <div className="space-y-6">
            {/* EmpId field (disabled) */}
            <div>
              <Label htmlFor="empId" value="Employee ID" />
              <TextInput id="empId" value={editData.empId} disabled />
            </div>
            {/* Date field (disabled) */}
            <div>
              <Label htmlFor="date" value="Date" />
              <TextInput id="date" value={editData.date} disabled />
            </div>
            {/* In Time field */}
            <div>
              <Label htmlFor="inTime" value="In Time" />
              <TextInput
                type="time"
                id="inTime"
                value={editData.inTime}
                onChange={(e) => setEditData({ ...editData, inTime: e.target.value })}
              />
            </div>
            {/* Out Time field */}
            <div>
              <Label htmlFor="outTime" value="Out Time" />
              <TextInput
                type="time"
                id="outTime"
                value={editData.outTime}
                onChange={(e) => setEditData({ ...editData, outTime: e.target.value })}
              />
            </div>
            <div className="w-full">
              <Button onClick={() => handleSubmitEdit(editData)}>Submit</Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>

      {/* Confirmation modal for delete */}
      <DeleteConfirmationModal
        show={confirmDelete}
        onClose={() => setConfirmDelete(false)}
        onConfirm={handleConfirmDelete}
      />
    </div>
  );
}
export default AttendanceFrManager;
