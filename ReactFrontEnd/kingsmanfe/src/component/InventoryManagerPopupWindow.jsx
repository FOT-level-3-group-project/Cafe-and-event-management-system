

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './InventoryManagerPopupWindow.css';

const InventoryManagerPopupWindow = ({ selectedDate, onClose }) => {
  const [apiData, setApiData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Replace 'YOUR_GET_API_ENDPOINT' with your actual GET API endpoint
        const response = await axios.get('http://localhost:8080/api/inventory/inventory-usage-log/2024-03-01');
        setApiData(response.data);
      } catch (error) {
        console.error('Error fetching data from the API:', error);
      }
    };

    //fetchData();
  }, []);

  return (
    <div className="popup">
      <button onClick={onClose}>Close</button>
      <h2>Data for {selectedDate ? new Date(selectedDate).toLocaleDateString() : 'N/A'}</h2>
      <table>
        <thead>
          <tr>
            <th>Column 1</th>
            <th>Column 2</th>
            <th>Column 2</th>
            {/* Add more columns as needed */}
          </tr>
        </thead>
        <tbody>
          {apiData.map((item) => (
            <tr key={item.itemId}>
              <td>{item.itemName}</td>
              <td>{item.decreasedQuantity}</td>
              {/* Add more columns as needed */}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default InventoryManagerPopupWindow;
