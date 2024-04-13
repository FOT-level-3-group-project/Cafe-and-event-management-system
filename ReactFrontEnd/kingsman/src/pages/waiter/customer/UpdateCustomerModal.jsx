import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import {Modal} from "flowbite-react";
import axios from 'axios';
import toast from 'react-hot-toast';


export default function UpdateCustomerModal({ isOpen, onToggle, customerUpdateModalResponse, currentCustomerData }) {

    const [formErrors, setFormErrors] = useState([]);
    const [responseErrors, setResponseErrors] = useState('');
    const [customerData, setCustomerData] = useState({});

    useEffect(() => {
        if (isOpen) {
            setFormErrors([]);
            setResponseErrors('');
            setCustomerData(currentCustomerData);
        }
    }, [isOpen, currentCustomerData]);
    

    const handleSubmit = async (e) => {
        e.preventDefault();

        setFormErrors([])
        setResponseErrors("");

        const { name, mobile, email } = e.target.elements;

        const formData = {
            cusId:customerData.cusId,
            cusName: name.value.trim(),
            cusMobile: mobile.value.trim(),
            cusEmail: email.value.trim(),
            employeeId: currentCustomerData.employeeId
        };
        setCustomerData(formData);

        const errors = [];

        //validations
        const mobileRegex = /^\d{10}$/;
        if (!mobileRegex.test(formData.cusMobile)) {
            errors.push('Mobile number must be 10 digits');
        }
    
        if (!formData.cusName) {
            errors.push('Name is required');
        }
    
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (formData.cusEmail && !emailRegex.test(formData.cusEmail)) {
            errors.push('Invalid email format');
        }
        
        // Display errors
        if (errors.length > 0) {
            setFormErrors(errors);
            return;
        }


        try {
            
            const response = await axios.put(`http://localhost:8080/api/customers/${customerData.cusId}`, formData);
    
            if (response.status === 200) {
                // Successful
                customerUpdateModalResponse(response.data);
                onToggle();
                toast.success('Customer Updated Successfully.')
            } else {
                // Unexpected response
                console.error('Unexpected response status:', response);
                toast.error(
                    "Something has error. \n Please Contact System Support.",
                    {
                      duration: 6000,
                    }
                  )
            }
        } catch (error) {

            if (error.response && error.response.status === 409) {
                setResponseErrors('A customer already exists with this mobile number')
                console.error(error.message);
            } else {
                console.error('Error:', error.response.data);
                setResponseErrors(error.response.data);
            }
        }

    };

  return (
    <div>
      <Modal show={isOpen} size="md" onClose={onToggle} popup>
        <Modal.Header/>
        <Modal.Body>
          <div className="space-y-6">
            <h3 className="text-xl font-medium text-gray-900 dark:text-white">Update Customer Details</h3>
            <div className='my-3'>
                            {responseErrors && (
                                    <div
                                        className="flex items-center bg-red-500 text-white text-sm font-bold px-4 py-3"
                                        role="alert"
                                    >
                                    <p>{responseErrors}.</p>
                                    </div>
                            )}
                    </div>
            <div>
                <form onSubmit={handleSubmit}>
                    <div className="grid gap-6 mb-6">
                        <div>
                            <label
                                htmlFor="name"
                                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                            >
                                Name
                            </label>
                            <input
                                type="text"
                                id="name"
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                required
                                value={customerData.cusName}
                                onChange={(e) => setCustomerData({ ...customerData, cusName: e.target.value })}
                            />
                        </div>
                        <div>
                            <label
                                htmlFor="mobile"
                                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                            >
                                Mobile Number
                            </label>
                            <input
                                type="text"
                                id="mobile"
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                required
                                value={customerData.cusMobile}
                                onChange={(e) => setCustomerData({ ...customerData, cusMobile: e.target.value })}

                            />
                        </div>
                        <div>
                            <label
                                htmlFor="email"
                                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                            > 
                                Email
                            </label>
                            <input
                                type='email'
                                id="email"
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                value={customerData.cusEmail}
                                onChange={(e) => setCustomerData({ ...customerData, cusEmail: e.target.value })}
                            />
                        </div>
                    </div>

                    <div className='my-3'>
                            {formErrors.length > 0 && (
                                <div className="text-red-500">
                                    {formErrors.map((error, index) => (
                                        <p key={index}>{error}.</p>
                                    ))}
                                </div>
                            )}
                    </div>

                    <button
                        type="submit"
                        className="w-full my-2 text-white bg-amber-500 hover:bg-amber-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm  px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    >
                        <i className="ri-edit-fill"></i> Update
                    </button>
                    <button
                        onClick={onToggle}
                        type="button"
                        className=" w-full my-2 text-white bg-orange-500 hover:bg-orange-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm  px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    >
                        <i className="ri-close-large-fill"></i> Close
                    </button>
                </form>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  )
}

UpdateCustomerModal.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onToggle: PropTypes.func.isRequired,
    customerUpdateModalResponse: PropTypes.func.isRequired ,
    currentCustomerData: PropTypes.object.isRequired,
};