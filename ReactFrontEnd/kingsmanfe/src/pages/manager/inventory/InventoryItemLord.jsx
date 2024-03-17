
import React from 'react'
import { useState, useEffect } from 'react';
import './inventoryStyle.css';
import { BiCoinStack } from "react-icons/bi";
import DatePickerComponent from '../../../component/DatePickerComponent';
import AllInventoryItem from './AllInventoryItem';
import AddInventoryItem from './AddInventoryItem';
import lordItems from './AllInventoryItem';
//import { connect } from 'react-redux';




function InventoryItemLord() {
  const [isAddInventoryOpen, setAddInventoryOpen] = useState(false);

  const openAddInventoryPopup = () => {
    setAddInventoryOpen(true);
  };

  const closeAddInventoryPopup = () => {
    setAddInventoryOpen(false);

  };

  // Function to handle adding an item to the inventory
  const handleAddItem = (newItem) => {
    console.log('Item added to inventory:', newItem);
    // Add logic to update inventory state or perform other actions as needed
  };


  return (
    <div>
        <div className="header">
        <BiCoinStack className="icon" size={60}/>
        <h2 className="inventory-title">Inventory</h2>
        </div>

        <div className="two-column-container">
            <div className="column large-column">
            {/* Content for the first column */}
            <div className="d-flex justify-content-between align-items-center mb-3">
            <h2>Available Inventory Item</h2>
            
            {/* Add inventory button */}
            <button className="btn btn-primary" onClick={openAddInventoryPopup}>
                  Add New Item +
              </button>
            </div>
              
              {isAddInventoryOpen && (
                <div className="popup">
                {/* Content of the Add Inventory Popup */}
                  <AddInventoryItem onAddItem={handleAddItem} />
                  <button className="btn btn-danger" onClick={closeAddInventoryPopup}>
                      Close
                  </button>
                </div>
              )}
            
            
            <hr></hr>
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