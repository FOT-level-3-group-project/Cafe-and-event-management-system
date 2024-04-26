import React, { useState } from 'react';
import { Button, Modal, Label, TextInput } from "flowbite-react";
import { FaEdit, FaTrash } from 'react-icons/fa';
import { Table } from "flowbite-react";

function Bonuses() {
  const [bonusModalOpen, setBonusModalOpen] = useState(false);
  const [deductionModalOpen, setDeductionModalOpen] = useState(false);
  const [hourlyModalOpen, setHourlyModalOpen] = useState(false); // State for pay per hour modal
  const [employeeName, setEmployeeName] = useState('');
  const [bonusType, setBonusType] = useState('');
  const [bonusAmount, setBonusAmount] = useState(0);
  const [deductionType, setDeductionType] = useState('');
  const [deductionAmount, setDeductionAmount] = useState(0);
  const [hourlyPay, setHourlyPay] = useState(0); // State for hourly pay
  const [otPay, setOTPay] = useState(0); // State for OT pay
  const [position, setPosition] = useState(''); // State for position

  const handleOpenBonusModal = () => {
    setBonusModalOpen(true);
  };

  const handleOpenDeductionModal = () => {
    setDeductionModalOpen(true);
  };

  const handleOpenHourlyModal = () => { // Function to open pay per hour edit modal
    setHourlyModalOpen(true);
  };

  const closeBonusModal = () => {
    setBonusModalOpen(false);
    // Clear input fields
    setEmployeeName('');
    setBonusType('');
    setBonusAmount(0);
  };

  const closeDeductionModal = () => {
    setDeductionModalOpen(false);
    // Clear input fields
    setEmployeeName('');
    setDeductionType('');
    setDeductionAmount(0);
  };

  const closeHourlyModal = () => { // Function to close pay per hour edit modal
    setHourlyModalOpen(false);
    // Clear input fields
    setHourlyPay(0);
    setOTPay(0);
    setPosition('');
  };

  const handleAddBonus = () => {
    // Add logic to handle adding bonus
    console.log('Employee Name:', employeeName);
    console.log('Bonus Type:', bonusType);
    console.log('Bonus Amount:', bonusAmount);
    closeBonusModal();
  };

  const handleAddDeduction = () => {
    // Add logic to handle adding deduction
    console.log('Employee Name:', employeeName);
    console.log('Deduction Type:', deductionType);
    console.log('Deduction Amount:', deductionAmount);
    closeDeductionModal();
  };

  const handleEditHourly = () => { // Function to handle editing pay per hour details
    // Add logic to handle editing pay per hour
    console.log('Position:', position);
    console.log('Hourly Pay:', hourlyPay);
    console.log('OT Pay:', otPay);
    closeHourlyModal();
  };


  return (
    <div className='bg-gray-200 h-screen'>
      <div className='h-20 border bg-slate-800'>
        <div className='flex flex-wrap justify-center gap-10 mt-5'>
          <Button gradientDuoTone="cyanToBlue" onClick={handleOpenBonusModal}>Add Bonus</Button>
          <Button gradientDuoTone="cyanToBlue" onClick={handleOpenDeductionModal}>Deduction</Button>
          <Button gradientDuoTone="cyanToBlue" onClick={handleOpenHourlyModal}>Pay Per Hour</Button>
        </div>
      </div>
      <div className="flex">
        <div className="flex-1 ml-10 mr-8 mt-8">
          <Table hoverable className='drop-shadow-lg'>
            <Table.Head>
              <Table.HeadCell>Employee Name</Table.HeadCell>
              <Table.HeadCell>Bonus Type</Table.HeadCell>
              <Table.HeadCell>Bonus (Rs.)</Table.HeadCell>
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
        <div className="flex-1 ml-8 mr-10 mt-8">
          <Table hoverable className='drop-shadow-lg'>
            <Table.Head>
              <Table.HeadCell>Employee Name</Table.HeadCell>
              <Table.HeadCell>Deduction Type </Table.HeadCell>
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
                <Table.Cell>Advance</Table.Cell>
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
              <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                <Table.Cell>Cashier</Table.Cell>
                <Table.Cell>240</Table.Cell>
                <Table.Cell>300</Table.Cell>
                <Table.Cell className="flex">
                  <FaEdit className="text-blue-500 mr-2 hover:text-blue-700 cursor-pointer text-lg" />
                  <FaTrash className="text-red-500 hover:text-red-700 cursor-pointer text-lg" />
                </Table.Cell>
              </Table.Row>
              <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                <Table.Cell>Waiter</Table.Cell>
                <Table.Cell>200</Table.Cell>
                <Table.Cell>250</Table.Cell>
                <Table.Cell className="flex">
                  <FaEdit className="text-blue-500 mr-2 hover:text-blue-700 cursor-pointer text-lg" />
                  <FaTrash className="text-red-500 hover:text-red-700 cursor-pointer text-lg" />
                </Table.Cell>
              </Table.Row>

            </Table.Body>
          </Table>
        </div>

      {/* Add Bonus Modal */}
      <Modal show={bonusModalOpen} size="md" onClose={closeBonusModal} popup>
        <Modal.Header />
        <Modal.Body>
          <div className="space-y-6">
            <h3 className="text-xl font-medium text-gray-900 dark:text-white">Add Bonus</h3>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="employeeName" value="Employee Name" />
              </div>
              <select
                id="employeeName"
                value={employeeName}
                onChange={(event) => setEmployeeName(event.target.value)}
                className="w-full border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 dark:bg-gray-700 dark:border-gray-700 dark:focus:border-gray-500 dark:focus:ring-gray-600 dark:text-gray-300 rounded-md"
              >
                <option value="">Select Employee</option>
                <option value="W.A.T.I Bandara">W.A.T.I Bandara</option>
                <option value="W.G Madhushan">W.G Madhushan</option>
                <option value="C.D Senarathna">C.D Senarathna</option>
              </select>
            </div>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="bonusType" value="Bonus Type" />
              </div>
              <select
                id="bonusType"
                value={bonusType}
                onChange={(event) => setBonusType(event.target.value)}
                className="w-full border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 dark:bg-gray-700 dark:border-gray-700 dark:focus:border-gray-500 dark:focus:ring-gray-600 dark:text-gray-300 rounded-md"
              >
                <option value="">Select Bonus Type</option>
                <option value="New Year Bonus">New Year Bonus</option>
                <option value="Attendance Bonus">Attendance Bonus</option>
                <option value="Advance">Advance</option>
                <option value="Instrument">Instrument</option>
              </select>
            </div>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="bonusAmount" value="Bonus Amount" />
              </div>
              <TextInput
                id="bonusAmount"
                type="number"
                placeholder="Bonus Amount"
                min="0"
                step="100"
                value={bonusAmount}
                onChange={(event) => setBonusAmount(event.target.value)}
                required
              />
            </div>
            <div className="flex justify-end">
              <Button onClick={handleAddBonus}>Add Bonus</Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
      {/* Add Deduction Modal */}
      <Modal show={deductionModalOpen} size="md" onClose={closeDeductionModal} popup>
        <Modal.Header />
        <Modal.Body>
          <div className="space-y-6">
            <h3 className="text-xl font-medium text-gray-900 dark:text-white">Add Deduction</h3>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="employeeName" value="Employee Name" />
              </div>
              <select
                id="employeeName"
                value={employeeName}
                onChange={(event) => setEmployeeName(event.target.value)}
                className="w-full border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 dark:bg-gray-700 dark:border-gray-700 dark:focus:border-gray-500 dark:focus:ring-gray-600 dark:text-gray-300 rounded-md"
              >
                <option value="">Select Employee</option>
                <option value="W.A.T.I Bandara">W.A.T.I Bandara</option>
                <option value="W.G Madhushan">W.G Madhushan</option>
                <option value="C.D Senarathna">C.D Senarathna</option>
              </select>
            </div>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="deductionType" value="Deduction Type" />
              </div>
              <select
                id="deductionType"
                value={deductionType}
                onChange={(event) => setDeductionType(event.target.value)}
                className="w-full border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 dark:bg-gray-700 dark:border-gray-700 dark:focus:border-gray-500 dark:focus:ring-gray-600 dark:text-gray-300 rounded-md"
              >
                <option value="">Select Deduction Type</option>
                <option value="Advance">Advance</option>
                <option value="Instrument">Instrument</option>
                <option value="Other">Other</option>
              </select>
            </div>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="deductionAmount" value="Deduction Amount" />
              </div>
              <TextInput
                id="deductionAmount"
                type="number"
                placeholder="Deduction Amount"
                min="0"
                step="100"
                value={deductionAmount}
                onChange={(event) => setDeductionAmount(event.target.value)}
                required
              />
            </div>
            <div className="flex justify-end">
              <Button onClick={handleAddDeduction}>Add Deduction</Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>

       {/* Edit Pay Per Hour Modal */}
      <Modal show={hourlyModalOpen} size="md" onClose={closeHourlyModal} popup>
        <Modal.Header />
        <Modal.Body>
          <div className="space-y-6">
            <h3 className="text-xl font-medium text-gray-900 dark:text-white">Edit Pay Per Hour</h3>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="position" value="Position" />
              </div>
              <select
                id="position"
                value={position}
                onChange={(event) => setPosition(event.target.value)}
                className="w-full border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 dark:bg-gray-700 dark:border-gray-700 dark:focus:border-gray-500 dark:focus:ring-gray-600 dark:text-gray-300 rounded-md"
              >
                <option value="">Select Position</option>
                <option value="Chef">Chef</option>
                <option value="Cashier">Cashier</option>
                <option value="Waiter">Waiter</option>
              </select>
            </div>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="hourlyPay" value="Hourly Pay (Rs.)" />
              </div>
              <TextInput
                id="hourlyPay"
                type="number"
                placeholder="Hourly Pay"
                min="0"
                step="100"
                value={hourlyPay}
                onChange={(event) => setHourlyPay(event.target.value)}
                required
              />
            </div>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="otPay" value="OT Pay (Rs.)" />
              </div>
              <TextInput
                id="otPay"
                type="number"
                placeholder="OT Pay"
                min="0"
                step="100"
                value={otPay}
                onChange={(event) => setOTPay(event.target.value)}
                required
              />
            </div>
            <div className="flex justify-end">
              <Button onClick={handleEditHourly}>Save Changes</Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>

        
    </div>
  );
}

export default Bonuses;
