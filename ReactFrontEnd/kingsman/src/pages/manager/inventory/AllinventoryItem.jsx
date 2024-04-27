import React, { Fragment, useRef } from 'react'
import { Button, Pagination, Datepicker, Dropdown, Modal, TextInput } from 'flowbite-react'
import { Table } from "flowbite-react";
import { useEffect, useState } from 'react';
import { HiOutlineExclamationCircle } from "react-icons/hi";
import axios from 'axios';
import EditInventoryItem from './EditInventoryItem';
import AddInventoryItem from './AddInventoryItem';
import DeleteInventoryItem from './DeleteInventoryItem';
import DailyInventoryUsage from './DailyInventoryUsage';

export default function AllinventoryItem() {
  const [isAddInventoryOpen, setAddInventoryOpen] = useState(false);
  const [inventoryData, setInventoryData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6; // Number of items to display per page
  const [editItem, setEditItem] = useState(null); // State to store item being edited
  const [isEditPopupOpen, setIsEditPopupOpen] = useState(false); // State to manage visibility of edit popup
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false); // State to manage visibility of delete confirmation popup
  const [itemToDelete, setItemToDelete] = useState(null); // State to store item to delete
  const [isOpenDailyUsageWindow, setIsOpenDailyUsageWindow] = useState(false);

  const currentDate = new Date();
  const year = currentDate.getFullYear();
  const month = String(currentDate.getMonth() + 1).padStart(2, '0'); // Add leading zero if needed
  const day = String(currentDate.getDate()).padStart(2, '0'); // Add leading zero if needed
  const formattedDate = `${year}-${month}-${day}`;
  
  const [selectedDate, setSelectedDate] = useState(formattedDate);


  useEffect(() => { fetchData(); }, []);

  const openAddInventoryPopup = () => {
    setAddInventoryOpen(true);
  };

  const cancelAddInventoryPopup = () => {
    setAddInventoryOpen(false);
  };




  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await axios.get("http://localhost:8080/api/inventory/view");
      setInventoryData(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };



  // Handle edit button click
  const handleEditClick = (itemId) => {
    setEditItem(itemId);
    setIsEditPopupOpen(true);
  };

  // Function to update item details
  const handleEditSubmit = (updatedItem) => {
    fetchData(); // Reload items after editing
    // Implement your logic to update item details
    console.log("Updated item:", updatedItem);

  };

  const cancelEdit = () => {
    setIsEditPopupOpen(false);
    setEditItem(null);
  };




  // Calculate the index range of items to display based on the current page
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  // Filter the inventory data to display only items for the current page
  const currentInventoryData = inventoryData.slice(startIndex, endIndex);

  // Function to handle page change
  const onPageChange = (page) => {
    setCurrentPage(page);
  };

  // Function to handle deleting an item
  const handleDeleteItem = (itemId) => {
    setShowDeleteConfirmation(true);
    setItemToDelete(itemId);
  };
  // Function to confirm deletion
  const cancelDelete = () => {
    setShowDeleteConfirmation(false);
    setItemToDelete(null);
  };

  // Function to delete an item
  const confirmDelete = async () => {
    try {
      await axios.delete(`http://localhost:8080/api/inventory/delete/${itemToDelete}`);
      setShowDeleteConfirmation(false);
      setItemToDelete(null);
      fetchData(); // Reload items after deleting
    } catch (error) {
      console.error("Error deleting item", error);
    }
  };

  const handleSubmitDailyUsage = () => {
    setIsOpenDailyUsageWindow(true);
  }

  const cancelDailyUsage = () => {
    setIsOpenDailyUsageWindow(false);
  }



  return (
    <Fragment>
      <section>
        <div className='h-screen w-full flex grid-rows-2 md:grid-cols-2 bg-gray-100 dark:bg-slate-600'>

          <div className='h-full w-auto md:h-screen p-4 border-r-2 border-l-2'>
            <div className='flex justify-between border-b-2'>
              {/* Left column */}
              <h2 className="text-2xl">Available Inventory Item</h2>

              {/* Add inventory button */}
              <Button color="success" className=' bg-green-500' onClick={openAddInventoryPopup}>
                Add New Item +
              </Button>
            </div>
            <br></br>

            {/* Pagination */}
            <div className="flex mt-0 justify-end">
              <Pagination
                currentPage={currentPage}
                totalPages={Math.ceil(inventoryData.length / itemsPerPage)}
                onPageChange={onPageChange}
              />
            </div>

            {/* Table */}
            <div className="overflow-x-auto drop-shadow-lg mt-1" pill>
              <Table className=''>
                <Table.Head className=''> 
                  <Table.HeadCell className='text-center bg-green-100'>#</Table.HeadCell>
                  <Table.HeadCell className='text-center bg-green-100'>Item ID</Table.HeadCell>
                  <Table.HeadCell className='text-center bg-green-100'>Item name</Table.HeadCell>
                  <Table.HeadCell className='text-center bg-green-100'>QTY.</Table.HeadCell>
                  <Table.HeadCell className='text-center bg-green-100'>Unit</Table.HeadCell>
                  <Table.HeadCell className='text-center bg-green-100'>Vendor Name</Table.HeadCell>
                  <Table.HeadCell className='text-center bg-green-100'>Item Added Date</Table.HeadCell>
                  <Table.HeadCell className='text-center bg-green-100'>Item Modified Date</Table.HeadCell>
                  <Table.HeadCell className='text-center bg-green-100'>Action</Table.HeadCell>
                </Table.Head>
                <Table.Body className="divide-y">

                  {loading ? (<Table.Row>
                    <Table.Cell colSpan="10" className="text-center">Loading...</Table.Cell>
                  </Table.Row>) : (
                    currentInventoryData.map((item, index) => (
                      <Table.Row key={item.id} className="bg-white dark:border-gray-700 dark:bg-gray-800">
                        <Table.Cell>{index + 1}</Table.Cell>
                        <Table.Cell>{item.id}</Table.Cell>
                        <Table.Cell>{item.itemName}</Table.Cell>
                        <Table.Cell>{item.quantity}</Table.Cell>
                        <Table.Cell>{item.unit}</Table.Cell>
                        <Table.Cell>{item.vendorId}</Table.Cell>
                        <Table.Cell>{new Date(item.dateTime).toLocaleString()}</Table.Cell>
                        <Table.Cell>{new Date(item.lastModified).toLocaleString()}</Table.Cell>
                        <Table.Cell>
                          <Dropdown label="Action" inline>
                            <Dropdown.Item onClick={() => handleEditClick(item.id)} >Edit</Dropdown.Item>
                            <Dropdown.Item onClick={() => handleDeleteItem(item.id)}>Delete</Dropdown.Item>
                          </Dropdown>
                        </Table.Cell>
                      </Table.Row>
                    ))
                  )}
                </Table.Body>
              </Table>
            </div>

          </div>


          {/* Right column */}
          <div className=' h-full w-auto md:h-screen  p-4 flex flex-col justify-start items-center bg-white  dark:bg-slate-800'>
            <div className=''>
              <h2 className="text-2xl">Check Daily Usage</h2>
            </div>

            {/* date picker */}
            <div className='mt-1 border-t-2 w-64'>
              <div className='mt-20 '>
                <TextInput
                  id='formDate'
                  type='date'
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                />
                
              </div>
            </div>

            <div className=''>
              <Button color="success" className='mt-6  bg-green-500' onClick={handleSubmitDailyUsage} >Submit</Button>
            </div>
          </div>

        </div>
      </section>
      {/* daily usage popup window */}
      {isOpenDailyUsageWindow && (
        <DailyInventoryUsage
          selectedDate={selectedDate}
          onCancel={cancelDailyUsage}
          
        />

      )}



      {/* Delete confirmation modal */}
      {showDeleteConfirmation && (
        <DeleteInventoryItem
          itemName={inventoryData.find(item => item.id === itemToDelete)?.itemName}
          onCancel={cancelDelete}
          onConfirm={confirmDelete}
        />
      )}

      {isEditPopupOpen && (
        <EditInventoryItem
          itemId={editItem}
          onCancel={cancelEdit}
          onSubmit={handleEditSubmit} // Reload items after editing
        />
      )}

      {isAddInventoryOpen && (
        <AddInventoryItem
          onCancel={cancelAddInventoryPopup}
          onSubmit={fetchData}
        />
      )}
    </Fragment>
  )
}
