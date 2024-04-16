import React, { useState } from "react";
import { Table } from "flowbite-react";
import { Button, Modal } from "flowbite-react";
import { FcAlarmClock } from "react-icons/fc"; // Importing FcAlarmClock icon
import { HiOutlineExclamationCircle } from "react-icons/hi";
import axios from 'axios';

function Attendance() {
  const [attendance, setAttendance] = useState([
    { id: 1, empName: "EMP001", position: "Manager", inTime: "", outTime: "" },
    { id: 2, empName: "EMP002", position: "Server", inTime: "", outTime: "" },
    { id: 3, empName: "EMP003", position: "Chef", inTime: "", outTime: "" },
    { id: 4, empName: "EMP004", position: "Waiter", inTime: "", outTime: "" },
    { id: 5, empName: "EMP005", position: "Bartender", inTime: "", outTime: "" },
    // Add more data rows as needed
  ]);

  const [openModal, setOpenModal] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState({});
  const [isInTime, setIsInTime] = useState(true); // Track if it's in time or out time

  // Get today's date in the format: DD-MM-YYYY
  const todayDate = new Date().toLocaleDateString("en-US", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric"
  });

  // Function to handle taking in time or out time
  const handleTakeTime = (employeeId, empName, position, isInTime) => {
    setSelectedEmployee({ id: employeeId, empName, position });
    setIsInTime(isInTime);
    setOpenModal(true);
  };

  // Function to confirm attendance
  const confirmAttendance = () => {
    const currentTime = new Date().toLocaleTimeString();
    if (isInTime) {
      // Mark in attendance
      axios.post('http://localhost:8080/inAttendance', {
        empId: selectedEmployee.empName,
        position: selectedEmployee.position,
        inTime: currentTime,
      })
        .then(response => {
          const updatedAttendance = attendance.map(emp => {
            if (emp.id === selectedEmployee.id) {
              return { ...emp, inTime: response.data.inTime };
            }
            return emp;
          });
          setAttendance(updatedAttendance);
          setOpenModal(false);
        })
        .catch(error => {
          console.error('Error:', error);
          setOpenModal(false);
        });
    } else {
      // Mark out attendance
      axios.post('http://localhost:8080/outAttendance', {
        empID: selectedEmployee.empName,
        position: selectedEmployee.position,
        outTime: currentTime,
      })
        .then(response => {
          const updatedAttendance = attendance.map(emp => {
            if (emp.id === selectedEmployee.id) {
              return { ...emp, outTime: response.data.outTime };
            }
            return emp;
          });
          setAttendance(updatedAttendance);
          setOpenModal(false);
        })
        .catch(error => {
          console.error('Error:', error);
          setOpenModal(false);
        });
    }
  };

  return (
    <div className="mr-16 ml-16 mt5 mb-5">
      {/* Header */}
      <h1 style={{ fontFamily: "Arial", color: "blue", fontSize: "24px", fontWeight: "bold" }}>
        Take Attendance (Today's Date: {todayDate})
      </h1>

      {/* Table container */}
      <div>
        <Table hoverable className="my-4 shadow">
          <Table.Head>
            <Table.HeadCell>#</Table.HeadCell>
            <Table.HeadCell>Emp ID</Table.HeadCell>
            <Table.HeadCell>Position</Table.HeadCell>
            <Table.HeadCell>In Time</Table.HeadCell>
            <Table.HeadCell>Action</Table.HeadCell>
            <Table.HeadCell>Out Time</Table.HeadCell>
            <Table.HeadCell>Action</Table.HeadCell>
          </Table.Head>
          <Table.Body className="divide-y">
            {attendance.map(employee => (
              <Table.Row 
                key={employee.id} 
                className="bg-slate-900 hover:bg-emerald-400"
              >
                <Table.Cell className="text-white">{employee.id}</Table.Cell>
                <Table.Cell className="text-white">{employee.empName}</Table.Cell>
                <Table.Cell className="text-white">{employee.position}</Table.Cell>
                <Table.Cell>
                  {employee.inTime ? employee.inTime : (
                    <FcAlarmClock style={{ cursor: 'pointer', fontSize: '24px', color: 'blue' }}/>
                  )}
                </Table.Cell>
                <Table.Cell>
                  <Button color="blue" pill onClick={() => handleTakeTime(employee.id, employee.empName, employee.position, true)}>Mark In</Button>
                </Table.Cell>
                <Table.Cell>
                  {employee.outTime ? employee.outTime : (
                    <FcAlarmClock  style={{ cursor: 'pointer', fontSize: '24px', color: 'red' }} />
                  )}
                </Table.Cell>
                <Table.Cell>
                  <Button color="success" pill disabled={!employee.inTime} onClick={() => handleTakeTime(employee.id, employee.empName, employee.position, false)}>Mark Out</Button>
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      </div>

      {/* Confirmation Modal */}
      <Modal show={openModal} size="md" onClose={() => setOpenModal(false)} popup>
        <Modal.Header />
        <Modal.Body>
          <div className="text-center">
            <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
            <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
              {isInTime ? `Confirm in time for ${selectedEmployee.empName}?` : `Confirm out time for ${selectedEmployee.empName}?`}
            </h3>
            <div className="flex justify-center gap-4">
              <Button color="success" onClick={confirmAttendance}>
                Yes, I'm sure
              </Button>
              <Button color="gray" onClick={() => setOpenModal(false)}>
                No, cancel
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default Attendance;