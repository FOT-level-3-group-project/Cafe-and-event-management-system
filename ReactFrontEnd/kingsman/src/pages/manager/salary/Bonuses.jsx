import React from 'react'
import { Table } from "flowbite-react";
import { Button } from "flowbite-react";
import { FaEdit, FaTrash } from 'react-icons/fa';

function Bonuses() {
  return (
<div className='bg-gray-200 h-screen'>
<div className='h-20 border bg-slate-800'>
    <div className='flex flex-wrap justify-center gap-10 mt-5'>
    <Button gradientDuoTone="cyanToBlue">Add Bonus</Button>
    <Button gradientDuoTone="cyanToBlue">Diduction</Button>
    </div>
 
</div>    
<div className="flex">
  <div className="flex-1   ml-10 mr-8 mt-8">
  <Table hoverable className='drop-shadow-lg'>
        <Table.Head>
        <Table.HeadCell>Employee Name</Table.HeadCell>
        <Table.HeadCell>Bonus Type</Table.HeadCell>
        <Table.HeadCell>Bonus (R<span style={{ textTransform: 'lowercase' }}>s</span>.)</Table.HeadCell>
        <Table.HeadCell>Action</Table.HeadCell>

        </Table.Head>
        <Table.Body className="divide-y">
          
        <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
            <Table.Cell>W.A.T.I Bandara</Table.Cell>
            <Table.Cell>New Year Bonus</Table.Cell>
            <Table.Cell>2000</Table.Cell>
            <Table.Cell className="flex">
              <FaEdit className="text-blue-500 mr-2 hover:text-blue-700 cursor-pointer text-lg" />
              <FaTrash className="text-red-500 hover:text-red-700 cursor-pointer text-lg" />
            </Table.Cell>
          </Table.Row>
          <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
            <Table.Cell>W.G Madhushan</Table.Cell>
            <Table.Cell>Attendance Bonus</Table.Cell>
            <Table.Cell>2500</Table.Cell>
            <Table.Cell className="flex">
              <FaEdit className="text-blue-500 mr-2 hover:text-blue-700 cursor-pointer text-lg" />
              <FaTrash className="text-red-500 hover:text-red-700 cursor-pointer text-lg" />
            </Table.Cell>
          </Table.Row>
          <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
            <Table.Cell>C.D Senarathna</Table.Cell>
            <Table.Cell>Attendance Bonus</Table.Cell>
            <Table.Cell>2500</Table.Cell>
            <Table.Cell className="flex">
              <FaEdit className="text-blue-500 mr-2 hover:text-blue-700 cursor-pointer text-lg" />
              <FaTrash className="text-red-500 hover:text-red-700 cursor-pointer text-lg" />
            </Table.Cell>
          </Table.Row>
 
          

        </Table.Body>
      </Table>
  </div>

<div className="flex-1   ml-8 mr-10 mt-8">
  <Table hoverable className='drop-shadow-lg'>
        <Table.Head>
          <Table.HeadCell>Employee Name</Table.HeadCell>
          <Table.HeadCell>Diduction Type</Table.HeadCell>
          <Table.HeadCell>Diduction (R<span style={{ textTransform: 'lowercase' }}>s</span>.)</Table.HeadCell>
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
          <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
            <Table.Cell>W.G Madhushan</Table.Cell>
            <Table.Cell>Instrument</Table.Cell>
            <Table.Cell>2500</Table.Cell>
            <Table.Cell className="flex">
              <FaEdit className="text-blue-500 mr-2 hover:text-blue-700 cursor-pointer text-lg" />
              <FaTrash className="text-red-500 hover:text-red-700 cursor-pointer text-lg" />
            </Table.Cell>
          </Table.Row>
          <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
            <Table.Cell>C.D Senarathna</Table.Cell>
            <Table.Cell>Adance</Table.Cell>
            <Table.Cell>2500</Table.Cell>
            <Table.Cell className="flex">
              <FaEdit className="text-blue-500 mr-2 hover:text-blue-700 cursor-pointer text-lg" />
              <FaTrash className="text-red-500 hover:text-red-700 cursor-pointer text-lg" />
            </Table.Cell>
          </Table.Row>

        </Table.Body>
      </Table>
  </div>
</div>
</div>

  )
}

export default Bonuses

 