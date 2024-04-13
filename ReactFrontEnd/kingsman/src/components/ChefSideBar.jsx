import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { BiCoinStack } from "react-icons/bi";
import { Sidebar } from "flowbite-react";
import { HiArrowSmRight, HiUser, HiClipboardCheck } from "react-icons/hi";

import { logOutSuccess } from '../redux/user/userSlice';
import { useDispatch } from 'react-redux';


export default function ChefSideBar() {
    const location = useLocation();
    const [tab, setTab] = useState('');
    const dispatch = useDispatch();

    useEffect(() => {
        const urlParams = new URLSearchParams(location.search);
        const tabFromUrl = urlParams.get('tab');
        if (tabFromUrl) {
            setTab(tabFromUrl);
        }
    }, [location.search]);

    const handleLogOut = async () => {

        try {
            dispatch(logOutSuccess());
        } catch (error) {
            console.log(error.message);
        }
    }


    return (
        <Sidebar className='w-full md:w-56'>
            <Sidebar.Items>
                <Sidebar.ItemGroup>
                    <Link to='/chef?tab=inventory'>
                        <Sidebar.Item active={tab === 'inventory'} icon={BiCoinStack} as='div' >
                            Inventory
                        </Sidebar.Item>
                    </Link>
                    <Sidebar.Collapse icon={HiClipboardCheck} label="Orders">
                        <Link to='/chef?tab=allOrders'>
                            <Sidebar.Item active={tab === 'allOrders'}>All Orders </Sidebar.Item>
                        </Link>
                        <Link to='/chef?tab=availableOrders'>
                            <Sidebar.Item active={tab === 'availableOrders'}>Available Orders </Sidebar.Item>
                        </Link>
                        <Link to='/chef?tab=finishedOrders'>
                            <Sidebar.Item active={tab === 'finishedOrders'}>Finished Orders</Sidebar.Item>
                        </Link>
                        <Link to='/chef?tab=canceledOrders'>
                            <Sidebar.Item active={tab === 'canceledOrders'}>Canceled Orders</Sidebar.Item>
                        </Link>

                    </Sidebar.Collapse>
                    <Link to='/chef?tab=profile'>
                        <Sidebar.Item active={tab === 'profile'} icon={HiUser} label={"Chef"} labelColor='dark' as='div'>
                            Profile
                        </Sidebar.Item>
                    </Link>

                    <Sidebar.Item icon={HiArrowSmRight} className='cursor-pointer' onClick={handleLogOut} >
                        Log Out
                    </Sidebar.Item>

                </Sidebar.ItemGroup>
            </Sidebar.Items>
        </Sidebar>

    )
}
