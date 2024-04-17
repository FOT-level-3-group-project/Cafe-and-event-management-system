import React, { useState, useEffect } from "react";
import { Table } from "flowbite-react";
import { FaEdit, FaTrash } from 'react-icons/fa';
import { Modal, TextInput, Button, Label } from "flowbite-react"; // Import modal and form components
import axios from 'axios';

function ViewAttendance() {
  // State variables
  const [attendanceData, setAttendanceData] = useState([]); // Stores attendance data fetched from the backend
  const [selectedAttendance, setSelectedAttendance] = useState(null); // Stores the selected attendance data for editing
  const [openModal, setOpenModal] = useState(false); // Controls the visibility of the edit modal
  const [inTime, setInTime] = useState('');
  const [outTime, setOutTime] = useState('');

  // Fetch attendance data from the backend when the component mounts
  useEffect(() => {
    fetchAttendanceData();
  }, []);

  // Function to fetch attendance data from the backend
  const fetchAttendanceData = () => {
    axios.get('http://localhost:8080/TodayAttendance')
      .then(response => {
        setAttendanceData(response.data);
      })
      .catch(error => {
        console.error('Error fetching attendance data:', error);
      });
  };

  // Function to handle click on the edit icon
  const handleEditClick = (attendance) => {
    setSelectedAttendance(attendance); // Set the selected attendance data
    setInTime(attendance[3]);
    setOutTime(attendance[4]);
    setOpenModal(true); // Open the edit modal
  };

  // Function to close the edit modal
  const handleCloseModal = () => {
    setOpenModal(false); // Close the modal
    setSelectedAttendance(null); // Reset selected attendance data
  };

  // Function to handle form submission
  const handleSubmit = () => {
    // Prepare the data to be sent to the backend
    const formData = {
      empId: selectedAttendance ? selectedAttendance[0] : '', // Assuming empId is stored in the first position of selectedAttendance array
      date: selectedAttendance ? selectedAttendance[2] : '', // Assuming date is stored in the third position of selectedAttendance array
      inTime: inTime,
      outTime: outTime
    };

    // Make a PUT request to the backend
    axios.put('http://localhost:8080/edit', formData)
      .then(response => {
        console.log('Attendance updated successfully:', response.data);
        handleCloseModal(); // Close the modal after successful submission
        fetchAttendanceData(); // Fetch updated attendance data from the backend
      })
      .catch(error => {
        console.error('Error updating attendance:', error);
        // Handle error (e.g., show error message to the user)
      });
  };

  return (
    <div>
      {/* Attendance Table */}
      <div className="mt-5 ml-10 mr-10 shadow border">
        <Table hoverable>
          <Table.Head>
            <Table.HeadCell>Emp ID</Table.HeadCell>
            <Table.HeadCell>Position</Table.HeadCell>
            <Table.HeadCell>Date</Table.HeadCell>
            <Table.HeadCell>In Time</Table.HeadCell>
            <Table.HeadCell>Out Time</Table.HeadCell>
            <Table.HeadCell>Action</Table.HeadCell>
          </Table.Head>
          <Table.Body className="divide-y">
            {attendanceData.map((attendance, index) => (
              <Table.Row key={index} className="bg-white dark:border-gray-700 dark:bg-gray-800">
                <Table.Cell>{attendance[0]}</Table.Cell>
                <Table.Cell>{attendance[1]}</Table.Cell>
                <Table.Cell>{attendance[2]}</Table.Cell>
                <Table.Cell>{attendance[3]}</Table.Cell>
                <Table.Cell>{attendance[4]}</Table.Cell>
                <Table.Cell className="flex">
                  <FaEdit className="text-blue-500 mr-3 hover:text-blue-700 cursor-pointer text-lg" onClick={() => handleEditClick(attendance)} />
                  <FaTrash className="text-red-500 hover:text-red-700 cursor-pointer text-lg" />
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      </div>

      {/* Edit Modal */}
      <Modal show={openModal} size="md" onClose={handleCloseModal} popup>
        <Modal.Header />
        <Modal.Body>
          <div className="space-y-6">
            <h3 className="text-xl font-medium text-gray-900 dark:text-white">Edit Attendance</h3>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="empId" value="Emp ID" />
              </div>
              <TextInput
                id="empId"
                value={selectedAttendance ? selectedAttendance[0] : ''}
                disabled
              />
            </div>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="date" value="Date" />
              </div>
              <TextInput
                id="date"
                value={selectedAttendance ? selectedAttendance[2] : ''}
                disabled
              />
            </div>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="inTime" value="In Time" />
              </div>
              <TextInput
                id="inTime"
                type="time"
                value={inTime}
                onChange={(event) => setInTime(event.target.value)}
                required
              />
            </div>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="outTime" value="Out Time" />
              </div>
              <TextInput
                id="outTime"
                type="time"
                value={outTime}
                onChange={(event) => setOutTime(event.target.value)}
                required
              />
            </div>
            <div className="w-full">
              <Button onClick={handleSubmit}>Submit</Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default ViewAttendance;
