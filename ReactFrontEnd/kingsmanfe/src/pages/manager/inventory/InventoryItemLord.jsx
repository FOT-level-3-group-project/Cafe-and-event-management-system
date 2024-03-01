import { reference } from '@popperjs/core';
import React from 'react'
import './inventoryStyle.css';
import { BiCoinStack } from "react-icons/bi";
import DatePickerComponent from '../../../component/DatePickerComponent';
import AllInventoryItem from './AllInventoryItem';

function InventoryItemLord() {
  return (
    <div>
        <div className="header">
        <BiCoinStack className="icon" size={60}/>
        <h2 className="inventory-title">Inventory</h2>
        </div>

        <div className="two-column-container">
            <div className="column large-column">
            {/* Content for the first column */}
            <h2>Available Inventory Item</h2><hr></hr>
            <AllInventoryItem/>
            <p>This is the content of the first column.</p>
        </div>
        <div className="column small-column ">
            {/* Content for the second column */}
            <h2>Check Daily Usage</h2><hr></hr>
            <DatePickerComponent/>
            <p>This is the content of the second column.</p>
        </div>
    
      
        </div>

    </div>
  )
}



export default InventoryItemLord;