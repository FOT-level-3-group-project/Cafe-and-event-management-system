import { Table, Button } from "flowbite-react";

import React from 'react'
import { FaEdit, FaTrash } from 'react-icons/fa';

function ViewAttendance() {
  return (
    <div>
    <div className="mt-5 ml-10 mr-10 shadow border">
    <Table hoverable>
      <Table.Head>
        <Table.HeadCell>Emp ID</Table.HeadCell>
        <Table.HeadCell>Position</Table.HeadCell>
        <Table.HeadCell>Date</Table.HeadCell>
        <Table.HeadCell>In Time</Table.HeadCell>
        <Table.HeadCell>Out Time</Table.HeadCell>
        <Table.HeadCell>Action</Table.HeadCell>
      </Table.Head>

      <Table.Body className="divide-y">
        <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
          <Table.Cell>Sliver</Table.Cell>
          <Table.Cell>Laptop</Table.Cell>
          <Table.Cell>$2999</Table.Cell>
          <Table.Cell>Laptop</Table.Cell>
          <Table.Cell>$2999</Table.Cell> 
          <Table.Cell className="flex">
            <FaEdit className="text-blue-500 mr-3 hover:text-blue-700 cursor-pointer text-lg" />
            <FaTrash className="text-red-500 hover:text-red-700 cursor-pointer text-lg" />
          </Table.Cell> 
          
        </Table.Row> 

        <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
          <Table.Cell>Sliver</Table.Cell>
          <Table.Cell>Laptop</Table.Cell>
          <Table.Cell>$2999</Table.Cell>
          <Table.Cell>Laptop</Table.Cell>
          <Table.Cell>$2999</Table.Cell>
          <Table.Cell className="flex">
            <FaEdit className="text-blue-500 mr-3 hover:text-blue-700 cursor-pointer text-lg" />
            <FaTrash className="text-red-500 hover:text-red-700 cursor-pointer text-lg" />
          </Table.Cell>  
        </Table.Row>

        <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
          <Table.Cell>Sliver</Table.Cell>
          <Table.Cell>Laptop</Table.Cell>
          <Table.Cell>$2999</Table.Cell>
          <Table.Cell>Laptop</Table.Cell>
          <Table.Cell>$2999</Table.Cell> 
          <Table.Cell className="flex">
            <FaEdit className="text-blue-500 mr-3 hover:text-blue-700 cursor-pointer text-lg" />
            <FaTrash className="text-red-500 hover:text-red-700 cursor-pointer text-lg" />
          </Table.Cell> 
        </Table.Row>

      </Table.Body>
    </Table>
  </div>
  </div>
  )
}

export default ViewAttendance