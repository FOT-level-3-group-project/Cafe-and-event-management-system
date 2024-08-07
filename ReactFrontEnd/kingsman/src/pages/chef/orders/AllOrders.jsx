import React from 'react'
import { Button, Navbar, Accordion, Label, Badge } from "flowbite-react";
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { or } from 'firebase/firestore';

export default function AllOrders() {
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
            console.log(response.data);
        } catch (error) {
            console.error('Error fetching orders:', error);
        }
    };

    

    const updateStatusProcessing = async (orderId) => {
        try {
            const response = await axios.put(`http://localhost:8080/api/orders/status-update/${orderId}/Processing`);
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

    const updateStatusReady = async (orderID) => {
        try {
            const response = await axios.put(`http://localhost:8080/api/orders/status-update/${orderId}/Ready`);
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
                            <Button color="success" className=' bg-green-500' pill active>
                                All : {orders.length}
                            </Button>
                        </Link>
                        <Link to="/chef?tab=availableOrders" >
                            <Button color="warning" pill outline >
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

            {/* All Orders */}
            <Label className='text-2xl font-bold m-5'>All Orders</Label>
            <div className='ml-5 mr-5 w-auto bg-white shadow-md rounded-2xl mt-5'>
                <Accordion collapseAll>
                    {orders.map(order => (
                        <Accordion.Panel key={order.orderId}>
                            <Accordion.Title>
                                <div className=" flex  justify-between w-full ">
                                    <div className={`mr-10 ${order.orderStatus === "Canceled" ? ('mr-8') : order.orderStatus === "Processing" ? ('mr-8') : ('mr-10')}`} >
                                        <Badge size='l' color={order.orderStatus === 'Canceled' ? "failure" :
                                            order.orderStatus === 'Ready' ? "success" : order.orderStatus === 'Processing' ? "purple" : "warning"}>

                                            {order.orderStatus === 'Canceled' ? "Canceled" :
                                                order.orderStatus === 'Ready' ? "Finished" :
                                                    order.orderStatus === 'Processing' ? "Preparing" : "Pending"}
                                        </Badge>
                                    </div>
                                    <div className='space-x-16 '>
                                        <Label >Order Id #{order.orderId}</Label>
                                        <Label >Table Number: {order.tableNumber}</Label>
                                        <Label >Waiter: {order.firstName}</Label>
                                        <Label >Item Name : {order.foodName}</Label>


                                    </div>

                                </div>

                            </Accordion.Title>
                            <Accordion.Content>
                                <div className='flex flex-row  justify-between'>
                                    <div className=' basis-2/5'>
                                        <Label className="mb-4"> Customer Name : {order.cusName}   </Label>
                                    </div>
                                    <div className=' basis-2/5'>
                                        <Label className="ml-5"> <label className=' text-red-500'>Special Note: </label>{order.specialNote} </Label>
                                    </div>



                                    {order.orderStatus === 'Canceled' ? (
                                        <Badge size='l' color="failure" className=''>Canceled</Badge>
                                    ) : order.orderStatus === 'Ready' ? (
                                        <Badge size='l' color="success" className=''>Finished</Badge>
                                    ) : order.orderStatus === 'Processing' ? (
                                        <Button color="success" className='m-4  bg-green-500' onClick={() => updateStatusReady(order.orderId)}>
                                            Finish
                                        </Button>

                                    ) :
                                        (

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
                    ))}
                </Accordion>
            </div>
        </div>

    )
}
