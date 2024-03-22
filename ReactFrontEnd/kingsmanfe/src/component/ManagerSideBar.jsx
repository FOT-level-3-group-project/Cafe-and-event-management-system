import React, { useState } from 'react';
import {
  FaBars,
  FaTachometerAlt,
  FaUserCheck,
  FaUserEdit,
 
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

      path: '/manager-sidebar/dashboard',
      name: 'Dashboard',
      icon: <FaTachometerAlt/>,
    },
    {
      path: '/manager-sidebar/attendance',
      name: 'Attendance',
      icon: <FaUserCheck/>,
    },
    {
      path: '/manager-sidebar/menu',
      name: 'Menu',
      icon: <GiKnifeFork/>,
    },
    {
      path: '/manager-sidebar/inventory',
      name: 'Inventory',
      icon: <BiCoinStack/>,
    },
    {
      path: '/manager-sidebar/payment',
      name: 'Payment',
      icon: <MdPayment/>
    },
    {
      path: '/manager-sidebar/register',
      name: 'Registration',
      icon: <FaUserEdit/>
    },
    {
      path: '/',  
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