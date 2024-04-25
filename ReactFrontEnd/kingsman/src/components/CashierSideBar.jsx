import React from 'react'

import { Link, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';

import { Sidebar } from "flowbite-react";
import { HiArrowSmRight, HiUser } from "react-icons/hi";
import { MdOutlineRestaurantMenu } from "react-icons/md";


export default function CashierSideBar() {
    const location = useLocation();
    const [tab, setTab] = useState('');
    useEffect(() => {
        const urlParams = new URLSearchParams(location.search);
        const tabFromUrl = urlParams.get('tab');
        if (tabFromUrl) {
            setTab(tabFromUrl);
        }
    }, [location.search]);
    return (
        <Sidebar className='w-full md:w-56'>
            <Sidebar.Items>
                <Sidebar.ItemGroup>
                    <Sidebar.Collapse label='Attendance' icon={HiUser}>
                        <Link to='/cashier?tab=addAttendance'>
                            <Sidebar.Item active={tab === 'addAttendance'} icon={HiUser} as='div'> Add Attendance </Sidebar.Item>
                        </Link>
                        <Link to='/cashier?tab=viewAttendance'>
                            <Sidebar.Item active={tab === 'viewAttendance'} icon={HiUser} as='div'> View Attendance </Sidebar.Item>
                        </Link>

                    </Sidebar.Collapse>

                    <Link to='/cashier?tab=orders'>
                        <Sidebar.Item active={tab === 'orders'} icon={MdOutlineRestaurantMenu} as='div'>
                            Manage Orders
                        </Sidebar.Item>
                    </Link>
                    <Link to='/cashier?tab=profile'>
                        <Sidebar.Item active={tab === 'profile'} icon={HiUser} label={"User"} labelColor='dark' as='div'>
                            Profile
                        </Sidebar.Item>
                    </Link>

                    <Sidebar.Item icon={HiArrowSmRight} className='cursor-pointer' >
                        Log Out
                    </Sidebar.Item>


                </Sidebar.ItemGroup>
            </Sidebar.Items>
        </Sidebar>
    )
}
