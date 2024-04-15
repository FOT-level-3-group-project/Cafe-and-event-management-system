import React from 'react'
import { useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import CashierSideBar from '../../components/CashierSideBar';
import ShowAttendance from './attendance/ShowAttendance';
import CashierProfile from './CashierProfile';
import ManageOrder from './Order/ManageOrder';
import { ViewOrder } from './Order/ViewOrder';
import Bill from './Order/Bill';

export default function Cashier() {

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
        <CashierSideBar />
      </div>


      {tab === 'attendance' && <ShowAttendance />}

      {tab === 'profile' && <CashierProfile />}

      {tab === 'orders' && <ManageOrder/>}

      {tab === 'orders-view' && <ViewOrder/>}

      {tab === 'bill' && <Bill/>}

    </div >
  )
}
