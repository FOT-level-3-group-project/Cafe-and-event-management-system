import React from 'react'
import { Accordion, Button, Label, Navbar} from "flowbite-react";
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Badge } from 'flowbite-react';
import { Link } from 'react-router-dom';


export default function AvailableOrders() {
    const [orders, setOrders] = useState([]);


    useEffect(() => {

        fetchOrders();
    }, []);

    // Get today's date
    const today = new Date();

    // Format the date as YYYY-MM-DD
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0'); // Months are zero-based
    const day = String(today.getDate()).padStart(2, '0');

    // Construct the date string in YYYY-MM-DD format
    const createdDate = `${year}-${month}-${day}`;
    console.log(createdDate);


    const fetchOrders = async () => {
        try {
            const response = await axios.get('http://localhost:8080/api/orders/created-date', {
                params: {
                    createdDate: createdDate
                }
            });
            setOrders(response.data);
        } catch (error) {
            console.error('Error fetching orders:', error);
        }
    };

    const updateStatusFinish = async (orderId) => {
        try {
            const response = await axios.put(`http://localhost:8080/api/orders/status-update/${orderId}/Finished`);
            console.log(response.data);
        } catch (error) {
            console.error('Error updating order status:', error);
        }
        fetchOrders();
    }

    const updateStatusCancel = async (orderId) => {
        try {
            const response = await axios.put(`http://localhost:8080/api/orders/status-update/${orderId}/Canceled`);
            console.log(response.data);
        } catch (error) {
            console.error('Error updating order status:', error);
        }
        fetchOrders();
    }

    const updateStatusProcessing = async (orderId) => {
        try {
            const response = await axios.put(`http://localhost:8080/api/orders/status-update/${orderId}/Processing`);
            console.log(response.data);
        } catch (error) {
            console.error('Error updating order status:', error);
        }
        fetchOrders();
    }
    return (

        // Top buttons 
        <div className='w-full h-screen bg-gray-100'>
            <div className='m-5 rounded-xl shadow-md'>
                <Navbar fluid rounded>
                    <Navbar.Collapse>
                        <Link to="/chef?tab=allOrders" >
                            <Button color="success" className=' bg-green-500' pill outline>
                                All : {orders.length}
                            </Button>
                        </Link>
                        <Link to="/chef?tab=availableOrders" active>
                            <Button color="warning" pill >
                                Available Orders : {orders.filter(order => order.orderStatus === 'Pending').length}
                            </Button>
                        </Link>
                        <Link to="/chef?tab=preparingOrders" >
                            <Button color="purple" pill outline >
                                Preparing Orders : {orders.filter(order => order.orderStatus === 'Processing').length}
                            </Button>
                        </Link>
                        <Link to="/chef?tab=finishedOrders">
                            <Button color="success" pill outline >
                                Finished Orders : {orders.filter(order => order.orderStatus === 'Ready').length}
                            </Button>
                        </Link>
                        <Link to="/chef?tab=canceledOrders">
                            <Button color="failure" pill outline>
                                Canceled Orders : {orders.filter(order => order.orderStatus === 'Canceled').length}
                            </Button>
                        </Link>
                    </Navbar.Collapse>
                </Navbar>
            </div>

            {/* Available Orders */}
            <Label className='text-2xl font-bold m-5'>Available Orders</Label>
            <div className='ml-5 mr-5 w-auto bg-white shadow-md rounded-2xl mt-5'>
                <Accordion collapseAll>
                    {(orders.length  === 0)  ? (
                        <h3>No available orders</h3>
                    ) : (
                        orders
                            .filter(order => order.orderStatus === 'Pending')
                            .map(order => (
                                <Accordion.Panel key={order.orderId}>
                                    <Accordion.Title>
                                        <div className=" flex  justify-between ">
                                        <div className='mr-10 '>
                                                <Badge size='l' color={order.orderStatus === 'Canceled' ? "failure" :
                                                    order.orderStatus === 'Finished' ? "success" : "warning"}>
                                                    {order.orderStatus === 'Canceled' ? "Canceled" :
                                                        order.orderStatus === 'Finished' ? "Finished" : "Pending"}
                                                </Badge>
                                            </div>
                                            <div className='space-x-16 w-full'>
                                                <Label className=''> Order Id #{order.orderId}</Label>
                                                <Label >Table Number: {order.tableNumber}</Label>
                                                <Label >Waiter: {order.firstName}</Label>
                                                <Label >Item : {order.foodName}</Label>
                                                

                                            </div>
                                            
                                        </div>

                                    </Accordion.Title>
                                    <Accordion.Content>
                                        <div className='flex flex-row justify-between'>
                                            <div className='basis-2/5'>
                                            <Label className="mb-4"> Customer Name : {order.cusName}   </Label>
                                            </div>
                                            <div className='basis-2/5'>
                                            <Label className="ml-5"> Special Note: {order.specialNote} </Label>
                                            </div>

                                            {order.orderStatus === 'Canceled' ? (
                                                <Badge size='l' color="failure">Canceled</Badge>
                                            ) : order.orderStatus === 'Finished' ? (
                                                <Badge size='l' color="success">Finished</Badge>
                                            ) : (
                                                <>
                                                    <Button color="purple" className='m-4 bg-purple-500' onClick={() => updateStatusProcessing(order.orderId)}>
                                                        Preparing
                                                    </Button>
                                                    <Button color="failure" className='m-4  bg-red-600' onClick={() => updateStatusCancel(order.orderId)}>
                                                        Cancel
                                                    </Button>
                                                </>
                                            )}

                                        </div>

                                    </Accordion.Content>
                                </Accordion.Panel>
                            )))}
                </Accordion>

            </div>
        </div>


    )
}
