
import React from 'react'
import { useState, useEffect } from 'react';
import './inventoryStyle.css';
import { BiCoinStack } from "react-icons/bi";
import DatePickerComponent from '../../../component/DatePickerComponent';
import AddInventoryItem from './AddInventoryItem';
import axios from 'axios';




function InventoryItemLord() {
  const [isAddInventoryOpen, setAddInventoryOpen] = useState(false);
  const [items, setItems] = useState([]);

  useEffect(() =>{ /*run the useEffect method, when lord the page and chenge the state*/
        lordItems();

    },[]);

  const openAddInventoryPopup = () => {
    setAddInventoryOpen(true);
  };

  const closeAddInventoryPopup = () => {
    lordItems();
    setAddInventoryOpen(false);

  };

  // Function to handle adding an item to the inventory
  const handleAddItem = (newItem) => {
    console.log('Item added to inventory:', newItem);
    // Add logic to update inventory state or perform other actions as needed
  };

  const lordItems = async () =>{

    try {
        const response = await axios.get("http://localhost:8080/api/inventory/view");
        console.log(response.data); 
        setItems(response.data);
        
    } catch (error) {
        console.error("Error fetch data",error);
    }
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
                {/* {allinventory} */}

                <div className='container'>
            <div className='py-4'>
                <table className="table border shadow">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col" className="text-center">Item Id</th>
                <th scope="col">Item Name</th>
                <th scope="col">Quantity (KG/Pics)</th>
                <th scope="col">Vendor Name</th>
                <th scope="col">Item Added Date</th>
                <th scope="col">Item Edited Date</th>
                <th scope="col" className="text-center">Actions</th>

              </tr>
            </thead>
                    <tbody>
                        {items.map((item, index) =>(
                            <tr key={index}>
                                <th scope="row">{index + 1}</th>
                                <td className="text-center">{item.id}</td>
                                <td className="text-center">{item.itemName}</td>
                                <td className="text-center">{item.quantity}</td>
                                <td className="text-center">{item.vendorId}</td>
                                <td>{new Date(item.dateTime).toLocaleString()}</td>
                                <td>{new Date(item.lastModified).toLocaleString()}</td>
                                <td>
                                    <div className="flex">
                                    <button className= "btn btn-primary mx-2" >Edit</button>
                                    <button className = "btn btn-danger mx-2" >Delete</button>
                                    </div>
                                    
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
                
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