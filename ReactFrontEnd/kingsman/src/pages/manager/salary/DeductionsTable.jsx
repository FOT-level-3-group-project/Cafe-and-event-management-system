import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, Button, Modal, TextInput } from 'flowbite-react';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { HiOutlineExclamationCircle } from 'react-icons/hi';

function DeductionsTable({ fetchDeductions }) {
  const [deductions, setDeductions] = useState([]);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [deleteDeductionId, setDeleteDeductionId] = useState(null);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editDeductionData, setEditDeductionData] = useState({
    id: null,
    empName: '',
    deductionType: '',
    deduction: 0
  });

  useEffect(() => {
    fetchDeductions().then(data => {
      setDeductions(data);
    }).catch(error => {
      console.error('Error fetching deductions:', error);
    });
  }, [fetchDeductions]);

  const handleDeleteDeduction = (id) => {
    setDeleteDeductionId(id);
    setDeleteModalOpen(true);
  };

  const confirmDeleteDeduction = async () => {
    try {
      await axios.delete(`http://localhost:8080/api/deduction/${deleteDeductionId}`);
      setDeductions(deductions.filter(deduction => deduction.id !== deleteDeductionId));
      console.log('Deduction deleted successfully');
    } catch (error) {
      console.error('Error deleting deduction:', error);
    } finally {
      setDeleteModalOpen(false);
    }
  };

  const closeDeleteModal = () => {
    setDeleteModalOpen(false);
    setDeleteDeductionId(null);
  };

  const handleEditDeduction = (deduction) => {
    setEditDeductionData({
      id: deduction.id,
      empName: deduction.empName,
      deductionType: deduction.deductionType,
      deduction: deduction.deduction
    });
    setEditModalOpen(true);
  };

  const confirmEditDeduction = async () => {
    try {
      await axios.put(`http://localhost:8080/api/deduction/${editDeductionData.id}`, editDeductionData);
      fetchDeductions().then(data => {
        setDeductions(data);
        console.log('Deductions updated successfully');
      }).catch(error => {
        console.error('Error fetching deductions after update:', error);
      });
    } catch (error) {
      console.error('Error updating deduction:', error);
    } finally {
      setEditModalOpen(false);
      setEditDeductionData({
        id: null,
        empName: '',
        deductionType: '',
        deduction: 0
      });
    }
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-4 mt-7">Deductions</h2>
      <Table hoverable className='drop-shadow-lg'>
        <Table.Head>
          <Table.HeadCell>Employee Name</Table.HeadCell>
          <Table.HeadCell>Deduction Type</Table.HeadCell>
          <Table.HeadCell>Deduction (R<span style={{ textTransform: 'lowercase' }}>s</span>)</Table.HeadCell>
          <Table.HeadCell>Action</Table.HeadCell>
        </Table.Head>
        <Table.Body className="divide-y">
          {deductions.map((deduction, index) => (
            <Table.Row key={index} className="bg-white dark:border-gray-700 dark:bg-gray-800">
              <Table.Cell>{deduction.empName}</Table.Cell>
              <Table.Cell>{deduction.deductionType}</Table.Cell>
              <Table.Cell>{deduction.deduction}</Table.Cell>
              <Table.Cell className="flex">
                <FaEdit
                  className="text-blue-500 mr-2 hover:text-blue-700 cursor-pointer text-lg"
                  onClick={() => handleEditDeduction(deduction)}
                />
                <FaTrash
                  className="text-red-500 hover:text-red-700 cursor-pointer text-lg"
                  onClick={() => handleDeleteDeduction(deduction.id)}
                />
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>

      {/* Delete Confirmation Modal */}
      <Modal show={deleteModalOpen} size="md" onClose={closeDeleteModal} popup>
        <Modal.Header />
        <Modal.Body>
          <div className="text-center">
            <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
            <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
              Are you sure you want to delete this deduction?
            </h3>
            <div className="flex justify-center gap-4">
              <Button color="failure" onClick={confirmDeleteDeduction}>
                {"Yes, I'm sure"}
              </Button>
              <Button color="gray" onClick={closeDeleteModal}>
                No, cancel
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>

      {/* Edit Deduction Modal */}
      <Modal show={editModalOpen} size="md" onClose={() => setEditModalOpen(false)} popup>
        <Modal.Header />
        <Modal.Body>
          <div className="space-y-6">
            <h3 className="text-xl font-medium text-gray-900 dark:text-white">Edit Deduction</h3>
            <div>
              <div className="mb-2 block">
                <TextInput
                  id="editEmpName"
                  type="text"
                  value={editDeductionData.empName}
                  disabled
                  placeholder="Employee Name"
                  className="w-full border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 dark:bg-gray-700 dark:border-gray-700 dark:focus:border-gray-500 dark:focus:ring-gray-600 dark:text-gray-300 rounded-md"
                />
              </div>
              <div className="mb-2 block">
                <TextInput
                  id="editDeductionType"
                  type="text"
                  value={editDeductionData.deductionType}
                  onChange={(e) => setEditDeductionData({ ...editDeductionData, deductionType: e.target.value })}
                  placeholder="Deduction Type"
                  className="w-full border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 dark:bg-gray-700 dark:border-gray-700 dark:focus:border-gray-500 dark:focus:ring-gray-600 dark:text-gray-300 rounded-md"
                />
              </div>
              <div className="mb-2 block">
                <TextInput
                  id="editDeductionAmount"
                  type="number"
                  value={editDeductionData.deduction}
                  onChange={(e) => setEditDeductionData({ ...editDeductionData, deduction: e.target.value })}
                  placeholder="Deduction Amount"
                  className="w-full border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 dark:bg-gray-700 dark:border-gray-700 dark:focus:border-gray-500 dark:focus:ring-gray-600 dark:text-gray-300 rounded-md"
                />
              </div>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button gradientDuoTone="cyanToBlue" onClick={confirmEditDeduction}>Update Deduction</Button>
          <Button gradientDuoTone="gray" onClick={() => setEditModalOpen(false)}>Cancel</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default DeductionsTable;
