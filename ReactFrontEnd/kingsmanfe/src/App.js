import React from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Dashboard from './pages/cashier/Dashboard';
import Menu from './pages/cashier/Menu';
import Attendance from './pages/cashier/Attendance';
import Bill from './pages/cashier/Bill';
import Payment from './pages/cashier/Payment';
import CashierSideBar from './component/CashierSideBar';
import Login from './layout/Login';
import 'bootstrap/dist/css/bootstrap.min.css';
import ManagerSideBar from './component/ManagerSideBar';
import InventoryItemLord from './pages/manager/inventory/InventoryItemLord';
import ChefSideBar from './component/ChefSideBar';
import ChefInventory from './pages/chef/ChefInventory';
import ChefOrders from './pages/chef/ChefOrders';
import Header from './component/Header';
import ChefDashbord from './pages/chef/ChefDashbord';
import PlaceOrder from './pages/waiter/PlaceOrder';
import SelectProduct from './pages/waiter/SelectProduct';
import EditCustomer from './pages/waiter/EditCustomer';
import RegisterEmployee from './pages/manager/registration/RegisterEmployee';
import ResetPassword from './layout/ResetPassword';
import WaiterSideBar from './component/WaiterSideBar';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/resetpassword" element={<ResetPassword />} />
        <Route path="/cashier-sidebar/*" element={<CashierRoutes />} />
        <Route path="/manager-sidebar/*" element={<ManagerRoutes />} />
        <Route path="/chef-sidebar/*" element={<ChefRoutes />} />
        <Route path="/waiter-sidebar/*" element={<WaiterRoutes />} />
      </Routes>
    </BrowserRouter>
  );
};

const CashierRoutes = () => {
  return (
    <CashierSideBar>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="menu" element={<Menu />} />
        <Route path="attendance" element={<Attendance />} />
        <Route path="bill" element={<Bill />} />
        <Route path="payment" element={<Payment />} />
      </Routes>
    </CashierSideBar>
  );
};

const ManagerRoutes = () => {
  return (
    <ManagerSideBar>
      <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/menu" element={<Menu />} />
            <Route path="/inventory" element={<InventoryItemLord/>} />
            <Route path="/payment" element={<Payment />} />
            <Route path="/attendance" element={<Attendance/>} />
            <Route path="/register" element={<RegisterEmployee/>} />
      </Routes>
    </ManagerSideBar>
  );
};


const ChefRoutes = () => {
  return (
    <ChefSideBar>
      <Routes>
            <Route path="/" element={<ChefDashbord />} /> {/*ChefDashbord added*/}
            <Route path="orders" element={<ChefOrders />} /> {/*Cheforder added*/}
            <Route path="inventory" element={<ChefInventory/>} /> {/*ChefInventory added*/}
            <Route path="payment" element={<Payment />} />
            <Route path="attendance" element={<Attendance/>} />
      </Routes>
    </ChefSideBar>
  );
};

const WaiterRoutes = () => {
  return (
    <WaiterSideBar>
      <Routes>
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="placeorder" element={<PlaceOrder />} />
         <Route path="bill" element={<Bill />} />
        <Route path="attendance" element={<Attendance />} />
        <Route path="payment" element={<Payment />} />
      </Routes>
    </WaiterSideBar>
  );
};

export default App;
