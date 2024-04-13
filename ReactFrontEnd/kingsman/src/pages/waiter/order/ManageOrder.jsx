import React, { useState, useEffect } from 'react';
import DeleteOrderModal from './deleteOrderModal';
import toast from 'react-hot-toast';

export default function ManageOrder() {
    const [orders, setOrders] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [searchCriteria, setSearchCriteria] = useState('name');
    const [selectedOrder, setSelectedOrder] = useState(null); 
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

    useEffect(() => {
        fetchOrders();
    }, []);

    const fetchOrders = async () => {
        try {
            const response = await fetch('http://localhost:8080/api/orders');
            const data = await response.json();
            setOrders(data);
        } catch (error) {
            console.error('Error fetching orders:', error);
        }
    };

    const handleDeleteOrder = async (orderId) => {
        try {
            const response = await fetch(`http://localhost:8080/api/orders/${orderId}`, {
                method: 'DELETE'
            });
            if (response.status === 204 || response.ok) {
                toast('Order Deleted Successfully!', {
                    icon: <i className="ri-delete-bin-6-fill"></i>,
                });
                //remove the deleted order from the state
                setOrders(orders.filter(order => order.orderId !== orderId));
                setIsDeleteModalOpen(false);
            } else {
                toast.error(
                    "Something has error. \n Please Contact System Support.",
                    {
                      duration: 6000,
                    }
                  )
                console.error('Failed to delete order:', response);
            }
        } catch (error) {
            toast.error(
                "Something has error. \n Please Contact System Support.",
                {
                  duration: 6000,
                }
              )
            console.error('Error deleting order:', error);
        }
    };

    const filteredOrders = orders.filter(order => {
        if (searchQuery !== "") {
            if (searchCriteria === 'id') {
                return order.orderId.toString().includes(searchQuery);
            } else if (searchCriteria === 'name') {
                return order.customer && order.customer.cusName.toLowerCase().includes(searchQuery.toLowerCase());
            } else if (searchCriteria === 'mobile') {
                return order.customer && order.customer.cusMobile && order.customer.cusMobile.includes(searchQuery);
            }
        } else {
            return true;
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

    const toggleDeleteModal = (order) => {
        setSelectedOrder(order);
        setIsDeleteModalOpen(prevState => !prevState);
    };
    

    return (
        <div className="w-full bg-slate-200 dark:bg-slate-500 py-5">
            <div className="w-full">
                <div className="max-w-full px-6">
                    <div className="w-full">
                        <div >
                            <div className='w-full flex'>
                                <div className="relative flex-1">
                                    <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                                        <i className="ri-search-line"></i>
                                    </div>
                                    <input
                                        type="search"
                                        id="default-search"
                                        className="block p-4 pl-10 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-0 focus:border-gray-300 dark:bg-slate-600 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                                        placeholder="Search Order ID, Customer..."
                                        value={searchQuery}
                                        onChange={e => setSearchQuery(e.target.value)}
                                    />
                                    <button
                                        onClick={() => setSearchQuery('')}
                                        type="button"
                                        className="text-white absolute right-2.5 bottom-2.5 bg-orange-500 hover:bg-orange-600 selection:border-none focus:outline-none font-medium rounded-lg text-sm px-4 py-2 dark:bg-orange-500 dark:hover:bg-orange-700"
                                    >
                                        Clear
                                    </button>
                                </div>
                                <div>
                                    <select
                                        id="search-criteria"
                                        className=" p-4 ml-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-0 focus:border-gray-300 dark:bg-slate-600 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
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
                                        Table No
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
                                        <td colSpan="9" className="px-6 py-4 text-center">No records to show</td>
                                    </tr>
                                ) : (
                                    filteredOrders.map(order => (
                                        <tr key={order.orderId} className="hover:bg-gray-50 dark:hover:bg-gray-500 ">
                                            <td className="px-6 py-2 text-center"><a className=' hover:text-green-500' href={`/waiter?tab=order-view&order=${order.orderId}`}>{order.orderId}</a></td>
                                            <td className="px-6 py-2 text-center">
                                                    <span className={`inline-flex px-2 py-1 items-center text-white rounded-lg text-xs ${
                                                                        order.orderStatus === "Pending" ? "bg-yellow-300" :
                                                                        order.orderStatus === "Processing" ? "bg-blue-300" :
                                                                        order.orderStatus === "Ready" ? "bg-green-300" :
                                                                        order.orderStatus === "Completed" ? "bg-purple-300" :
                                                                        ""
                                                                    }`}
                                                    >{order.orderStatus}</span>
                                            </td>
                                            <td className="px-6 py-2 text-center">{order.tableNumber ==0 ? "-" : order.tableNumber }</td>
                                            <td className="px-6 py-2 text-center">{order.orderItems.length}</td>
                                            <td className="px-6 py-2 text-center">{order.totalAfterDiscount.toFixed(2)}</td>
                                            <td className="px-6 py-2 text-center">{order.customer ? order.customer.cusName : '-'}</td>
                                            <td className="px-6 py-2 text-center">{order.customer ? order.customer.cusMobile : '-'}</td>
                                            <td className="px-6 py-2 text-center text-xs">{formatDate(order.orderDateTime)}</td>
                                            <td className="px-6 py-2">
                                                {order.orderStatus != "Pending" ? (
                                                    <div>
                                                        <td colSpan="9" className="px-6 py-4 text-center">-</td>
                                                    </div>
                                                ) : (
                                                    <div className="flex items-center justify-evenly w-full">
                                                        <a href={`/waiter?tab=update-orders&order=${order.orderId}`} className="text-2xl text-amber-500 text-center">
                                                            <i className="ri-edit-fill"></i>
                                                        </a>
                                                        &nbsp; &nbsp; 
                                                        <button onClick={() => toggleDeleteModal(order)} className="text-2xl text-red-500 text-center">
                                                            <i className="ri-delete-bin-6-fill"></i>
                                                        </button>
                                                    </div>
                                                )}
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            <DeleteOrderModal 
                isOpen={isDeleteModalOpen} 
                onToggle={toggleDeleteModal}
                onDelete={() => handleDeleteOrder(selectedOrder.orderId)} 
            />

        </div>
    );
}
