import React, { useState } from "react";
import { Checkbox, Table } from "flowbite-react";
import { Button } from "flowbite-react";
import { AiOutlineCheckCircle } from "react-icons/ai"; // Importing check circle icon

function Attendance() {
  const [attendance, setAttendance] = useState([
    { id: 1, firstName: "John", lastName: "Doe", position: "Manager", halfDay: false, fullDay: false },
    { id: 2, firstName: "Jane", lastName: "Smith", position: "Server", halfDay: false, fullDay: false },
    { id: 3, firstName: "Michael", lastName: "Johnson", position: "Chef", halfDay: false, fullDay: false },
    { id: 4, firstName: "Emily", lastName: "Brown", position: "Waiter", halfDay: false, fullDay: false },
    { id: 5, firstName: "Davidd", lastName: "Wilson", position: "Bartender", halfDay: false, fullDay: false },
    // Add more data rows as needed
  ]);

  // Function to handle checkbox change
  const handleCheckboxChange = (employeeId, checkboxType) => {
    setAttendance(prevAttendance => {
      return prevAttendance.map(employee => {
        if (employee.id === employeeId) {
          if (checkboxType === "halfDay") {
            return { ...employee, halfDay: true, fullDay: false };
          } else {
            return { ...employee, halfDay: false, fullDay: true };
          }
        }
        return employee;
      });
    });
  };

  // Get today's date in the format: DD-MM-YYYY
  const todayDate = new Date().toLocaleDateString("en-US", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric"
  });

  return (
    <div className="items-center flex justify-center flex-col my-5" 
          style={{ backgroundImage: "url('/Attendance.png')", backgroundRepeat: "no-repeat",
           backgroundPosition: "right", backgroundSize: "cover"  }}>
      {/* Header */}
      <h1 style={{ fontFamily: "Arial", color: "blue", fontSize: "24px", fontWeight: "bold" }}>
        Take Attendance (Today's Date: {todayDate})
      </h1>

      {/* Table container */}
      <div>
        <Table hoverable className="my-4">
          <Table.Head>
            <Table.HeadCell>#</Table.HeadCell>
            <Table.HeadCell>First Name</Table.HeadCell>
            <Table.HeadCell>Last Name</Table.HeadCell>
            <Table.HeadCell>Position</Table.HeadCell>
            <Table.HeadCell>Half Day</Table.HeadCell>
            <Table.HeadCell>Full Day</Table.HeadCell>
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
                <Table.Cell>
                  <Checkbox checked={employee.halfDay} onChange={() => handleCheckboxChange(employee.id, "halfDay")} />
                </Table.Cell>
                <Table.Cell>
                  <Checkbox checked={employee.fullDay} onChange={() => handleCheckboxChange(employee.id, "fullDay")} />
                </Table.Cell>
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

export default Attendance;
