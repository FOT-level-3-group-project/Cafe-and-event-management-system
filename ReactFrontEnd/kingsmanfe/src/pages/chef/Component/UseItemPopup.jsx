import React, { useState } from 'react';
import axios from 'axios';

export default function UseItemPopup({ item, onConfirm, onCancel, onReloadItems }) {
    const [quantityUsed, setQuantityUsed] = useState('');

    const handleConfirm = async () => {
        // Check if the quantity used is a valid number
        if (!isNaN(quantityUsed) && parseInt(quantityUsed) > 0) {
            try {
                // Make a PUT request to the API endpoint to decrement the item quantity
                await axios.put(`http://localhost:8080/api/inventory/use/${item.id}/${quantityUsed}`);

                // Call the onConfirm function with the quantity used
                onConfirm(parseInt(quantityUsed));

                // Close the popup window
                onCancel();

                // Reload items in the table
                onReloadItems();

            } catch (error) {
                console.error('Error decrementing item quantity:', error);
                alert('Failed to decrement item quantity. Please try again.');
            }
        } else {
            alert('Please enter a valid quantity.');
        }
    };

    return (
        <div className="popup">
            <div className="popup-content">
                <h3>{item.itemName}</h3>
                <p>Available Quantity: {item.quantity}</p>
                <div className="mb-3">
                    <label htmlFor="quantityUsed" className="form-label">Quantity to Use:</label>
                    <input
                        type="number"
                        className="form-control"
                        id="quantityUsed"
                        value={quantityUsed}
                        onChange={(e) => setQuantityUsed(e.target.value)}
                    />
                </div>
                <button className="btn btn-primary" onClick={handleConfirm}>Confirm Use</button>
                <button className="btn btn-secondary" onClick={onCancel}>Cancel</button>
            </div>
        </div>
    );
}
