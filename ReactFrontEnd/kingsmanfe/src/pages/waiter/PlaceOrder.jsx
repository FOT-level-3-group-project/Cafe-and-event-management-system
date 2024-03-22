import axios from 'axios';
import Table from 'react-bootstrap/Table';
import React, { useEffect, useState } from 'react';
import ReactPaginate from 'react-paginate';
import { Link, useParams } from 'react-router-dom';

export default function PlaceOrder() {
    const [cusName, setCustomerName] = useState('');
    const [cusEmail, setEmail] = useState('');
    const [cusTable, setTableNumber] = useState('');
    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const [showAlert, setShowAlert] = useState(false);
    const [users, setUsers] = useState([]);
    const [offset, setOffset] = useState(0);
    const [perPage] = useState(5); // Change this to the desired number of items per page
    const [pageCount, setPageCount] = useState(0);
    const {cusId}=useParams()

    useEffect(() => {
        loadUsers();
    }, [offset]); // Trigger loadUsers when offset changes

    

    const loadUsers = async () => {
        const response = await axios.get('http://localhost:8080/api/customers/viewCustomer');
        const data = response.data;
        const slice = data.slice(offset, offset + perPage);
        const postData = slice.map(user => ({
            cusId: user.cusId,
            cusName: user.cusName,
            cusEmail: user.cusEmail,
            cusTable: user.cusTable
        }));
        setUsers(postData);
        setPageCount(Math.ceil(data.length / perPage));
    };

    const handlePageClick = (e) => {
        const selectedPage = e.selected;
        setOffset(selectedPage * perPage);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!cusName || !cusEmail || !cusTable) {
            setShowAlert(true);
            return;
        }

        const newItem = {
            cusName,
            cusEmail,
            cusTable: parseInt(cusTable)
        };

        try {
            const response = await axios.post('http://localhost:8080/api/customers/add', newItem);
            setShowSuccessModal(true);
            setCustomerName('');
            setEmail('');
            setTableNumber('');
            loadUsers(); // Reload users after adding a new one
        } catch (error) {
            console.error('Error:', error.message);
        }
    };

    const deleteCustomer = async (cusId) => {
        try {
            console.log(cusId);
            await axios.delete(`http://localhost:8080/api/customers/${cusId}`);
            loadUsers();
        } catch (error) {
            console.error('Error deleting customer:', error);
        }
    };

    return (
        <div className="container">
            <div className="row">
                <form className="row g-3 shadow" onSubmit={handleSubmit}>
                    <h2 className='text-center m-4'>Customer Details</h2>
                    <div className="col-md-4">
                        <label htmlFor="cusName" className="form-label">Customer Name</label>
                        <input type="text" className="form-control" id="cusName" value={cusName} onChange={(e) => setCustomerName(e.target.value)} />
                    </div>
                    <div className="col-md-4">
                        <label htmlFor="cusEmail" className="form-label">Email</label>
                        <input type="email" className="form-control" id="cusEmail" value={cusEmail} onChange={(e) => setEmail(e.target.value)} />
                    </div>
                    <div className="col-md-4">
                        <label htmlFor="cusTable" className="form-label">Table Number</label>
                        <select className="form-select" id="cusTable" value={cusTable} onChange={(e) => setTableNumber(e.target.value)}>
                            <option value="">Select Table Number</option>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                        </select>
                    </div>
                    <div className="col-md-4 offset-md-11">
                        <button type="submit" className="btn btn-primary">Add</button>
                    </div>
                </form>
                {showAlert && (
                    <div className="alert alert-danger alert-dismissible fade show col-md-4 offset-md-4 mt-3" role="alert">
                        Please fill all the fields
                        <button type="button" className="btn-close" aria-label="Close" onClick={() => setShowAlert(false)}>
                        </button>
                    </div>
                )}
            </div>

            {showSuccessModal && (
                <div className="modal fade show" tabIndex="-1" role="dialog" style={{ display: 'block', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
                    <div className="modal-dialog modal-dialog-centered" role="document">
                        <div className="modal-content">
                            <div className="modal-header text-center">
                                <h5 className="modal-title">Customer added successfully</h5>
                            </div>
                            <button type="button" className="btn btn-danger" onClick={() => setShowSuccessModal(false)}>
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            )}

            <div className="table-container shadow" style={{ marginTop: '20px' }}>
            <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Table No</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user, index) => (
                            <tr>
                                <th scope='row'key={index}> {index + 1}</th>
                                <td>{user.cusName}</td>
                                <td>{user.cusEmail}</td>
                                <td>{user.cusTable}</td>
                                <td>
                                    
                                <Link className='btn btn-outline-primary mx-2' to={`/editCustomer/${user.cusId}`}>Edit</Link>

                                    <button className='btn btn-danger mx-2'onClick={()=> deleteCustomer(user.cusId)}>
                                       
                                        Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
                <div className="d-flex justify-content-center">
                    <ReactPaginate
                        previousLabel={'Previous'}
                        nextLabel={'Next'}
                        breakLabel={'...'}
                        pageCount={pageCount}
                        marginPagesDisplayed={2}

                        pageRangeDisplayed={5}
                        onPageChange={handlePageClick}
                        containerClassName={'pagination'}
                        activeClassName={'active'}
                    />
                </div>
            </div>
        </div>
    );
}
