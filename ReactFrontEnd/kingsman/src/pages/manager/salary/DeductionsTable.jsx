import React from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { Table } from "flowbite-react";

const DeductionsTable = () => {
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
          <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
            <Table.Cell>W.A.T.I Bandara</Table.Cell>
            <Table.Cell>Advance</Table.Cell>
            <Table.Cell>2000</Table.Cell>
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

export default DeductionsTable;
