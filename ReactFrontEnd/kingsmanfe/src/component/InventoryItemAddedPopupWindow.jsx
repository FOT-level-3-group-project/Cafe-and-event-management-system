import React from 'react';
import './InventoryItemAddedPopupWindow.css'

const InventoryManagerPopupWindow = ({ message, onClose }) => {
  return (
    <div className="popup-message">
      <div className="popup-content">
        <h3>{message}</h3>
        <button onClick={onClose} className='btn btn-danger'>Close</button>
      </div>
    </div>
  );
};

export default InventoryManagerPopupWindow;