import React from 'react'
import { useState, useEffect } from 'react';
import axios from 'axios';
import UseItemPopup from './Component/UseItemPopup';
import './ChefInventory.css';

export default function ChefInventory() {
    const [items, setItems] = useState([]);
    const [selectedItem, setSelectedItem] = useState(null);
    const [showPopup, setShowPopup] = useState(false);
    const [todayUsage, setTodayUsage] = useState([]);

    useEffect(() => { /*run the useEffect method, when lord the page and chenge the state*/
        lordItems();
        fetchTodayUsage();

    }, []);

    const lordItems = async () => {

        try {
            const response = await axios.get("http://localhost:8080/api/inventory/view");
            console.log(response.data);
            setItems(response.data);

        } catch (error) {
            console.error("Error fetch data", error);
        }
    };

    const fetchTodayUsage = async () => {
        try {
            
            const currentDate = new Date(); // Get the current date
            currentDate.setDate(currentDate.getDate() + 0); // Increase the date by 1 day
            const increasedDate = currentDate.toISOString().split('T')[0]; // Format the increased date
            console.log(increasedDate); // Output the increased date


            const response = await axios.get(`http://localhost:8080/api/inventory/inventory-usage-log/` + increasedDate);
            console.log(response);
            setTodayUsage(response.data);
        } catch (error) {
            console.error("Error fetching today's usage", error);
        }
    };

    const handleUseItem = (itemId) => {
        const item = items.find(item => item.id === itemId);
        setSelectedItem(item);
        setShowPopup(true);
        lordItems();
    };

    const handleUseItemConfirm = async (quantityUsed) => {
        try {
            lordItems();
            setShowPopup(false);
        } catch (error) {
            console.error("Error using item", error);
        }
    };

    const handleCancelPopup = () => {
        setShowPopup(false);
        setSelectedItem(null);
    };





    return (
        <div className="two-column-container_chef">
            <div className="column large-column_chef">
                {/* Content for the first column */}
                <div className="d-flex justify-content-between align-items-center mb-3">
                    <h2>Available Inventory Item</h2>
                </div>

                <hr></hr>
                <div className='container'>
                    <div className='py-4'>
                        <table className="table border shadow">
                            <thead>
                                <tr>
                                    <th scope="col">#</th>
                                    <th scope="col" className="text-center">Item Id</th>
                                    <th scope="col" className="text-center">Item Name</th>
                                    <th scope="col" className="text-center">Quantity (KG/Pics)</th>
                                    <th scope="col" className="text-center">Vendor Name</th>
                                    <th scope="col" className="text-center">Actions</th>

                                </tr>
                            </thead>
                            <tbody>
                                {items.map((item, index) => (
                                    <tr key={index}>
                                        <th scope="row">{index + 1}</th>
                                        <td className="text-center">{item.id}</td>
                                        <td className="text-center">{item.itemName}</td>
                                        <td className="text-center">{item.quantity}</td>
                                        <td className="text-center">{item.vendorId}</td>
                                        <td>
                                            <div className="flex button-container">
                                                <button className="btn btn-primary mx-2 " onClick={() => handleUseItem(item.id)}>Use Item</button>
                                            </div>

                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            <div className="column small-column_chef ">

                {/* Content for the second column */}
                <h2>Today Item Usage</h2><hr></hr>

                <div className='container'>
                    <div className='py-4'>
                        <table className="table border shadow">
                            <thead>
                                <tr>
                                    <th scope="col">#</th>
                                    <th scope="col" className="text-center">Item Id</th>
                                    <th scope="col" className="text-center">Item Name</th>
                                    <th scope="col" className="text-center">Quantity Used</th>
                                    <th scope="col" className="text-center">Usage Time</th>
                                </tr>
                            </thead>
                            <tbody>
                                {todayUsage.map((usage, index) => (
                                    <tr key={index}>
                                        <th scope="row">{index + 1}</th>
                                        <td className="text-center">{usage.itemId}</td>
                                        <td className="text-center">{usage.itemName}</td>
                                        <td className="text-center">{usage.decreasedQuantity}</td>
                                        <td className="text-center">{new Date(usage.usageDateTime).toLocaleString()}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>


                        <p>This is the content of the second column.</p>
                    </div>


                    {/* Popup window */}
                    {showPopup && selectedItem && (
                        <UseItemPopup
                            item={selectedItem}
                            onConfirm={handleUseItemConfirm}
                            onCancel={handleCancelPopup}
                            onReloadItems={lordItems}
                        />
                    )}
                </div>
            </div>
        </div>

    );
}
