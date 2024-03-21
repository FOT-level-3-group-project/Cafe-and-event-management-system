

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './InventoryManagerPopupWindow.css';
//import { addDays } from 'date-fns';

const InventoryManagerPopupWindow = ({ selectedDate, onClose }) => {
  const [apiData, setApiData,] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Format selectedDate to ISO format (YYYY-MM-DD)
        const selectDate = new Date(selectedDate);
        selectDate.setDate(selectDate.getDate() + 0); // Increase the date by 1 day
        const increasedDate = selectDate.toISOString().split('T')[0]; // Format the increased date


        // Increase the date by one day
        //const nextDay = addDays(new Date(formattedDate), 1);
        //const nextDayFormatted = nextDay.toISOString().split('T')[0];

        console.log(increasedDate)
      
        const response = await axios.get('http://localhost:8080/api/inventory/inventory-usage-log/' + increasedDate);
        
        setApiData(response.data);
        
      } catch (error) {
        console.error('Error fetching data from the API:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="popup shadow" style={{ maxWidth: '800px'}} >
      <button onClick={onClose} className='btn btn-danger'>Close</button>
      <h2>Data for {selectedDate ? new Date(selectedDate).toLocaleDateString() : 'N/A'}</h2>
      <div className='py-4' style={{ maxHeight: '350px', overflowY: 'auto' }}>
      <table className="table border shadow">
        <thead>
          <tr>
            <th className="text-center">Item Id</th>
            <th>Item Name</th>
            <th className="text-center">Used Quantity (Kg/Pics)</th>
            <th>Used Date and Time</th>
            {/* Add more columns as needed */}
          </tr>
        </thead>
        <tbody>
          {apiData.map((item) => (
            <tr key={item.itemId}>
              <td className="text-center">{item.itemId}</td>
              <td>{item.itemName}</td>
              <td className="text-center">{item.decreasedQuantity}</td>
              <td>{new Date(item.usageDateTime).toLocaleString()}</td>
              {/* Add more columns as needed */}
            </tr>
          ))}
        </tbody>
      </table>
      </div>
    </div>
  );
};

export default InventoryManagerPopupWindow;
