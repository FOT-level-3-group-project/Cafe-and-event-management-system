import React, { useState } from "react";
import { Table } from "flowbite-react";
import { Button, Modal } from "flowbite-react";
import { FcAlarmClock } from "react-icons/fc"; // Importing FcAlarmClock icon
import { HiOutlineExclamationCircle } from "react-icons/hi";

function OverTime() {
  const [attendance, setAttendance] = useState([
    { id: 1, empName: "John", position: "Manager", inTime: "", outTime: "" },
    { id: 2, empName: "Jane", position: "Server", inTime: "", outTime: "" },
    { id: 3, empName: "Michael", position: "Chef", inTime: "", outTime: "" },
    { id: 4, empName: "Emily", position: "Waiter", inTime: "", outTime: "" },
    { id: 5, empName: "Davidd", position: "Bartender", inTime: "", outTime: "" },
    // Add more data rows as needed
  ]);

  const [openModal, setOpenModal] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState({});
  const [isInTime, setIsInTime] = useState(true); // Track if it's in time or out time

  // Function to handle taking in time or out time
  const handleTakeTime = (employeeId, empName, isInTime) => {
    setSelectedEmployee({ id: employeeId, empName });
    setIsInTime(isInTime);
    setOpenModal(true);
  };

  // Function to confirm attendance
  const confirmAttendance = () => {
    const { id, empName } = selectedEmployee;
    const updatedAttendance = attendance.map(employee => {
      if (employee.id === id) {
        if (isInTime) {
          return { ...employee, inTime: new Date().toLocaleTimeString() };
        } else {
          return { ...employee, outTime: new Date().toLocaleTimeString() };
        }
      }
      return employee;
    });
    setAttendance(updatedAttendance);
    setOpenModal(false);
  };

  return (
    <div>
      {/* Header */}
      <h1 style={{ fontFamily: "Arial", color: "blue", fontSize: "24px", fontWeight: "bold" }}>
        Take Attendance
      </h1>

      {/* Table container */}
      <div>
        <Table hoverable className="my-4">
          <Table.Head>
            <Table.HeadCell>#</Table.HeadCell>
            <Table.HeadCell>Emp Name</Table.HeadCell>
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
                    <FcAlarmClock
                      onClick={() => handleTakeTime(employee.id, employee.empName, true)}
                      style={{ cursor: 'pointer', fontSize: '24px', color: 'blue' }}
                    />
                  )}
                </Table.Cell>
                <Table.Cell>
                  <Button color="blue" pill>Mark In</Button>
                </Table.Cell>
                <Table.Cell>
                  {employee.outTime ? employee.outTime : (
                    <FcAlarmClock
                      onClick={() => handleTakeTime(employee.id, employee.empName, false)}
                      style={{ cursor: 'pointer', fontSize: '24px', color: 'red' }}
                    />
                  )}
                </Table.Cell>
                <Table.Cell>
                  <Button color="success" pill>Mark Out</Button>
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

export default OverTime;
