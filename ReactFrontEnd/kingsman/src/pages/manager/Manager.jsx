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
import OrderView from './order/orderView';
import AttendanceFrManager from './attendance/AttendanceFrManager';
import MonthlyProfit from './IncomeStatement/MonthlyProfit';
import AnnualIncome from './IncomeStatement/AnnualIncome';
import ManagerDash from './ManagerDash';
import TableManage from './advanceSettings/TableManage';
import UpdateOrder from './order/UpdateOrder';
import UpdateOrderItems from './order/UpdateOrderItems';
import EmpSalaries from './salary/EmpSalaries';
import Bonuses from './salary/Bonuses';
import PayPerHour from './salary/PayPerHour';



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

            {/* View Order */}
            {tab === 'view-order' && <OrderView/>}

            {/* Update Order */}
            {tab === 'update-order' && <UpdateOrder/>}

            {tab === 'update-order-items' && <UpdateOrderItems/>}

            {/* Attendance */}
            {tab === 'attendance' && <AttendanceFrManager />}

            {/* salary */}
            {tab === 'salary' && <EmpSalaries />}
            {tab === 'earnings' && <Bonuses />}
            {tab === 'hourpayments' && <PayPerHour />}


            {/* Dashboard */}
            {tab === 'dashboard' && <ManagerDash/>}

            {/* income statement - monthly */}
            {tab === 'monthly-profit' && <MonthlyProfit />}

            {/* income statement - annual */}
            {tab === 'annual-income' && <AnnualIncome />}

            {/* Table Manage */}
            {tab === 'table-manage' && <TableManage/>}

        </div>
    )
}
