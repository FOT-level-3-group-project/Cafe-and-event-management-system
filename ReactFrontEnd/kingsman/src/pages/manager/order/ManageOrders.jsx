
import React, { useState, useEffect } from 'react';

export default function ManageOrders() {
    const [orders, setOrders] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [searchCriteria, setSearchCriteria] = useState('name');
    const [selectedStatus, setSelectedStatus] = useState('All');

    useEffect(() => {
        fetchOrders();
    }, []);

    const fetchOrders = async () => {
        try {
            const response = await fetch('http://localhost:8080/api/orders');
            const data = await response.json();
            // Set Orders
            setOrders(data);
        } catch (error) {
            console.error('Error fetching orders:', error);
        }
    };


    const filteredOrders = orders.filter(order => {
        // Check if the order status matches the selected status
        if (selectedStatus !== 'All' && order.orderStatus !== selectedStatus) {
            return false;
        }
    
        // Check if search query is provided
        if (searchQuery !== "") {
            if (searchCriteria === 'id') {
                return order.orderId.toString().includes(searchQuery);
            } else if (searchCriteria === 'name') {
                return order.customer && order.customer.cusName.toLowerCase().includes(searchQuery.toLowerCase());
            } else if (searchCriteria === 'mobile') {
                return order.customer && order.customer.cusMobile && order.customer.cusMobile.includes(searchQuery);
            }
        } else {
            return true; // If no search query provided, include all orders
        }
    });
    

    
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        const hours = date.getHours() % 12 || 12; // Convert 0 to 12
        const minutes = String(date.getMinutes()).padStart(2, '0');
        const period = date.getHours() < 12 ? 'AM' : 'PM';
        return `${year}-${month}-${day} ${hours}.${minutes} ${period}`;
    };


    

    return (
        <div className="w-full bg-slate-200 dark:bg-slate-500 py-5">
            <div className="w-full">
                <div className="max-w-full px-6">

                    <div className="mt-6 md:flex md:items-center md:justify-between">
                        <div className=" inline-flex overflow-hidden bg-white border divide-x rounded-lg dark:bg-gray-900 rtl:flex-row-reverse dark:border-gray-700 dark:divide-gray-700">
                            <button  onClick={() => setSelectedStatus('All')}
                                className={`px-5 py-2 text-xs font-medium text-gray-600 transition-colors duration-200 sm:text-sm dark:bg-gray-800 dark:text-gray-300 ${
                                selectedStatus === 'All' && 'bg-gray-100'}`}
                            >                            
                                View all
                            </button>
                            <button onClick={() => setSelectedStatus('Pending')}
                                className={`px-5 py-2 text-xs font-medium text-gray-600 transition-colors duration-200 sm:text-sm dark:bg-gray-800 dark:text-gray-300 ${
                                selectedStatus === 'Pending' && 'bg-gray-100'}`}
                            >                                
                                Pending
                            </button>
                            <button  onClick={() => setSelectedStatus('Processing')}
                                className={`px-5 py-2 text-xs font-medium text-gray-600 transition-colors duration-200 sm:text-sm dark:bg-gray-800 dark:text-gray-300 ${
                                selectedStatus === 'Processing' && 'bg-gray-100'}`}
                            >
                                Processing
                            </button>
                            <button  onClick={() => setSelectedStatus('Ready')}
                                className={`px-5 py-2 text-xs font-medium text-gray-600 transition-colors duration-200 sm:text-sm dark:bg-gray-800 dark:text-gray-300 ${
                                selectedStatus === 'Ready' && 'bg-gray-100'}`}
                            >                                
                                Ready
                            </button>
                            <button onClick={() => setSelectedStatus('Completed')} 
                                className={`px-5 py-2 text-xs font-medium text-gray-600 transition-colors duration-200 sm:text-sm dark:bg-gray-800 dark:text-gray-300 ${
                                selectedStatus === 'Completed' && 'bg-gray-100'}`}
                            >                                
                                Completed
                            </button>
                        </div>
                        <div className=" w-1/2 relative flex items-center mt-4 md:mt-0">
                                <div className="relative flex-1">
                                    <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                                        <i className="ri-search-line"></i>
                                    </div>
                                    <input
                                        type="search"
                                        id="default-search"
                                        className="block p-2 pl-10 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-0 focus:border-gray-300 dark:bg-slate-600 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                                        placeholder="Search Order ID, Customer..."
                                        value={searchQuery}
                                        onChange={e => setSearchQuery(e.target.value)}
                                    />
                                    <button
                                        onClick={() => setSearchQuery('')}
                                        type="button"
                                        className="text-white absolute right-1.5 bottom-1.5 bg-orange-500 hover:bg-orange-600 selection:border-none focus:outline-none font-medium rounded-lg text-sm px-2 py-1 dark:bg-orange-500 dark:hover:bg-orange-700"
                                    >
                                        Clear
                                    </button>
                                </div>
                                <div>
                                    <select
                                        id="search-criteria"
                                        className=" p-2 ml-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-0 focus:border-gray-300 dark:bg-slate-600 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                                        value={searchCriteria}
                                        onChange={e => setSearchCriteria(e.target.value)}
                                    >
                                        <option value="name">By Name</option>
                                        <option value="mobile">By Mobile</option>
                                        <option value="id">By Order ID</option>
                                    </select>
                                </div>
                        </div>
                    </div>


                    <div className="overflow-hidden rounded-lg border border-gray-200 shadow-md my-5">
                        <table className="w-full border-collapse bg-white text-left text-sm text-gray-500">
                            <thead className="bg-gray-50 text-gray-900  dark:bg-gray-700 dark:text-gray-50">
                                <tr>
                                    <th scope="col" className="px-6 py-4 font-medium text-center">
                                        Order No
                                    </th>
                                    <th scope="col" className="px-6 py-4 font-medium  text-center">
                                        Status
                                    </th>
                                    <th scope="col" className="px-6 py-4 font-medium  text-center">
                                        Items
                                    </th>
                                    <th scope="col" className="px-6 py-4 font-medium  text-center">
                                        Total (LKR)
                                    </th>
                                    <th scope="col" className="px-6 py-4 font-medium text-center">
                                        Customer Name
                                    </th>
                                    <th scope="col" className="px-6 py-4 font-medium text-center">
                                        Customer Mobile
                                    </th>
                                    <th scope="col" className="px-6 py-4 font-medium text-center">
                                        Date
                                    </th>
                                    <th scope="col" className="px-6 py-4 font-medium text-center">
                                        Action
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100 border-t border-gray-100 dark:bg-gray-600 dark:text-gray-50">
                                {filteredOrders.length === 0 ? (
                                    <tr>
                                        <td colSpan="9" className="px-6 py-4 text-center">There are No Reports for Today to Show. Please Create an Order.</td>
                                    </tr>
                                ) : (
                                    filteredOrders.map(order => (
                                        <tr key={order.orderId} className="hover:bg-gray-50 dark:hover:bg-gray-500 ">
                                            <td className="px-6 py-2 text-center"><a className=' hover:text-green-500' href={`cashier?tab=orders-view&order=${order.orderId}`}>{order.orderId}</a></td>
                                            <td className="px-6 py-2 text-center">
                                                    <span className={`inline-flex px-2 py-1 items-center text-white rounded-lg text-xs ${
                                                                        order.orderStatus === "Pending" ? "bg-yellow-300" :
                                                                        order.orderStatus === "Processing" ? "bg-blue-300" :
                                                                        order.orderStatus === "Ready" ? "bg-green-300" :
                                                                        order.orderStatus === "Completed" ? "bg-green-500" :
                                                                        ""
                                                                    }`}
                                                    >{order.orderStatus}</span>
                                            </td>
                                            <td className="px-6 py-2 text-center">{order.orderItems.length}</td>
                                            <td className="px-6 py-2 text-center">{order.totalAfterDiscount.toFixed(2)}</td>
                                            <td className="px-6 py-2 text-center">{order.customer ? order.customer.cusName : '-'}</td>
                                            <td className="px-6 py-2 text-center">{order.customer ? order.customer.cusMobile : '-'}</td>
                                            <td className="px-6 py-2 text-center text-xs">{formatDate(order.orderDateTime)}</td>
                                            <td className="px-6 py-2">
                                                <div className="flex flex-col items-center justify-center">
                                                    <a href={`/cashier?tab=orders-view&order=${order.orderId}`} className="w-full text-white p-1 text-xl text-center bg-blue-500 rounded-md hover:bg-blue-700">
                                                        <i className="ri-eye-fill"></i> View
                                                    </a>
                                                    <a href={`/cashier?tab=bill&order=${order.orderId}`} className="w-full p-2 text-xl text-white text-center bg-yellow-400 rounded-md hover:bg-yellow-500 mt-2">
                                                        <i className="ri-edit-fill"></i> Update
                                                    </a>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}


