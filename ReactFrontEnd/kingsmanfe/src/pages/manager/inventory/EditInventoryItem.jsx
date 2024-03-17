import React, { useState, useEffect } from 'react';
import axios from 'axios';

function EditItemPopup({ itemId, onCancel, onSubmit }) {
  const [quantity, setQuantity] = useState('');
  const [vendorId, setVendorId] = useState('');

  useEffect(() => {
    // Fetch item details by itemId
    const fetchItemDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/inventory/view/${itemId}`);
        const { quantity, vendorId } = response.data; // Assuming the response contains quantity and vendorId
        setQuantity(quantity);
        setVendorId(vendorId);
      } catch (error) {
        console.error('Error fetching item details:', error);
      }
    };

    fetchItemDetails();
  }, [itemId]);

  const handleUpdateItem = async () => {
    try {
      await axios.put(`http://localhost:8080/api/inventory/edit/${itemId}`, { quantity, vendorId });
      onSubmit(); // Reload items after editing
      onCancel();
    } catch (error) {
      console.error('Error updating item:', error);
    }
  };

  return (
    <div className="popup">
      <h3>Edit Item</h3>
      <div className="mb-3">
        <label htmlFor="quantity" className="form-label">
          Quantity (KG/Pics)
        </label>
        <input
          type="text"
          className="form-control"
          id="quantity"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
        />
      </div>
      <div className="mb-3">
        <label htmlFor="vendorId" className="form-label">
          Vendor ID
        </label>
        <input
          type="text"
          className="form-control"
          id="vendorId"
          value={vendorId}
          onChange={(e) => setVendorId(e.target.value)}
        />
      </div>
      <button className="btn btn-primary" onClick={handleUpdateItem}>Update</button>
      <button className="btn btn-danger" onClick={onCancel}>Cancel</button>
    </div>
  );
}

export default EditItemPopup;
