import React, { useState, useEffect } from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { Table } from "flowbite-react";
import axios from 'axios';

const DeductionsTable = () => {
  const [deductions, setDeductions] = useState([]);

  useEffect(() => {
    fetchDeductions();
  }, []);

  const fetchDeductions = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/deduction');
      setDeductions(response.data);
    } catch (error) {
      console.error('Error fetching deductions:', error);
      // Handle error fetching data
    }
  };

  return (
    <div className="flex-1 ml-8 mr-10 mt-8">
      <Table hoverable className='drop-shadow-lg'>
        <Table.Head>
          <Table.HeadCell>Employee Name</Table.HeadCell>
          <Table.HeadCell>Deduction Type</Table.HeadCell>
          <Table.HeadCell>Deduction (Rs.)</Table.HeadCell>
          <Table.HeadCell>Action</Table.HeadCell>
        </Table.Head>
        <Table.Body className="divide-y">
          {deductions.map((deduction, index) => (
            <Table.Row key={index} className="bg-white dark:border-gray-700 dark:bg-gray-800">
              <Table.Cell>{deduction.empName}</Table.Cell>
              <Table.Cell>{deduction.deductionType}</Table.Cell>
              <Table.Cell>{deduction.deduction}</Table.Cell>
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

export default DeductionsTable;
