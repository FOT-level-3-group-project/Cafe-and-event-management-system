import React from 'react'
import { Table } from "flowbite-react";

function EmpSalaries() {
  return (
    <div >
      
      <div className="overflow-x-auto mr-8 ml-8 mt-8 border shadow">
      <Table>
        <Table.Head>
          <Table.HeadCell>Emp Name</Table.HeadCell>
          <Table.HeadCell>Pay per Hour</Table.HeadCell>
          <Table.HeadCell>Worked Hours</Table.HeadCell>
          <Table.HeadCell className="text-red-600">Total Payment for WH</Table.HeadCell>
          <Table.HeadCell>Pay per OT Hour</Table.HeadCell>
          <Table.HeadCell>OT Hours</Table.HeadCell>
          <Table.HeadCell className="text-red-600">Total Payment for OT</Table.HeadCell>
          <Table.HeadCell className="text-red-600">Bonuses</Table.HeadCell>
          <Table.HeadCell className="text-red-600">Diductions</Table.HeadCell>
          <Table.HeadCell className="text-red-600">Gross Payment</Table.HeadCell>

        </Table.Head>
        <Table.Body className="divide-y">
          <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
            <Table.Cell>W.A.T.I Bandara</Table.Cell>
            <Table.Cell>280</Table.Cell>
            <Table.Cell>300</Table.Cell>
            <Table.Cell>84000</Table.Cell>
            <Table.Cell>350</Table.Cell>
            <Table.Cell>12</Table.Cell>
            <Table.Cell>4200</Table.Cell>
            <Table.Cell>1500</Table.Cell>
            <Table.Cell>10000</Table.Cell>
            <Table.Cell>79700</Table.Cell>
          </Table.Row>

            <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
            <Table.Cell>D.S.A.K Senevirathne</Table.Cell>
            <Table.Cell>250</Table.Cell>
            <Table.Cell>280</Table.Cell>
            <Table.Cell>70000</Table.Cell>
            <Table.Cell>300</Table.Cell>
            <Table.Cell>10</Table.Cell>
            <Table.Cell>3000</Table.Cell>
            <Table.Cell>2000</Table.Cell>
            <Table.Cell>8000</Table.Cell>
            <Table.Cell>76200</Table.Cell>
            </Table.Row>

            <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
            <Table.Cell>C.D Senarathna</Table.Cell>
            <Table.Cell>300</Table.Cell>
            <Table.Cell>320</Table.Cell>
            <Table.Cell>96000</Table.Cell>
            <Table.Cell>200</Table.Cell>
            <Table.Cell>15</Table.Cell>
            <Table.Cell>3000</Table.Cell>
            <Table.Cell>1000</Table.Cell>
            <Table.Cell>12000</Table.Cell>
            <Table.Cell>84300</Table.Cell>
           </Table.Row>
          
        </Table.Body>
      </Table>
      </div>
    </div>
    
  );
}


export default EmpSalaries