import React from 'react'
import { Button, Navbar,Accordion,Label, Badge } from "flowbite-react";

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
            <div className='ml-3 mr-3'>
                <Accordion collapseAll>
                    <Accordion.Panel>
                        <Accordion.Title>
                            <div className="flex justify-between items-center">
                                <div className='flex space-x-20'>
                                    <Label > Order Id #123</Label>
                                    <Label >Table Number: 5</Label>
                                    <Label >Waiter: Chathumina Dilshan</Label>
                                    <Label >Customer: Lahiru Prasad</Label>
                                </div>
                                <div>
                                    <Badge className='ml-56' size='l'>Pending</Badge>
                                </div>
                            </div>

                        </Accordion.Title>
                        <Accordion.Content>
                            <p className="mb-2 text-gray-500 dark:text-gray-400">
                                Flowbite is an open-source library of interactive components built on top of Tailwind CSS including buttons,
                                dropdowns, modals, navbars, and more.
                            </p>
                            <p className="text-gray-500 dark:text-gray-400">
                                Check out this guide to learn how to&nbsp;
                                <a
                                    href="https://flowbite.com/docs/getting-started/introduction/"
                                    className="text-cyan-600 hover:underline dark:text-cyan-500"
                                >
                                    get started&nbsp;
                                </a>
                                and start developing websites even faster with components on top of Tailwind CSS.
                            </p>
                        </Accordion.Content>
                    </Accordion.Panel>
                </Accordion>
            </div>
        </div>

    )
}
