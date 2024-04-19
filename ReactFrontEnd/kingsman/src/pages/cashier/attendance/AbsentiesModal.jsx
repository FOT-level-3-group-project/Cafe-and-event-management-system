import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table } from "flowbite-react";

function AbsentiesModal() {
  const [absentees, setAbsentees] = useState([]);
  const currentDate = new Date().toISOString().split('T')[0]; // Get current date in YYYY-MM-DD format

  useEffect(() => {
    fetchAbsentees();
  }, []);

  const fetchAbsentees = () => {
    axios.get(`http://localhost:8080/Absent-Employees?date=${currentDate}`)
      .then(response => {
        setAbsentees(response.data);
      })
      .catch(error => {
        console.error('Error fetching absentees:', error);
      });
  };

  return (
    <div>
      <Table hoverable className='shadow border' >
        <Table.Head>
          <Table.HeadCell>EMP ID</Table.HeadCell>
          <Table.HeadCell>EMP Name</Table.HeadCell>
          <Table.HeadCell>Position</Table.HeadCell>
          <Table.HeadCell>Date</Table.HeadCell>
          <Table.HeadCell>Status</Table.HeadCell>
        </Table.Head>
        <Table.Body className="divide-y">
          {absentees.map((absentee, index) => (
            <Table.Row key={index} className="bg-white dark:border-gray-700 dark:bg-gray-800">
              <Table.Cell>{absentee.empId}</Table.Cell>
              <Table.Cell>{absentee.empName}</Table.Cell>
              <Table.Cell>{absentee.position}</Table.Cell>
              <Table.Cell>{currentDate}</Table.Cell>
              <Table.Cell>Absent</Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </div>
  );
}

export default AbsentiesModal;
