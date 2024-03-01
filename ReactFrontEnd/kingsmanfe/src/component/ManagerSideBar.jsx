import React, { useState } from 'react';
import {
  FaBars,
  FaFileInvoiceDollar,
  FaTachometerAlt,
  FaUserCheck,
 
} from 'react-icons/fa';

import { GiKnifeFork } from 'react-icons/gi';
import { MdPayment } from "react-icons/md";
import { IoMdLogOut } from 'react-icons/io';
import { NavLink } from 'react-router-dom';
import { BiCoinStack } from "react-icons/bi";

const ManagerSideBar = ({ children }) => {
    const[isOpen , setIsOpen] = useState(false);
    const toggle = () => setIsOpen (!isOpen);
  const menuItem = [
    {
      path: '/',
      name: 'Dashboard',
      icon: <FaTachometerAlt/>,
    },
    {
      path: '/attendance',
      name: 'Attendance',
      icon: <FaUserCheck/>,
    },
    {
      path: '/menu',
      name: 'Menu',
      icon: <GiKnifeFork/>,
    },
    {
      path: '/inventory',
      name: 'Inventory',
      icon: <BiCoinStack/>,
    },
    {
      path: '/payment',
      name: 'Payment',
      icon: <MdPayment/>
    },
    {
      path: '/logout',  
      name: 'Logout',
      icon: <IoMdLogOut />,
    },
  ];

  return (
    <div className="container1">
      <div style={{ width: isOpen ? "250px" : "50px"}} className="sidebar">
        <div className="top_section">
          <h1 style={{ display: isOpen ? "block" : "none"}} className="logo">Logo</h1>
          <div style={{ marginLeft: isOpen ? "50px" : "0px"}} className="bars">
            <FaBars onClick={toggle}/>
          </div>
        </div>
        {menuItem.map((item, index) => (
          <NavLink
            to={item.path}
            key={index}
            className="link"
            activeClassName="active"
          >
            <div className="icon">{item.icon}</div>
            <div style={{ display: isOpen ? "block" : "none"}} className="link_text">{item.name}</div>
          </NavLink>
        ))}
      </div>
      <main>{children}</main>
    </div>
  );
};

export default ManagerSideBar;
