
import React from 'react'
import { useState, useEffect } from 'react';
import './inventoryStyle.css';
import { BiCoinStack } from "react-icons/bi";
import DatePickerComponent from '../../../component/DatePickerComponent';
import AddInventoryItem from './AddInventoryItem';
import DeleteConfirmationPopup from '../../../component/DeleteConfirmationPopup';
import EditInventoryItem from './EditInventoryItem';
import axios from 'axios';
import Pagination from '../../chef/Component/Pagination';





function InventoryItemLord() {
  const [isAddInventoryOpen, setAddInventoryOpen] = useState(false);
  const [items, setItems] = useState([]);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);
  const [showEditPopup, setShowEditPopup] = useState(false);
  const [editItemId, setEditItemId] = useState(null);

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(6); // Number of items per page


  useEffect(() => { /*run the useEffect method, when lord the page and chenge the state*/
    lordItems();

  }, []);

  const openAddInventoryPopup = () => {
    setAddInventoryOpen(true);
  };

  const closeAddInventoryPopup = () => {
    setAddInventoryOpen(false);

  };

  const handleEditItem = (itemId) => {
    setShowEditPopup(true);
    setEditItemId(itemId);
  };

  const cancelEdit = () => {
    setShowEditPopup(false);
    setEditItemId(null);
  };

  // Function to handle deleting an item
  const handleDeleteItem = (itemId) => {
    setShowConfirmation(true);
    setItemToDelete(itemId);
  };

  // Function to cancel delete operation
  const cancelDelete = () => {
    setShowConfirmation(false);
    setItemToDelete(null);
  };

  // Function to handle adding an item to the inventory
  const handleAddItem = (newItem) => {
    console.log('Item added to inventory:', newItem);
    lordItems();
  };

  const lordItems = async () => {

    try {
      const response = await axios.get("http://localhost:8080/api/inventory/view");
      console.log(response.data);
      setItems(response.data);

    } catch (error) {
      console.error("Error fetch data", error);
    }
  };

  // Function to confirm delete operation
  const confirmDelete = async () => {
    try {
      await axios.delete(`http://localhost:8080/api/inventory/delete/${itemToDelete}`);
      setShowConfirmation(false);
      setItemToDelete(null);
      lordItems(); // Reload items after deletion
    } catch (error) {
      console.error("Error deleting item", error);
    }
  };

  // Logic for pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = items.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(items.length / itemsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div>
      <div className="header-man-inv">
        <BiCoinStack className="icon" size={60} />
        <h2 className="inventory-title">Inventory</h2>
      </div>

      <div className="two-column-container-man-inv">
        <div className="column-man-inv large-column-man-inv">
          {/* Content for the first column */}
          <div className="d-flex justify-content-between align-items-center">
            <h2>Available Inventory Item</h2>

            {/* Add inventory button */}
            <button button className="btn btn-primary" onClick={openAddInventoryPopup}>
              Add New Item +
            </button>
          </div>

          {isAddInventoryOpen && (
            <div className="popup shadow" style={{ maxWidth: '600px',maxHeight: '700px'  }}>
              {/* Content of the Add Inventory Popup */}
              <AddInventoryItem onAddItem={handleAddItem} />
              <button className="btn btn-danger" onClick={closeAddInventoryPopup}>
                Close
              </button>
            </div>
          )}


          <hr></hr>
          {/* {allinventory} */}

          <div>
            <div className='py-4'>
              {/* Pagination for the table */}
            <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
              <table className="table border shadow">
                <thead>
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col" className="text-center">Item Id</th>
                    <th scope="col" className="text-center">Item Name</th>
                    <th scope="col" className="text-center">Quantity (KG/Pics)</th>
                    <th scope="col" className="text-center">Vendor Name</th>
                    <th scope="col">Item Added Date</th>
                    <th scope="col">Item Edited Date</th>
                    <th scope="col" className="text-center">Actions</th>

                  </tr>
                </thead>
                <tbody>
                  {currentItems.map((item, index) => (
                    <tr key={index}>
                      <th scope="row">{indexOfFirstItem + index + 1}</th>
                      <td className="text-center">{item.id}</td>
                      <td className="text-center">{item.itemName}</td>
                      <td className="text-center">{item.quantity}</td>
                      <td className="text-center">{item.vendorId}</td>
                      <td>{new Date(item.dateTime).toLocaleString()}</td>
                      <td>{new Date(item.lastModified).toLocaleString()}</td>
                      <td>
                        <div className="flex">
                          <button className="btn btn-primary mx-2" onClick={() => handleEditItem(item.id)}>Edit</button>
                          <button className="btn btn-danger mx-2" onClick={() => handleDeleteItem(item.id)}>Delete</button>
                        </div>

                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div className="column-man-inv small-column-man-inv ">
          {/* Content for the second column */}
          <h2>Check Daily Usage</h2><hr></hr>
          <DatePickerComponent />
        </div>
      </div>
      {showConfirmation && (
        <DeleteConfirmationPopup
          itemName={items.find(item => item.id === itemToDelete)?.itemName}
          onCancel={cancelDelete}
          onConfirm={confirmDelete}
        />
      )}
      {showEditPopup && (
        <EditInventoryItem
          itemId={editItemId}
          onCancel={cancelEdit}
          onSubmit={lordItems} // Reload items after editing
        />
      )}


    </div>
  );
}

export default InventoryItemLord;