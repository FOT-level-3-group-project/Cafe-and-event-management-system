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
import ManagerSideBar from './component/ManagerSideBar';
import InventoryItemLord from './pages/manager/inventory/InventoryItemLord';
import ChefSideBar from './component/ChefSideBar';
import ChefInventory from './pages/chef/ChefInventory';
import ChefOrders from './pages/chef/ChefOrders';
import Header from './component/Header';
import ChefDashbord from './pages/chef/ChefDashbord';



const App = () => {
  return (
    
    <div>
      {/* <BrowserRouter>
        <CashierSideBar>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/menu" element={<Menu />} />
            <Route path="/bill" element={<Bill />} />
            <Route path="/payment" element={<Payment />} />
            <Route path="/attendance" element={<Attendance/>} />
            
          </Routes>
        </CashierSideBar> 
      </BrowserRouter> */}

      {
        <BrowserRouter>
        <ManagerSideBar>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/menu" element={<Menu />} />
            <Route path="/inventory" element={<InventoryItemLord/>} />
            <Route path="/payment" element={<Payment />} />
            <Route path="/attendance" element={<Attendance/>} />
            
          </Routes>
        </ManagerSideBar> 
      </BrowserRouter>

      }
      
      {
      //   <BrowserRouter>
      //     <Header/>
      //     <ChefSideBar>
      //     <Routes>
      //       <Route path="/" element={<ChefDashbord />} /> {/*ChefDashbord added*/}
      //       <Route path="/orders" element={<ChefOrders />} /> {/*Cheforder added*/}
      //       <Route path="/inventory" element={<ChefInventory/>} /> {/*ChefInventory added*/}
      //       <Route path="/payment" element={<Payment />} />
      //       <Route path="/attendance" element={<Attendance/>} />
      //     </Routes>
      //     </ChefSideBar>
      // </BrowserRouter>

      }


      
    </div>
  );
};

export default App;
