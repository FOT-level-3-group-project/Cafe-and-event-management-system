import React from 'react'

import { Link, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';

import { Sidebar } from "flowbite-react";
import { HiArrowSmRight, HiUser } from "react-icons/hi";

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
                    <Link to='/cashier?tab=attendance'>
                        <Sidebar.Item active={tab === 'attendance'} icon={HiUser} as ='div'>
                            Attendance
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
