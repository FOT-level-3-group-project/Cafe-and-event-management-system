import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Table } from "flowbite-react";

const BillPayments = () => {
    const [payments, setPayments] = useState([]);
    const [newPaymentData, setNewPaymentData] = useState({
        payDate: '',
        billType: '',
        amount: ''
    });
    const [editMode, setEditMode] = useState(false);
    const [currentPaymentId, setCurrentPaymentId] = useState(null);
    const [errorMessage, setErrorMessage] = useState('');


    useEffect(() => {
        ViewAllPayments();
    }, []);


    const ViewAllPayments = async () => {
        try {
            const response = await axios.get('http://localhost:8080/api/payment/getAllPayments');
            setPayments(response.data);
        } catch (error) {
            console.error('Error fetching payment data:', error);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        // Check if the value is numeric (allowing empty string for easy input)
        if (name === 'amount' && !(/^\d*\.?\d*$/.test(value))) {
            return; // Don't update state if not numeric
        }

        setNewPaymentData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleAddPayment = async (e) => {
        e.preventDefault();
        try {
            if (editMode) {
                await axios.put(`http://localhost:8080/api/payment/updatePayment/${currentPaymentId}`, newPaymentData);
            } else {
                await axios.post('http://localhost:8080/api/payment/addPayment', newPaymentData);
            }
            ViewAllPayments(); // Refresh payments after adding/updating payment
            setNewPaymentData({ payDate: '', billType: '', amount: '' }); // Clear form fields
            setEditMode(false); // Reset edit mode
            setCurrentPaymentId(null); // Reset current payment ID
            setErrorMessage(''); // Clear any previous error messages
        } catch (error) {
            if (error.response && error.response.data) {
                setErrorMessage(error.response.data); // Set error message from response
            } else {
                console.error('Error adding payment:', error);
            }
        }
    };

    const handleEditPayment = (payment) => {
        setEditMode(true);
        setCurrentPaymentId(payment.payID);
        setNewPaymentData({
            payDate: payment.payDate,
            billType: payment.billType,
            amount: payment.amount
        });
    };

    const handleCancelAdd = () => {
        setNewPaymentData({ payDate: '', billType: '', amount: '' });
        setErrorMessage('');
        
    };

    const handleCancelEdit = () => {
        setEditMode(false);
        setNewPaymentData({ payDate: '', billType: '', amount: '' });
        setCurrentPaymentId(null);
        setErrorMessage('');
    };

    const billTypes = [
        'Electricity Bill',
        'Water Bill',
        'Telephone Bill',
        'Internet Bill',
        'Insurance',
        'Other Expenses'
    ];

    return (
        <div className="flex flex-col w-full bg-gray-200">
            <div className="flex items-center m-4 justify-between border-b bg-white dark:bg-gray-500 p-3 shadow-md rounded-md">
                <h1 className="text-2xl font-bold mb-3">Bill Payments </h1>
            </div>

            <div className="w-full flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
                {/* Left Side: Search Bar and Payment Details Table */}
                <div className="w-full md:w-1/2">
                    {/* Payment Details Table */}
                    <div className="relative overflow-x-auto shadow-md bg-white rounded-md">
                        <Table hoverable>
                            <Table.Head>
                                <Table.HeadCell className="bg-green-100"> Payment Date </Table.HeadCell>
                                <Table.HeadCell className="bg-green-100"> Bill Type </Table.HeadCell>
                                <Table.HeadCell className="bg-green-100"> Amount </Table.HeadCell>
                                <Table.HeadCell className="bg-green-100"> Actions </Table.HeadCell>
                            </Table.Head>
                            <Table.Body className="divide-y">
                                {payments.map((payment, index) => (
                                    <Table.Row
                                        key={payment.payID}
                                        className={
                                            index % 2 === 0
                                                ? "bg-gray-100 dark:bg-gray-500 dark:text-white"
                                                : "bg-gray-150 dark:bg-gray-700 dark:text-white"
                                        }>
                                        <Table.Cell className="text-black dark:text-slate-200 dark:bg-gray-600">{payment.payDate}</Table.Cell>
                                        <Table.Cell className="text-black dark:text-slate-200 dark:bg-gray-600">{payment.billType}</Table.Cell>
                                        <Table.Cell className="text-black dark:text-slate-200 dark:bg-gray-600">{payment.amount}</Table.Cell>
                                        <Table.Cell className="text-black dark:text-slate-200 dark:bg-gray-600">
                                            <button
                                                onClick={() => handleEditPayment(payment)}
                                                className="text-blue-500 hover:underline"
                                            >
                                                Update Payment
                                            </button>
                                        </Table.Cell>
                                    </Table.Row>
                                ))}
                            </Table.Body>
                        </Table>
                    </div>
                </div>

                {/* Right Side: Form to Add New Payment */}
                <div className="w-full md:w-1/2">
                    <div className="p-4 bg-white shadow-md rounded-md">
                        <h2 className="text-xl font-bold mb-2">{editMode ? 'Update Payment' : 'Add New Payment'}</h2>
                        {errorMessage && (
                            <div className="text-red-500 mt-2">
                                {errorMessage}
                            </div>
                        )}
                        <form onSubmit={handleAddPayment}>
                            <div className="flex flex-col md:flex-row md:space-x-4">
                                <div className="flex-1">
                                    <label htmlFor="payDate" className="block text-sm font-medium text-gray-700">Payment Date:</label>
                                    <input
                                        type="date"
                                        id="payDate"
                                        name="payDate"
                                        value={newPaymentData.payDate}
                                        onChange={handleInputChange}
                                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                        required
                                        readOnly={editMode} // Make read-only in edit mode
                                    />
                                </div>
                                <div className="flex-1">
                                    <label htmlFor="billType" className="block text-sm font-medium text-gray-700">Bill Type:</label>
                                    <select
                                        id="billType"
                                        name="billType"
                                        value={newPaymentData.billType}
                                        onChange={handleInputChange}
                                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                        required
                                        disabled={editMode} // Disable in edit mode
                                    >
                                        <option value="">Select Bill Type</option>
                                        {billTypes.map((type, index) => (
                                            <option key={index} value={type}>{type}</option>
                                        ))}
                                    </select>
                                </div>
                                <div className="flex-1">
                                    <label htmlFor="amount" className="block text-sm font-medium text-gray-700">Amount (Rs.):</label>
                                    <input
                                        type="text"
                                        id="amount"
                                        name="amount"
                                        value={newPaymentData.amount}
                                        onChange={handleInputChange}
                                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                        required
                                    />
                                </div>
                            </div>
                            <div className="mt-4 flex justify-between">
                                <button
                                    type="submit"
                                    className="bg-green-500 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-md"
                                >
                                    {editMode ? 'Update Payment' : 'Add Payment'}
                                </button>
                                 {editMode && (
                                    <button
                                        type="button"
                                        onClick={handleCancelEdit}
                                        className="bg-gray-500 hover:bg-gray-700 text-white font-semibold py-2 px-4 rounded-md"
                                    >
                                        Cancel
                                    </button>
                                )}
                                {!editMode && (
                                    <button
                                        type="button"
                                        onClick={handleCancelAdd}
                                        className="bg-gray-500 hover:bg-gray-700 text-white font-semibold py-2 px-4 rounded-md"
                                    >
                                        Cancel
                                    </button>
                                )}
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default BillPayments;
