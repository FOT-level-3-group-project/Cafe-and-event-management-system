import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { BiCoinStack } from "react-icons/bi";
import { Sidebar } from "flowbite-react";
import { HiArrowSmRight, HiUser } from "react-icons/hi";
import { BsPersonFillCheck } from "react-icons/bs";
import { logOutSuccess } from '../redux/user/userSlice';
import { useDispatch } from 'react-redux';
import { BsFillPeopleFill } from "react-icons/bs";
import { MdEvent } from "react-icons/md";
import { FaMoneyBillTrendUp } from "react-icons/fa6";
import { MdRestaurantMenu } from "react-icons/md";
import { FaChartPie } from "react-icons/fa";
import { MdOutlineTableBar } from "react-icons/md";
import { IoSettings } from "react-icons/io5";


export default function ManagerSideBar() {
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
                <Link to='/manager?tab=dashboard'>
                        <Sidebar.Item active={tab === 'dashboard'}icon={FaChartPie} as='div' >
                            Dashboard
                        </Sidebar.Item>
                    </Link>
                    <Link to='/manager?tab=inventory'>
                        <Sidebar.Item active={tab === 'inventory'} icon={BiCoinStack} as='div' >
                            Inventory
                        </Sidebar.Item>
                    </Link>
                    <Link to='/manager?tab=attendance'>
                        <Sidebar.Item active={tab === 'attendance'} icon={BsPersonFillCheck} as='div'>
                            Attendance
                        </Sidebar.Item>
                    </Link>
                    <Link to='/manager?tab=view-all-employees'>
                        <Sidebar.Item active={tab === 'view-all-employees'} icon={BsFillPeopleFill} as='div'>
                            Employees
                        </Sidebar.Item>
                    </Link>
                    <Link to='/manager?tab=view-all-events'>
                        <Sidebar.Item active={tab === 'view-all-events'} icon={MdEvent} as='div'>
                            Events
                        </Sidebar.Item>
                    </Link>

                    <Link to='/manager?tab=manage-orders'>
                        <Sidebar.Item active={tab === 'manage-orders'} icon={MdRestaurantMenu} as='div'>
                           Manage Orders
                        </Sidebar.Item>
                    </Link>

                    <Sidebar.Collapse label='Income Statement' icon={FaMoneyBillTrendUp}>
                        <Link to='/manager?tab=monthly-profit'>
                            <Sidebar.Item active={tab === 'monthly-profit'} icon={FaMoneyBillTrendUp} as='div'> Monthly Report </Sidebar.Item>
                        </Link>
                        <Link to='/manager?tab=annual-income'>
                            <Sidebar.Item active={tab === 'annual-income'} icon={FaMoneyBillTrendUp} as='div'>  Annual Report </Sidebar.Item>
                        </Link>

                    </Sidebar.Collapse>
                    <Sidebar.Collapse label='Advance Settings' icon={IoSettings}>
                        <Link to='/manager?tab=table-manage'>
                            <Sidebar.Item active={tab === 'table-manage'} icon={MdOutlineTableBar} as='div'> Table Management </Sidebar.Item>
                        </Link>

                    </Sidebar.Collapse>
                    

                    <Link to='/manager?tab=profile'>
                        <Sidebar.Item active={tab === 'profile'} icon={HiUser} label={"Manager"} labelColor='dark' as='div'>
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
