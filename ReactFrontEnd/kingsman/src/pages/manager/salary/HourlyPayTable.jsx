import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, Modal, Button, TextInput } from 'flowbite-react';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { HiOutlineExclamationCircle } from 'react-icons/hi';

function HourlyPayTable() {
  const [hourPayments, setHourPayments] = useState([]);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [deleteHourPaymentId, setDeleteHourPaymentId] = useState(null);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editHourPaymentData, setEditHourPaymentData] = useState({
    id: null,
    position: '',
    payPerHour: 0,
    payPerOverTimeHour: 0
  });

  useEffect(() => {
    fetchHourPayments();
  }, []);

  const fetchHourPayments = async () => {
    try {
      const response = await axios.get('http://localhost:8080/hourPayments');
      setHourPayments(response.data);
    } catch (error) {
      console.error('Error fetching hour payments:', error);
    }
  };

  const handleDeleteHourPayment = (id) => {
    setDeleteHourPaymentId(id);
    setDeleteModalOpen(true);
  };

  const confirmDeleteHourPayment = async () => {
    try {
      await axios.delete(`http://localhost:8080/hourPayments/${deleteHourPaymentId}`);
      setHourPayments(hourPayments.filter(hourPayment => hourPayment.id !== deleteHourPaymentId));
      console.log('Hourly payment deleted successfully');
    } catch (error) {
      console.error('Error deleting hourly payment:', error);
    } finally {
      setDeleteModalOpen(false);
    }
  };

  const closeDeleteModal = () => {
    setDeleteModalOpen(false);
    setDeleteHourPaymentId(null);
  };

  const handleEditHourPayment = (hourPayment) => {
    setEditHourPaymentData({
      id: hourPayment.id,
      position: hourPayment.position,
      payPerHour: hourPayment.payPerHour,
      payPerOverTimeHour: hourPayment.payPerOverTimeHour
    });
    setEditModalOpen(true);
  };

  const confirmEditHourPayment = async () => {
    try {
      await axios.put(`http://localhost:8080/hourPayments/${editHourPaymentData.id}`, editHourPaymentData);
      fetchHourPayments(); // Refresh table after edit
      console.log('Hourly payment updated successfully');
    } catch (error) {
      console.error('Error updating hourly payment:', error);
    } finally {
      setEditModalOpen(false);
      setEditHourPaymentData({
        id: null,
        position: '',
        payPerHour: 0,
        payPerOverTimeHour: 0
      });
    }
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Hourly Payments</h2>
      <Table hoverable className='drop-shadow-lg'>
        <Table.Head>
          <Table.HeadCell>Position</Table.HeadCell>
          <Table.HeadCell>Pay Per Hour (Rs.)</Table.HeadCell>
          <Table.HeadCell>Pay Per OT Hour (Rs.)</Table.HeadCell>
          <Table.HeadCell>Action</Table.HeadCell>
        </Table.Head>
        <Table.Body className="divide-y">
          {hourPayments.map((hourPayment, index) => (
            <Table.Row key={index} className="bg-white dark:border-gray-700 dark:bg-gray-800">
              <Table.Cell>{hourPayment.position}</Table.Cell>
              <Table.Cell>{hourPayment.payPerHour}</Table.Cell>
              <Table.Cell>{hourPayment.payPerOverTimeHour}</Table.Cell>
              <Table.Cell className="flex">
                <FaEdit
                  className="text-blue-500 mr-2 hover:text-blue-700 cursor-pointer text-lg"
                  onClick={() => handleEditHourPayment(hourPayment)}
                />
                <FaTrash
                  className="text-red-500 hover:text-red-700 cursor-pointer text-lg"
                  onClick={() => handleDeleteHourPayment(hourPayment.id)}
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
              Are you sure you want to delete this hourly payment?
            </h3>
            <div className="flex justify-center gap-4">
              <Button color="failure" onClick={confirmDeleteHourPayment}>
                {"Yes, I'm sure"}
              </Button>
              <Button color="gray" onClick={closeDeleteModal}>
                No, cancel
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>

      {/* Edit Hourly Payment Modal */}
      <Modal show={editModalOpen} size="md" onClose={() => setEditModalOpen(false)} popup>
        <Modal.Header />
        <Modal.Body>
          <div className="space-y-6">
            <h3 className="text-xl font-medium text-gray-900 dark:text-white">Edit Hourly Payment</h3>
            <div>
              <div className="mb-2 block">
                <TextInput
                  id="editPosition"
                  type="text"
                  value={editHourPaymentData.position}
                  onChange={(e) => setEditHourPaymentData({ ...editHourPaymentData, position: e.target.value })}
                  placeholder="Position"
                  className="w-full border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 dark:bg-gray-700 dark:border-gray-700 dark:focus:border-gray-500 dark:focus:ring-gray-600 dark:text-gray-300 rounded-md"
                />
              </div>
              <div className="mb-2 block">
                <TextInput
                  id="editPayPerHour"
                  type="number"
                  value={editHourPaymentData.payPerHour}
                  onChange={(e) => setEditHourPaymentData({ ...editHourPaymentData, payPerHour: e.target.value })}
                  placeholder="Pay Per Hour (Rs.)"
                  className="w-full border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 dark:bg-gray-700 dark:border-gray-700 dark:focus:border-gray-500 dark:focus:ring-gray-600 dark:text-gray-300 rounded-md"
                />
              </div>
              <div className="mb-2 block">
                <TextInput
                  id="editPayPerOverTimeHour"
                  type="number"
                  value={editHourPaymentData.payPerOverTimeHour}
                  onChange={(e) => setEditHourPaymentData({ ...editHourPaymentData, payPerOverTimeHour: e.target.value })}
                  placeholder="Pay Per OT Hour (Rs.)"
                  className="w-full border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 dark:bg-gray-700 dark:border-gray-700 dark:focus:border-gray-500 dark:focus:ring-gray-600 dark:text-gray-300 rounded-md"
                />
              </div>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button gradientDuoTone="cyanToBlue" onClick={confirmEditHourPayment}>Update Hourly Payment</Button>
          <Button gradientDuoTone="gray" onClick={() => setEditModalOpen(false)}>Cancel</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default HourlyPayTable;
