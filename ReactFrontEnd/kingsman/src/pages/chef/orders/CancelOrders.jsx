import React from 'react'
import { Button, Navbar } from "flowbite-react";

export default function CancelOrders() {
    return (
        // Top buttons 
        <div className='w-screen h-screen'>
            <div className='flex flex-wrap gap-2 mt-6 ml-5 mb-5'>
                <Navbar fluid rounded>
                    <Navbar.Collapse>
                        <Navbar.Link href="/chef?tab=allOrders" >
                            <Button color="blue" pill outline>
                                All : 15
                            </Button>
                        </Navbar.Link>
                        <Navbar.Link href="/chef?tab=availableOrders" >
                            <Button color="warning" pill outline>
                                Available Orders : 5
                            </Button>
                        </Navbar.Link>
                        <Navbar.Link href="/chef?tab=finishedOrders" >
                            <Button color="success" pill outline>
                                Finished Orders : 5
                            </Button>
                        </Navbar.Link>
                        <Navbar.Link href="/chef?tab=canceledOrders" active>
                            <Button color="failure" pill >
                                Canceled Orders : 5
                            </Button>
                        </Navbar.Link>
                    </Navbar.Collapse>

                </Navbar>

            </div>
        </div>
    )
}
