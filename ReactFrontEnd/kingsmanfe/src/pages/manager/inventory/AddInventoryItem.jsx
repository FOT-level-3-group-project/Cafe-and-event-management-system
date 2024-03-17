
import { useState } from 'react';
import axios from 'axios';
import lordItems from './AllInventoryItem';
import InventoryItemAddedPopupWindow from '../../../component/InventoryItemAddedPopupWindow';



const AddInventoryItem = ({ onAddItem }) => {
  const [itemName, setItemName] = useState('');
  const [quantity, setQuantity] = useState('');
  const [vendorId, setVendorId] = useState('');
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  

  const handleAddItem = async() => {
    // Validate input fields before adding the item
    if (itemName && quantity && vendorId) {
      const newItem = {
        itemName,
        quantity,
        vendorId,
      };

      try {
        // Make a POST request to your backend API
        const response = await axios.post('http://localhost:8080/api/inventory/add',newItem);

        // Check the response status and handle accordingly
        if (response.data === 'Item added to inventory successfully') {
          // Item added successfully
        console.log('Item added successfully:', response.data);

      
        // Pass the new item to the parent component
        onAddItem(newItem);

        // Dispatch the action to add the item to the Redux store
       // addItem(newItem);

        

        
          // Clear input fields after adding the item
          setItemName('');
          setQuantity('');
          setVendorId('');

          // Show success message
          setShowSuccessMessage(true);

        } else {
          console.error('Failed to add item:', response.data);
        }
      } catch (error) {
        console.error('Error adding item:', error.message);
      }
    } else {
      alert('Please fill in all fields before adding an item.'); // add the popup warning
    }

  };

  return (
    <div>
      <h3>Add New Item</h3>
      <form>
        <div className="mb-3">
          <label htmlFor="itemName" className="form-label">
            Item Name
          </label>
          <input
            type="text"
            className="form-control"
            id="itemName"
            value={itemName}
            onChange={(e) => setItemName(e.target.value)}
          />
        </div>
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
          <label htmlFor="vendorName" className="form-label">
            Vendor Name
          </label>
          <input
            type="text"
            className="form-control"
            id="vendorName"
            value={vendorId}
            onChange={(e) => setVendorId(e.target.value)}
          />
        </div>
        <div className='flex'>
        <button type="button" className="btn btn-primary" onClick={handleAddItem}>
          Add
        </button>
        
        {showSuccessMessage && (
        <InventoryItemAddedPopupWindow
          message="Item added successfully"
          onClose={() => setShowSuccessMessage(false)} // Close the popup message when the user clicks "Close"
        />
      )}
        </div>
        
        <br/>
      </form>
      
     


    </div>
  );
  
};

export default AddInventoryItem;
