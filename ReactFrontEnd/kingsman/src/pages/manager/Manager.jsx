import React from 'react'
import { useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import ManagerSideBar from '../../components/ManagerSideBar';
import AllinventoryItem from './inventory/AllinventoryItem';
import ManagerProfile from './ManagerProfile';
import Header from '../../components/Header';
import RegisterEmployee from './manageEmployees/RegisterEmployee';
import ViewAllEmployees from './manageEmployees/ViewAllEmployees';
import AddEvent from './manageEvents/AddEvent';
import ViewAllEvents from './manageEvents/ViewAllEvents';
import ManageOrders from './order/ManageOrders';
import AttendanceFrManager from './attendance/AttendanceFrManager';
import MonthlyIncome from './IncomeStatement/MonthlyIncome';
import AnnualIncome from './IncomeStatement/AnnualIncome';
import ManagerDash from './ManagerDash';



export default function Manager() {
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
        <div className='min-h-screen flex flex-col md:flex-row'>
            <div className='md:w-56'>
                {/* sidebar */}
                <ManagerSideBar />
            </div>

            {/* Inventory */}
            {tab === 'inventory' && <AllinventoryItem />}

            {/* profile */}
            {tab === 'profile' && <ManagerProfile />}

            {/* New Employee */}
            {tab === 'new-employee' && <RegisterEmployee />}

            {/* View All Employees */}
            {tab === 'view-all-employees' && <ViewAllEmployees />}

            {/* Add Event */}
            {tab === 'add-event' && <AddEvent />}
            
            {/* View All Events */}
            {tab === 'view-all-events' && <ViewAllEvents />}

            {/* Manage Orders */}
            {tab === 'manage-orders' && <ManageOrders />}

            {/* Attendance */}
            {tab === 'attendance' && <AttendanceFrManager />}

            {/* Monthly Income */}
            {tab === 'monthly-income' && <MonthlyIncome />}

            {/* Dashboard */}
            {tab === 'dashboard' && <ManagerDash/>}

            {/* income statement - monthly */}
            {tab === 'monthly-income' && <MonthlyIncome />}

            {/* income statement - annual */}
            {tab === 'annual-income' && <AnnualIncome />}

            {/* Table Manage */}
            {tab === 'table-manage' && <div>Table Manage</div>}

        </div>
    )
}
