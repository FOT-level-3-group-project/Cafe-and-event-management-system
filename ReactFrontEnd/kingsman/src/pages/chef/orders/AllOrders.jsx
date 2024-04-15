import React from 'react'
import { Button, Navbar, Accordion, Label, Badge } from "flowbite-react";

export default function AllOrders() {
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
                    <Accordion.Panel>
                        <Accordion.Title>
                            <div className=" flex items-center justify-between w-full">
                                <div className='space-x-16 w-full'>
                                    <Label > Order Id #123</Label>
                                    <Label >Table Number: 5</Label>
                                    <Label >Item : Cheese Pastha</Label>
                                    <Label >Waiter: Chathumina</Label>

                                </div>
                                <div className=' ml-80 justify-end'>
                                    <Badge size='l' color="purple">Preparing</Badge>
                                </div>
                            </div>

                        </Accordion.Title>
                        <Accordion.Content>
                            <div className='flex-col flex'>
                                <Label  className="mb-4"> Customer Name : Thisara  </Label>
                                <Label  className=""> Ordered Time : 9.50 AM  </Label>

                            </div>
                        </Accordion.Content>
                    </Accordion.Panel>
                </Accordion>
            </div>
        </div>

    )
}
