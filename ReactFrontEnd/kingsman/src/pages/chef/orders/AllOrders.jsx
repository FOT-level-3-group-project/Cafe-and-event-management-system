import React from 'react'
import { Button, Navbar, Accordion, Label, Badge } from "flowbite-react";
import { useEffect, useState } from 'react';
import axios from 'axios';

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

    return (
        // Top buttons 
        <div className='w-screen h-screen'>
            <div className='flex flex-wrap gap-2 mt-6 ml-5 mb-5'>
                <Navbar fluid rounded>
                    <Navbar.Collapse>
                        <Navbar.Link href="/chef?tab=allOrders" active>
                            <Button color="blue" pill >
                                All : 15
                            </Button>
                        </Navbar.Link>
                        <Navbar.Link href="/chef?tab=availableOrders" active>
                            <Button color="warning" pill outline >
                                Available Orders : 5

                            </Button>
                        </Navbar.Link>
                        <Navbar.Link href="/chef?tab=finishedOrders">
                            <Button color="success" pill outline >
                                Finished Orders : 5
                            </Button>
                        </Navbar.Link>
                        <Navbar.Link href="/chef?tab=canceledOrders">
                            <Button color="failure" pill outline>
                                Canceled Orders : 5
                            </Button>
                        </Navbar.Link>
                    </Navbar.Collapse>
                </Navbar>
            </div>
            <div className='ml-3 mr-3 w-auto'>
                <Accordion collapseAll>
                    {orders.map(order => (
                        <Accordion.Panel key={order.orderId}>
                            <Accordion.Title>
                                <div className=" flex  justify-between ">
                                    <div className='space-x-16 w-full'>
                                        <Label > Order Id #{order.orderId}</Label>
                                        <Label >Table Number: {order.tableNumber}</Label>
                                        <Label >Item : {order.foodName}</Label>
                                        <Label >Waiter: {order.firstName}</Label>

                                    </div>
                                    <div className='ml-80 '>
                                        <Badge size='l' color={order.orderStatus === 'Canceled' ? "failure" :
                                            order.orderStatus === 'Finished' ? "success" : "warning"}>
                                            {order.orderStatus === 'Canceled' ? "Canceled" :
                                                order.orderStatus === 'Finished' ? "Finished" : "Pending"}
                                        </Badge>
                                    </div>
                                </div>

                            </Accordion.Title>
                            <Accordion.Content>
                                <div className='flex justify-between'>
                                    <Label className="mb-4"> Customer Name : {order.cusName}   </Label>
                                    <Label className="ml-5"> Special Note: {order.specialNote} </Label>

                                    {order.orderStatus === 'Canceled' ? (
                                        <Badge size='l' color="failure">Canceled</Badge>
                                    ) : order.orderStatus === 'Finished' ? (
                                        <Badge size='l' color="success">Finished</Badge>
                                    ) : (
                                        <div className=''>
                                            <Button color="success" className='m-4' onClick={() => updateStatusFinish(order.orderId)}>
                                                Finish
                                            </Button>
                                            <Button color="failure" className='m-4' onClick={() => updateStatusCancel(order.orderId)}>
                                                Cancel
                                            </Button>
                                        </div>
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
