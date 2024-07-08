import React from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { Table } from "flowbite-react";

const HourlyPayTable = () => {
  return (
    <div className="flex-1 ml-80 mr-80 mt-8">
      <Table hoverable className='drop-shadow-lg'>
        <Table.Head>
          <Table.HeadCell>Position</Table.HeadCell>
          <Table.HeadCell>Pay Per Hour (Rs.)</Table.HeadCell>
          <Table.HeadCell>Pay Per OT Hour (Rs.)</Table.HeadCell>
          <Table.HeadCell>Action</Table.HeadCell>
        </Table.Head>
        <Table.Body className="divide-y">
          <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
            <Table.Cell>Chef</Table.Cell>
            <Table.Cell>300</Table.Cell>
            <Table.Cell>400</Table.Cell>
            <Table.Cell className="flex">
              <FaEdit className="text-blue-500 mr-2 hover:text-blue-700 cursor-pointer text-lg" />
              <FaTrash className="text-red-500 hover:text-red-700 cursor-pointer text-lg" />
            </Table.Cell>
          </Table.Row>
          {/* Additional rows */}
        </Table.Body>
      </Table>
    </div>
  );
};

export default HourlyPayTable;
