import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';

import { Sidebar } from "flowbite-react";
import { HiArrowSmRight, HiUser } from "react-icons/hi";
import { logOutSuccess } from '../redux/user/userSlice';
import { useDispatch } from 'react-redux';


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
                    <Link to='/manager?tab=inventory'>
                        <Sidebar.Item active={tab === 'inventory'} icon={HiUser} as='div' >
                            Inventory
                        </Sidebar.Item>
                    </Link>
                    <Link to='/manager?tab=profile'>
                        <Sidebar.Item active={tab === 'profile'} icon={HiUser} label={"User"} labelColor='dark' as='div'>
                            Profile
                        </Sidebar.Item>
                    </Link>
                    <Link to='/manager?tab=new-employee'>
                        <Sidebar.Item active={tab === 'new-employee'} icon={HiUser} as='div'>
                            New Employee
                        </Sidebar.Item>
                    </Link>
                    <Link to='/manager?tab=view-all-employees'>
                        <Sidebar.Item active={tab === 'view-all-employees'} icon={HiUser} as='div'>
                            View All Employees
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
