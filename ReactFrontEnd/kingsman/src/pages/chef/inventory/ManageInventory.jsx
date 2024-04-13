import { React, Fragment, useEffect, useState } from 'react'
import { Table, Button, Pagination } from "flowbite-react";
import axios from 'axios';
import UseItemPopup from './UseItemPopup';

export default function ManageInventory() {
  const [items, setItems] = useState([]);
  const [todayUsage, setTodayUsage] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 7; // Number of items to display per page

  useEffect(() => { /*run the useEffect method, when lord the page and chenge the state*/
    fetchData();
    fetchTodayUsage();

  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/inventory/view");
      console.log(response.data);
      setItems(response.data);
      fetchTodayUsage();

    } catch (error) {
      console.error("Error fetch data", error);

    }
  };

  // Calculate the index range of items to display based on the current page
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  // Filter the inventory data to display only items for the current page
  const currentInventoryData = items.slice(startIndex, endIndex);

  const onPageChange = (page) => {
    setCurrentPage(page);

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

  // use Item popup winfow function

  const handleUseItem = (itemId) => {
    const item = items.find(item => item.id === itemId);
    setSelectedItem(item);
    setShowPopup(true);
    fetchData();
  };

  const handleUseItemConfirm = async (quantityUsed) => {
    try {
      fetchData();
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
    <Fragment>
      <section>
        <div className='h-screen w-full flex grid-rows-2 md:grid-cols-2 '>

          <div className='h-full w-2/3 md:h-screen p-4 border-r-2 border-l-2'>
            <div className='flex justify-between border-b-2'>
              {/* Left column */}
              <h2 className="text-3xl">Available Inventory Item</h2>


            </div>
            <br></br>
            {/* Pagination */}
            <div className="flex mt-0 justify-end">
              <Pagination
                currentPage={currentPage}
                totalPages={Math.ceil(items.length / itemsPerPage)}
                onPageChange={onPageChange}
              />
            </div>
            {/* inventory Table */}
            <div className="overflow-x-auto">
              <Table striped>
                <Table.Head>
                  <Table.HeadCell className='text-center'>#</Table.HeadCell>
                  <Table.HeadCell className='text-center'>Item ID</Table.HeadCell>
                  <Table.HeadCell className='text-center'>Item name</Table.HeadCell>
                  <Table.HeadCell className='text-center'>QTY.</Table.HeadCell>
                  <Table.HeadCell className='text-center'>Vendor Name</Table.HeadCell>
                  <Table.HeadCell className='text-center'>Action</Table.HeadCell>
                </Table.Head>
                <Table.Body className="divide-y">

                  {loading ? (<Table.Row>
                    <Table.Cell colSpan="10" className="text-center">Loading...</Table.Cell>
                  </Table.Row>) : (
                    currentInventoryData.map((item, index) => (
                      <Table.Row key={index} className="bg-white dark:border-gray-700 dark:bg-gray-800">
                        <Table.Cell className='text-center'>{index + 1}</Table.Cell>
                        <Table.Cell className='text-center'>{item.id}</Table.Cell>
                        <Table.Cell>{item.itemName}</Table.Cell>
                        <Table.Cell className='text-center'><span>{item.quantity} {item.unit}</span></Table.Cell>
                        <Table.Cell className='text-center'>{item.vendorId}</Table.Cell>
                        <Table.Cell><Button color='success' onClick={() => handleUseItem(item.id)}>Use</Button></Table.Cell>
                      </Table.Row>
                    ))
                  )}
                </Table.Body>
              </Table>
            </div>


          </div>


          {/* Right column */}
          <div className=' h-full w-auto md:h-screen  p-4 flex flex-col justify-start items-center'>
            <div className='flex justify-between border-b-2'>
              <h2 className="text-3xl">Today Item Usage</h2>


            </div>


            {/* daily usage show table */}
            <div className="overflow-x-auto">
              <Table striped>
                <Table.Head>
                  <Table.HeadCell className='text-center'>#</Table.HeadCell>
                  <Table.HeadCell className='text-center'>Item ID</Table.HeadCell>
                  <Table.HeadCell className='text-center'>Item name</Table.HeadCell>
                  <Table.HeadCell className='text-center'>Quantity Used.</Table.HeadCell>
                  <Table.HeadCell className='text-center'>Used Time</Table.HeadCell>
                </Table.Head>
                <Table.Body className="divide-y">

                  {loading ? (<Table.Row>
                    <Table.Cell colSpan="10" className="text-center">Loading...</Table.Cell>
                  </Table.Row>) : (
                    todayUsage.map((usage, index) => (
                      <Table.Row key={index} className="bg-white dark:border-gray-700 dark:bg-gray-800">
                        <Table.Cell className='text-center'>{index + 1}</Table.Cell>
                        <Table.Cell className='text-center'>{usage.itemId}</Table.Cell>
                        <Table.Cell className='text-center'>{usage.itemName}</Table.Cell>
                        <Table.Cell className='text-center'>{usage.decreasedQuantity} {usage.unit}</Table.Cell>
                        <Table.Cell className='text-center'>{new Date(usage.usageDateTime).toLocaleString()}</Table.Cell>

                      </Table.Row>
                    ))
                  )}
                </Table.Body>
              </Table>
            </div>
            {/* Popup window */}
            {showPopup && selectedItem && (
              <UseItemPopup
                item={selectedItem}
                onConfirm={handleUseItemConfirm}
                onCancel={handleCancelPopup}
                onReloadItems={() => {
                  fetchData();
                  fetchTodayUsage();
                }}
              />
            )}


          </div>

        </div>
      </section>

    </Fragment>
  )
}
