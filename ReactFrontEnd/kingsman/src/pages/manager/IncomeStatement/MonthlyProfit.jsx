import React, { useState, useEffect } from 'react';
import { Table, TableCell, Card, Button } from "flowbite-react";
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

const MonthlyProfit = () => {
  const [expenses, setExpenses] = useState({
    electricity: 0,
    water: 0,
    telephone: 0,
    internet: 0,
    entertainersPayment: 0,
    employeeWages: 0,
    kitchenUtilities: 0,
    inventoryExpenses: 0,
    insurance: 0,
    otherExpenses: 0,
  });

  const [billTypeAmounts, setBillTypeAmounts] = useState([]);
  const [totalExpenses, setTotalExpenses] = useState(0);

  useEffect(() => {
    fetchMonthlyExpenses(); // Fetch monthly expenses when component mounts
    fetchBillTypeAmounts(); // Fetch bill type amounts when component mounts
  }, []);

   useEffect(() => {
    calculateTotalExpenses(); // Calculate total expenses whenever billTypeAmounts changes
  }, [billTypeAmounts]);

  const fetchMonthlyExpenses = async () => {
    try {
      const response = await fetch('http://localhost:8080/api/payment/current-month'); // Fetch data from API
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
      const data = await response.json();
      setExpenses(data); // Update state with fetched data
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const fetchBillTypeAmounts = async () => {
    try {
      const response = await fetch('http://localhost:8080/api/payment/current-month');
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
      const data = await response.json();
      setBillTypeAmounts(data);
    } catch (error) {
      console.error('Error fetching bill type amounts:', error);
    }
  };

  const calculateTotalExpenses = () => {
    const total = billTypeAmounts.reduce((accumulator, item) => {
      return accumulator + item.totalAmount;
    }, 0);
    setTotalExpenses(total);
  };


  const handleDownloadPDF = () => {
    const inputElement = document.getElementById('monthly-report'); // Element to capture

    html2canvas(inputElement).then((canvas) => {
      const imgData = canvas.toDataURL('image/png'); // Convert canvas to image data
      const pdf = new jsPDF('p', 'mm', 'a4'); // Create new PDF document (portrait mode, millimeters, A4 size)

      const imgWidth = 210; // A4 width in mm (landscape mode)
      const imgHeight = canvas.height * imgWidth / canvas.width; // Calculate image height based on aspect ratio

      pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight); // Add image to PDF

      pdf.save('Monthly Income Statement.pdf'); // Save PDF with filename
    });
  };

  return (
    <div className="w-full pt-10 ">
      <div className='flex'>
        <div className=" w-1/2 pl-5">
          <h1 className=" text-3xl font-bold text-gray-900 dark:text-white">Monthly Profit and Loss Statement</h1> <br/>
        </div>
        <div className=" w-1/2 flex justify-end pr-5">
          <Button onClick={handleDownloadPDF} className=" hover:bg-green-700 text-white font-bold mb-5 rounded">Export</Button>
        </div>
      </div>
      <hr></hr> <br/>
      {/*   Container for cards arranged horizontally */}
      <div className="flex space-x-4 mb-4 justify-center">
        <Card className="max-w-xs flex-1 text-blue-500">
          <h5 className="text-l font-bold  dark:text-white">
            Total Income <br/>
            Rs. x,xxx,xxx
          </h5>
          <p className=" dark:text-gray-400 ">
            Previous Month:  Rs. x,xxx,xxx
          </p>
        </Card>
        <Card className="max-w-xs flex-1 text-red-500">
          <h5 className="text-l font-bold  dark:text-white">
            Total Expenses <br/>
            Rs. x,xxx,xxx
          </h5>
          <p className=" dark:text-gray-400">
            Previous Month:  Rs. x,xxx,xxx
          </p>
        </Card>
        <Card className="max-w-xs flex-1 text-green-500">
          <h5 className="text-l font-bold dark:text-white">
            Net Profit <br/>
            Rs. x,xxx,xxx
          </h5>
          <p className=" dark:text-gray-400">
            Previous Month:  Rs. x,xxx,xxx
          </p>
        </Card>
      </div>

      {/* Container for the table */}
      <div id="monthly-report" className="overflow-x-auto w-1/2 mx-auto p-5">
        <div className="inline-block border w-full">
          <div className='flex p-4'>
            <div className='w-1/2'>
              <h1 className='font-bold'>Kingsman Cafe</h1>
            </div>
            <div className='w-1/2'>
              <h1 className='font-bold text-right'>Monthly Profit and Loss Statement</h1>
              <h2 className='font-semibold text-right'>For the month of June 2024</h2>
            </div>
          </div>
          <Table hoverable className=''>
            <Table.Body className=''>
              <Table.Row className="bg-white text-black dark:border-gray-700 dark:bg-gray-800">
                <Table.Cell className='bg-blue-400 text-black font-semibold' >REVENUES</Table.Cell>
                <Table.Cell className='bg-blue-400 text-black font-semibold text-right' >Rs.</Table.Cell>
                <Table.Cell className='bg-blue-400 text-black font-semibold text-right' >Rs.</Table.Cell>
              </Table.Row>
              <Table.Row className="bg-white text-black dark:border-gray-700 dark:bg-gray-800">
                <Table.Cell>Sales Revenue</Table.Cell>
                <Table.Cell className='pr-2 text-right'>xxxxxx</Table.Cell>
                <Table.Cell></Table.Cell>
              </Table.Row>
              <Table.Row className="bg-white text-black dark:bg-gray-800">
                <Table.Cell>Event Revenue</Table.Cell>
                <Table.Cell className='pr-2 text-right'>xxxxx</Table.Cell>
                <Table.Cell></Table.Cell>
              </Table.Row>
              <Table.Row className="bg-white text-black dark:border-gray-700 dark:bg-gray-800">
                <Table.Cell>Other Revenue</Table.Cell>
                <Table.Cell className='pr-2 text-right'>xxxx</Table.Cell>
                <Table.Cell></Table.Cell>
              </Table.Row>
              <Table.Row className='border-t-2 text-blue-700 '>
                <Table.Cell className="font-semibold "> TOTAL REVENUES</Table.Cell>
                <Table.Cell></Table.Cell>
                <Table.Cell className='pr-2 text-right font-semibold'>xxxxxx</Table.Cell>
              </Table.Row>
              <Table.Row className=''>
                <Table.Cell className='bg-blue-400 text-black font-semibold'>EXPENSES</Table.Cell>
                <Table.Cell className='bg-blue-400 text-black font-semibold text-right' >Rs.</Table.Cell>
                <Table.Cell className='bg-blue-400 text-black font-semibold text-right' >Rs.</Table.Cell>
              </Table.Row>
              {billTypeAmounts.map((item, index) => (
                <Table.Row key={index} className="bg-white text-black dark:border-gray-700 dark:bg-gray-800">
                  <Table.Cell>{item.billType}</Table.Cell>
                  <Table.Cell className='pr-2 text-right'>{item.totalAmount}</Table.Cell>
                  <Table.Cell></Table.Cell>
                </Table.Row>
              ))}
              <Table.Row className='border-t-2 border-b-2 font-semibold text-red-700'>
                <Table.Cell className=""> TOTAL EXPENSES</Table.Cell>
                <Table.Cell></Table.Cell>
                <Table.Cell  className='pr-2 text-right '> {totalExpenses} </Table.Cell>
              </Table.Row>
              <Table.Row className='border-t-2 font-semibold text-green-700'>
                <Table.Cell>TOTAL INCOME</Table.Cell>
                <Table.Cell></Table.Cell>
                <Table.Cell className="pr-2 text-right ">xxxxxx </Table.Cell>
              </Table.Row>
              <Table.Row className="bg-white text-black dark:border-gray-700 dark:bg-gray-800">
                <Table.Cell>Less: Taxes</Table.Cell>
                <Table.Cell className='pr-2 text-right'> xxxx  </Table.Cell>
                <Table.Cell></Table.Cell>
              </Table.Row>
              <Table.Row className='border-t-2 font-semibold text-green-700'>
                <Table.Cell>NET INCOME</Table.Cell>
                <Table.Cell></Table.Cell>
                <Table.Cell className="pr-2 text-right ">xxxxxx </Table.Cell>
              </Table.Row>
            </Table.Body>
          </Table>
        </div>
      </div>
    </div>
  );
}

export default MonthlyProfit;
