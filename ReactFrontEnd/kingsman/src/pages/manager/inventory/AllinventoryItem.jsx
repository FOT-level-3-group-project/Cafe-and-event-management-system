import React, { Fragment, useRef } from 'react'
import { Button, Pagination, Datepicker, Dropdown} from 'flowbite-react'
import { Table } from "flowbite-react";
import { useEffect, useState } from 'react';
import axios from 'axios';
import EditInventoryItem from './EditInventoryItem';

export default function AllinventoryItem() {
  const [inventoryData, setInventoryData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6; // Number of items to display per page
  const [selectedDate, setSelectedDate] = useState(null);
  // const datePickerRef = useRef(null);
  const [editItem, setEditItem] = useState(null); // State to store item being edited
  const [isEditPopupOpen, setIsEditPopupOpen] = useState(false); // State to manage visibility of edit popup

  useEffect(() => { fetchData(); }, []);

  const openAddInventoryPopup = () => { };

  
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
  
  // Function to handle the selection of the date
  const handleDateSelect = (date) => {
    setSelectedDate(date);
    console.log('Selected date:', selectedDate);
  };



  return (
    <Fragment>
      <section>
        <div className='h-screen w-full flex grid-rows-2 md:grid-cols-2 '>

          <div className='h-full w-auto md:h-screen p-4 border-r-2 border-l-2'>
            <div className='flex justify-between border-b-2'>
              {/* Left column */}
              <h2 className="text-3xl">Available Inventory Item</h2>

              {/* Add inventory button */}
              <Button color="success" onClick={openAddInventoryPopup}>
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
            <div className="overflow-x-auto">
              <Table striped>
                <Table.Head>
                  <Table.HeadCell className='text-center'>#</Table.HeadCell>
                  <Table.HeadCell className='text-center'>Item ID</Table.HeadCell>
                  <Table.HeadCell className='text-center'>Item name</Table.HeadCell>
                  <Table.HeadCell className='text-center'>QTY.</Table.HeadCell>
                  <Table.HeadCell className='text-center'>Unit</Table.HeadCell>
                  <Table.HeadCell className='text-center'>Vendor Name</Table.HeadCell>
                  <Table.HeadCell className='text-center'>Item Added Date</Table.HeadCell>
                  <Table.HeadCell className='text-center'>Item Modified Date</Table.HeadCell>
                  <Table.HeadCell className='text-center'>Action</Table.HeadCell>
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
                            <Dropdown.Item>Delete</Dropdown.Item>
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
          <div className=' h-full w-auto md:h-screen  p-4 flex flex-col justify-start items-center'>
            <div className=''>
              <h2 className="text-3xl">Check Daily Usage</h2>
            </div>

            {/* date picker */}
            <div className='mt-1 border-t-2'>
              <Datepicker inline onSelect={handleDateSelect} className='mt-7' />
            </div>

            <div className=''>
              <Button color="success" className='mt-6' >Submit</Button>
            </div>
          </div>

        </div>
      </section>

      {isEditPopupOpen && (
        <EditInventoryItem
          itemId={editItem}
          onCancel={cancelEdit}
          onSubmit={handleEditSubmit} // Reload items after editing
        />
      )}
    </Fragment>
  )
}
