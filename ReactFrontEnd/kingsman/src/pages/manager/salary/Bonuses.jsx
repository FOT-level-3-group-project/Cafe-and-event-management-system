import React, { useState } from 'react';
import axios from 'axios';
import { Button, Modal, Label, TextInput } from "flowbite-react";
import { FaEdit, FaTrash } from 'react-icons/fa';
import DeductionsTable from './DeductionsTable';
import HourlyPayTable from './HourlyPayTable';
import BonusesTable from './BonusesTable';

function Bonuses() {
  const [bonusModalOpen, setBonusModalOpen] = useState(false);
  const [deductionModalOpen, setDeductionModalOpen] = useState(false);
  const [hourlyModalOpen, setHourlyModalOpen] = useState(false);
  const [employeeName, setEmployeeName] = useState('');
  const [bonusType, setBonusType] = useState('');
  const [bonusAmount, setBonusAmount] = useState(0);
  const [deductionType, setDeductionType] = useState('');
  const [deductionAmount, setDeductionAmount] = useState(0);
  const [hourlyPay, setHourlyPay] = useState(0);
  const [otPay, setOTPay] = useState(0);
  const [position, setPosition] = useState('');

  const handleOpenBonusModal = () => {
    setBonusModalOpen(true);
  };

  const handleOpenDeductionModal = () => {
    setDeductionModalOpen(true);
  };

  const handleOpenHourlyModal = () => {
    setHourlyModalOpen(true);
  };

  const closeBonusModal = () => {
    setBonusModalOpen(false);
    setEmployeeName('');
    setBonusType('');
    setBonusAmount(0);
  };

  const closeDeductionModal = () => {
    setDeductionModalOpen(false);
    setEmployeeName('');
    setDeductionType('');
    setDeductionAmount(0);
  };

  const closeHourlyModal = () => {
    setHourlyModalOpen(false);
    setHourlyPay(0);
    setOTPay(0);
    setPosition('');
  };

  const handleAddBonus = () => {
    const bonusData = {
      empName: employeeName,
      bonusType: bonusType,
      bonus: bonusAmount.toString()
    };

    axios.post('http://localhost:8080/api/bonus', bonusData)
      .then(response => {
        console.log('Bonus added successfully:', response.data);
        closeBonusModal();
      })
      .catch(error => {
        console.error('Error adding bonus:', error);
      });
  };

  const handleAddDeduction = () => {
    const deductionData = {
      empName: employeeName,
      deductionType: deductionType,
      deduction: deductionAmount.toString()
    };

    axios.post('http://localhost:8080/api/deduction', deductionData)
      .then(response => {
        console.log('Deduction added successfully:', response.data);
        closeDeductionModal();
      })
      .catch(error => {
        console.error('Error adding deduction:', error);
      });
  };

  const handleAddHourlyPay = () => {
    const hourlyPayData = {
      position: position,
      payPerHour: parseFloat(hourlyPay),
      payPerOverTimeHour: parseFloat(otPay)
    };

    axios.post('http://localhost:8080/hourPayments/create', hourlyPayData)
      .then(response => {
        console.log('Hourly pay added successfully:', response.data);
        closeHourlyModal();
      })
      .catch(error => {
        console.error('Error adding hourly pay:', error);
      });
  };

  return (
    <div className='bg-gray-200 h-screen'>
      <div className='h-20 border bg-slate-800'>
        <div className='flex flex-wrap justify-center gap-10 mt-5'>
          <Button gradientDuoTone="cyanToBlue" onClick={handleOpenBonusModal}>Add Bonus</Button>
          <Button gradientDuoTone="cyanToBlue" onClick={handleOpenDeductionModal}>Add Deduction</Button>
          <Button gradientDuoTone="cyanToBlue" onClick={handleOpenHourlyModal}>Pay Per Hour</Button>
        </div>
      </div>

      {/* Render DeductionsTable, HourlyPayTable, and BonusesTable components */}
      <div className='flex flex-row'>
      <div className="flex-1 ml-8 mr-5 mt-8 mb-6">
        <DeductionsTable />
        
      </div>
      <div className="flex-1 ml-2 mr-10 mt-8">
      <BonusesTable />
      </div>
      </div>
        

      

      
       

      {/* Modals for adding bonus, deduction, and hourly pay */}
      
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
              <TextInput
                id="bonusType"
                type="text"
                value={bonusType}
                onChange={(event) => setBonusType(event.target.value)}
                placeholder="Enter Bonus Type"
                className="w-full border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 dark:bg-gray-700 dark:border-gray-700 dark:focus:border-gray-500 dark:focus:ring-gray-600 dark:text-gray-300 rounded-md"
              />
            </div>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="bonusAmount" value="Bonus Amount (Rs.)" />
              </div>
              <TextInput
                id="bonusAmount"
                type="number"
                value={bonusAmount}
                onChange={(event) => setBonusAmount(event.target.value)}
                placeholder="Enter Bonus Amount"
                className="w-full border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 dark:bg-gray-700 dark:border-gray-700 dark:focus:border-gray-500 dark:focus:ring-gray-600 dark:text-gray-300 rounded-md"
              />
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button gradientDuoTone="cyanToBlue" onClick={handleAddBonus}>Add Bonus</Button>
          <Button gradientDuoTone="gray" onClick={closeBonusModal}>Cancel</Button>
        </Modal.Footer>
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
              <TextInput
                id="deductionType"
                type="text"
                value={deductionType}
                onChange={(event) => setDeductionType(event.target.value)}
                placeholder="Enter Deduction Type"
                className="w-full border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 dark:bg-gray-700 dark:border-gray-700 dark:focus:border-gray-500 dark:focus:ring-gray-600 dark:text-gray-300 rounded-md"
              />
            </div>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="deductionAmount" value="Deduction Amount (Rs.)" />
              </div>
              <TextInput
                id="deductionAmount"
                type="number"
                value={deductionAmount}
                onChange={(event) => setDeductionAmount(event.target.value)}
                placeholder="Enter Deduction Amount"
                className="w-full border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 dark:bg-gray-700 dark:border-gray-700 dark:focus:border-gray-500 dark:focus:ring-gray-600 dark:text-gray-300 rounded-md"
              />
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button gradientDuoTone="cyanToBlue" onClick={handleAddDeduction}>Add Deduction</Button>
          <Button gradientDuoTone="gray" onClick={closeDeductionModal}>Cancel</Button>
        </Modal.Footer>
      </Modal>

   {/* Add Hourly Pay Modal */}
   <Modal show={hourlyModalOpen} size="md" onClose={closeHourlyModal} popup>
        <Modal.Header />
        <Modal.Body>
          <div className="space-y-6">
            <h3 className="text-xl font-medium text-gray-900 dark:text-white">Add Hourly Pay</h3>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="position" value="Position" />
              </div>
              <TextInput
                id="position"
                type="text"
                value={position}
                onChange={(event) => setPosition(event.target.value)}
                placeholder="Enter Position"
                className="w-full border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 dark:bg-gray-700 dark:border-gray-700 dark:focus:border-gray-500 dark:focus:ring-gray-600 dark:text-gray-300 rounded-md"
              />
            </div>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="hourlyPay" value="Hourly Pay" />
              </div>
              <TextInput
                id="hourlyPay"
                type="number"
                value={hourlyPay}
                onChange={(event) => setHourlyPay(event.target.value)}
                placeholder="Enter Hourly Pay"
                className="w-full border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 dark:bg-gray-700 dark:border-gray-700 dark:focus:border-gray-500 dark:focus:ring-gray-600 dark:text-gray-300 rounded-md"
              />
            </div>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="otPay" value="OT Pay" />
              </div>
              <TextInput
                id="otPay"
                type="number"
                value={otPay}
                onChange={(event) => setOTPay(event.target.value)}
                placeholder="Enter OT Pay"
                className="w-full border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 dark:bg-gray-700 dark:border-gray-700 dark:focus:border-gray-500 dark:focus:ring-gray-600 dark:text-gray-300 rounded-md"
              />
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button gradientDuoTone="cyanToBlue" onClick={handleAddHourlyPay}>Add Payment</Button>
          <Button gradientDuoTone="gray" onClick={closeHourlyModal}>Cancel</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default Bonuses;
