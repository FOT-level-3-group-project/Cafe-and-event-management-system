import React from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Dashboard from './pages/cashier/Dashboard';
import Menu from './pages/cashier/Menu';
import Attendance from './pages/cashier/Attendance';
import Bill from './pages/cashier/Bill';
import Payment from './pages/cashier/Payment';

import CashierSideBar from './component/CashierSideBar';
import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => {
  return (
    <div>
      
      <BrowserRouter>
        <CashierSideBar>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/menu" element={<Menu />} />
            <Route path="/bill" element={<Bill />} />
            <Route path="/payment" element={<Payment />} />
            <Route path="/attendance" element={<Attendance/>} />
            
          </Routes>
        </CashierSideBar> 
      </BrowserRouter>

      
    </div>
  );
};

export default App;
