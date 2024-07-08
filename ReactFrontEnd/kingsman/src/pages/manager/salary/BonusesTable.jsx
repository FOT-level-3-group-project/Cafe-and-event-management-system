import React, { useState, useEffect } from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { Table } from "flowbite-react";
import axios from 'axios';

const BonusesTable = () => {
  const [bonuses, setBonuses] = useState([]);

  useEffect(() => {
    fetchBonuses();
  }, []);

  const fetchBonuses = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/bonus');
      setBonuses(response.data);
    } catch (error) {
      console.error('Error fetching bonuses:', error);
      // Handle error fetching data
    }
  };

  return (
    <div className="flex-1 ml-10 mr-8 mt-8">
      <Table hoverable className='drop-shadow-lg'>
        <Table.Head>
          <Table.HeadCell>Employee Name</Table.HeadCell>
          <Table.HeadCell>Bonus Type</Table.HeadCell>
          <Table.HeadCell>Bonus (Rs.)</Table.HeadCell>
          <Table.HeadCell>Action</Table.HeadCell>
        </Table.Head>
        <Table.Body className="divide-y">
          {bonuses.map((bonus, index) => (
            <Table.Row key={index} className="bg-white dark:border-gray-700 dark:bg-gray-800">
              <Table.Cell>{bonus.empName}</Table.Cell>
              <Table.Cell>{bonus.bonusType}</Table.Cell>
              <Table.Cell>{bonus.bonus}</Table.Cell>
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

export default BonusesTable;
