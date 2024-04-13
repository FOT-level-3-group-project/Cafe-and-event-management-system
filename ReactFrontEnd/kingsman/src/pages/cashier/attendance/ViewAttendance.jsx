import React, { useState } from "react";
import { Checkbox, Table } from "flowbite-react";
import { Button } from "flowbite-react";
import { AiOutlineCheckCircle } from "react-icons/ai"; // Importing check circle icon
import { FaUserEdit } from "react-icons/fa"; // Importing user edit icon

function ViewAttendance() {
  const [attendance, setAttendance] = useState([
    { id: 1, firstName: "John", lastName: "Doe", position: "Manager", date: "30-03-2024", status: "present", action: <Button style={{ backgroundColor: "blue", color: "white", outline: "none" }}><FaUserEdit style={{ fontSize: "25px" }} className="w-4 h-4" /></Button>},
    { id: 2, firstName: "Jane", lastName: "Smith", position: "Server", date: "30-03-2024", status: "absent", action: <Button style={{ backgroundColor: "blue", color: "white", outline: "none" }}><FaUserEdit style={{ fontSize: "25px" }} className="w-4 h-4" /></Button>},
    { id: 2, firstName: "Jane", lastName: "Smith", position: "Server", date: "30-03-2024", status: "present", action: <Button style={{ backgroundColor: "blue", color: "white", outline: "none" }}><FaUserEdit style={{ fontSize: "25px" }} className="w-4 h-4" /></Button>},
    { id: 2, firstName: "Jane", lastName: "Smith", position: "Server", date: "30-03-2024", status: "half day", action: <Button style={{ backgroundColor: "blue", color: "white", outline: "none" }}><FaUserEdit style={{ fontSize: "25px" }} className="w-4 h-4" /></Button>},
    { id: 2, firstName: "Jane", lastName: "Smith", position: "Server", date: "30-03-2024", status: "present", action: <Button style={{ backgroundColor: "blue", color: "white", outline: "none" }}><FaUserEdit style={{ fontSize: "25px" }} className="w-4 h-4" /></Button>},
    { id: 2, firstName: "Jane", lastName: "Smith", position: "Server", date: "30-03-2024", status: "present", action: <Button style={{ backgroundColor: "blue", color: "white", outline: "none" }}><FaUserEdit style={{ fontSize: "25px" }} className="w-4 h-4" /></Button>},
    // Add more data rows as needed
  ]);

  // Get today's date in the format: DD-MM-YYYY
  const todayDate = new Date().toLocaleDateString("en-US", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric"
  });

  // Function to set color based on status
  const getStatusColor = (status) => {
    switch (status) {
      case "present":
        return "green";
      case "absent":
        return "red";
      case "half day":
        return "orange";
      default:
        return "white";
    }
  };

  return (
    <div className="items-center flex justify-center flex-col my-5" 
          style={{ backgroundImage: "url('/Attendance.png')", backgroundRepeat: "no-repeat",
           backgroundPosition: "right", backgroundSize: "cover"  }}>
      {/* Header */}
      <h1 style={{ fontFamily: "Arial", color: "blue", fontSize: "24px", fontWeight: "bold" }}>
        Today Attendance (Today's Date: {todayDate})
      </h1>

      {/* Table container */}
      <div>
        <Table hoverable className="my-4">
          <Table.Head>
            <Table.HeadCell>#</Table.HeadCell>
            <Table.HeadCell>First Name</Table.HeadCell>
            <Table.HeadCell>Last Name</Table.HeadCell>
            <Table.HeadCell>Position</Table.HeadCell>
            <Table.HeadCell>Date</Table.HeadCell>
            <Table.HeadCell>Status</Table.HeadCell>
            <Table.HeadCell>Action</Table.HeadCell>
          </Table.Head>
          <Table.Body className="divide-y">
            {attendance.map(employee => (
              <Table.Row 
                key={employee.id} 
                className="bg-slate-900 hover:bg-emerald-400"
              >
                <Table.Cell className="text-white">{employee.id}</Table.Cell>
                <Table.Cell className="text-white">{employee.firstName}</Table.Cell>
                <Table.Cell className="text-white">{employee.lastName}</Table.Cell>
                <Table.Cell className="text-white">{employee.position}</Table.Cell>
                <Table.Cell className="text-white">{employee.date}</Table.Cell>
                <Table.Cell style={{ backgroundColor: getStatusColor(employee.status) }} className="text-white">{employee.status}</Table.Cell>
                <Table.Cell>{employee.action}</Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      </div>

      {/* Button container */}
      <div className="my-5">
        <Button>
          <AiOutlineCheckCircle className="mr-2 h-5 w-5" />  
          Take Attendance
        </Button>
      </div>
    </div>
  );
}

export default ViewAttendance;
