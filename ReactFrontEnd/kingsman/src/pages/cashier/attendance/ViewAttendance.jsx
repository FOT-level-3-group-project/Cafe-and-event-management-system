import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, Button, Modal } from "flowbite-react";
import { FaEdit, FaTrash } from 'react-icons/fa';
import EditModal from './EditModal';
import AbsentiesModal from './AbsentiesModal';

function ViewAttendance() {
  const [attendanceData, setAttendanceData] = useState([]);
  const [selectedAttendance, setSelectedAttendance] = useState(null);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [openAbsentiesModal, setOpenAbsentiesModal] = useState(false);

  const handleCloseAbsentiesModal = () => {
    setOpenAbsentiesModal(false);
  };

  const fetchAttendanceData = () => {
    axios.get('http://localhost:8080/current-date')
      .then(response => {
        setAttendanceData(response.data);
      })
      .catch(error => {
        console.error('Error fetching attendance data:', error);
      });
  };

  useEffect(() => {
    fetchAttendanceData();
  }, []);

  const handleEditClick = (attendance) => {
    setSelectedAttendance(attendance);
    setOpenEditModal(true);
  };

  const handleDeleteClick = (empId, date) => {
    setSelectedAttendance({ empId, date });
    setConfirmDelete(true);
  };

  const handleCloseEditModal = () => {
    setOpenEditModal(false);
    setSelectedAttendance(null);
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

  const handleConfirmDelete = () => {
    const { empId, date } = selectedAttendance;
    axios.delete(`http://localhost:8080/DeleteAttendance/${empId}/${date}`)
      .then(response => {
        console.log('Attendance deleted successfully:', response.data);
        setConfirmDelete(false);
        fetchAttendanceData(); // Reload attendance data
      })
      .catch(error => {
        console.error('Error deleting attendance:', error);
      });
  };

  return (
    <div>
      {/* Absentees button */}
      <div className="mt-10 text-right flex justify-end mr-10">
        <Button outline gradientDuoTone="cyanToBlue" onClick={() => setOpenAbsentiesModal(true)}>
          Absentees
        </Button>
      </div>

      {/* Attendance table */}
      <div className="mt-5 ml-10 mr-10 shadow border">
        <Table hoverable>
          <Table.Head>
            <Table.HeadCell>Emp ID</Table.HeadCell>
            <Table.HeadCell>Emp Name</Table.HeadCell>
            <Table.HeadCell>Position</Table.HeadCell>
            <Table.HeadCell>Date</Table.HeadCell>
            <Table.HeadCell>In Time</Table.HeadCell>
            <Table.HeadCell>Out Time</Table.HeadCell>
            <Table.HeadCell>Action</Table.HeadCell>
          </Table.Head>
          <Table.Body className="divide-y">
            {attendanceData.map((attendance, index) => (
              <Table.Row key={index} className="bg-white dark:border-gray-700 dark:bg-gray-800">
                <Table.Cell>{attendance.empId}</Table.Cell>
                <Table.Cell>{attendance.empName}</Table.Cell>
                <Table.Cell>{attendance.position}</Table.Cell>
                <Table.Cell>{attendance.date}</Table.Cell>
                <Table.Cell>{attendance.inTime}</Table.Cell>
                <Table.Cell>{attendance.outTime}</Table.Cell>
                <Table.Cell className="flex">
                  <FaEdit className="text-blue-500 mr-3 hover:text-blue-700 cursor-pointer text-lg" onClick={() => handleEditClick(attendance)} />
                  <FaTrash className="text-red-500 hover:text-red-700 cursor-pointer text-lg" onClick={() => handleDeleteClick(attendance.empId, attendance.date)} />
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      </div>

      {/* Delete confirmation modal */}
      <Modal show={confirmDelete} size="md" onClose={() => setConfirmDelete(false)} popup>
        <Modal.Header />
        <Modal.Body>
          <div className="text-center">
            <h3 className="mb-2 text-lg font-normal text-gray-500 dark:text-gray-400">
              Are you sure you want to delete the attendance record for employee {selectedAttendance ? selectedAttendance.empId : ''}?
            </h3>
            <p className="mb-5 text-sm text-gray-400 dark:text-gray-500">
              This action cannot be undone.
            </p>
            <div className="flex justify-center gap-4">
              <Button color="failure" onClick={handleConfirmDelete}>
                {"Yes, I'm sure"}
              </Button>
              <Button color="gray" onClick={() => setConfirmDelete(false)}>
                No, cancel
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>

      {/* Render the EditModal component */}
      <EditModal
        isOpen={openEditModal}
        onClose={handleCloseEditModal}
        onSubmit={handleSubmitEdit}
        selectedAttendance={selectedAttendance}
        empId={selectedAttendance ? selectedAttendance.empId : ''}
        date={selectedAttendance ? selectedAttendance.date : ''}
      />

      {/* AbsentiesModal component */}
      <Modal show={openAbsentiesModal} size="lg" onClose={handleCloseAbsentiesModal} popup>
        <Modal.Header>Today Absent Employees</Modal.Header>
        <Modal.Body>
          <AbsentiesModal onClose={handleCloseAbsentiesModal} reloadAttendance={fetchAttendanceData} />
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default ViewAttendance;
