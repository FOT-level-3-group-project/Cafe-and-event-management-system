import React, { useState, useEffect } from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { Table } from "flowbite-react";
import axios from 'axios';

const HourlyPayTable = () => {
  const [hourPayments, setHourPayments] = useState([]);

  useEffect(() => {
    fetchHourPayments();
  }, []);

  const fetchHourPayments = async () => {
    try {
      const response = await axios.get('http://localhost:8080/hourPayments');
      setHourPayments(response.data);
    } catch (error) {
      console.error('Error fetching hour payments:', error);
      // Handle error fetching data
    }
  };

  return (
    <div className="flex-1 ml-50 mr-80 mt-4">
      <Table hoverable className='drop-shadow-lg w-full'>
        <Table.Head>
          <Table.HeadCell>Position</Table.HeadCell>
          <Table.HeadCell>Pay Per Hour (Rs.)</Table.HeadCell>
          <Table.HeadCell>Pay Per OT Hour (Rs.)</Table.HeadCell>
          <Table.HeadCell>Action</Table.HeadCell>
        </Table.Head>
        <Table.Body className="divide-y">
          {hourPayments.map((hourPayment, index) => (
            <Table.Row key={index} className="bg-white dark:border-gray-700 dark:bg-gray-800">
              <Table.Cell>{hourPayment.position}</Table.Cell>
              <Table.Cell>{hourPayment.payPerHour}</Table.Cell>
              <Table.Cell>{hourPayment.payPerOverTimeHour}</Table.Cell>
              <Table.Cell className="flex">
                <FaEdit className="text-blue-500 mr-2 hover:text-blue-700 cursor-pointer text-lg" />
                <FaTrash className="text-red-500 hover:text-red-700 cursor-pointer text-lg" />
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </div>
  );
};

export default HourlyPayTable;
