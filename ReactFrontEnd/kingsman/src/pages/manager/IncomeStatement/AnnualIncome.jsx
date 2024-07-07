import React, { useState, useEffect } from 'react';
import { Table, Card, Button } from "flowbite-react";
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import CafeandEvent from '/src/image/CafeandEvent.png';

const AnnualIncome = () => {
  const [expenses, setExpenses] = useState({
    electricity: 0,
    water: 0,
    telephone: 0,
    internet: 0,
    inventoryExpenses: 0,
    insurance: 0,
    otherExpenses: 0,
  });
  const [billTypeAmounts, setBillTypeAmounts] = useState([]);
  const [totalAnnualExpenses, setTotalAnnualExpenses] = useState(0);
  const [totalAnnualSalary, setTotalAnnualSalary] = useState(0);
  const [totalEventBudgetforYear, setTotalEventBudgetforYear] = useState(0);
  const [totalInventoryPurchasesForYear, setTotalInventoryPurchasesForYear] = useState(0);
  const [salesRevenue, setSalesRevenue] = useState(0);
  const [eventRevenue, setEventRevenue] = useState(0);
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [totalIncome, setTotalIncome] = useState(0);
  const [tax, setTax] = useState(0);
  const [netProfit, setNetProfit] = useState(0);;
  const currentYear = new Date().getFullYear();

  useEffect(() => {
    fetchAnnualExpenses(); // Fetch monthly expenses 
    fetchBillTypeAmounts(); // Fetch bill type amounts
    fetchAnnualSalesRevenue(); // Fetch monthly sales revenue 
    fetchEventRevenue(); // Fetch event revenue 
    fetchAnnualSalary(); // Fetch annual salary 
    fetchTotalEventBudgetforYear(); // Fetch total event budget for the year 
    fetchTotalInventoryPurchasesForYear(); // Fetch total inventory purchases for the year
  }, []);


  useEffect(() => {
    calculateTotalAnnualRevenue(); // Calculate total revenue 
    calculateTotalAnnaulExpenses(); // Calculate total expenses whenever billTypeAmounts changes
    calculateTotalAnnaulIncome(); // Calculate total income 
    calculateTax(); // Calculate tax
    calculateNetProfit(); // Calculate net profit
  }, [billTypeAmounts, salesRevenue, eventRevenue, totalAnnualExpenses, totalRevenue, totalIncome, tax]);

  // Fetch annual expenses from API
  const fetchAnnualExpenses = async () => {
    try {
      const response = await fetch('http://localhost:8080/api/payment/current-year'); // Fetch annual data from API
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
      const data = await response.json();
      setExpenses(data); // Update state with fetched data
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

 
  // Fetch bill type amounts from the API
  const fetchBillTypeAmounts = async () => {
    try {
      const response = await fetch('http://localhost:8080/api/payment/current-year');
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
      const data = await response.json();
      setBillTypeAmounts(data);
    } catch (error) {
      console.error('Error fetching bill type amounts:', error);
    }
  };

  // Fetch annual salary from the API
  const fetchAnnualSalary = async () => {
    try {
      const response = await fetch('http://localhost:8080/api/salary/annual-total-salary');
      if (!response.ok) {
        throw new Error('Failed to fetch annual salary');
      }
      const annualSalary = await response.json();
      setTotalAnnualSalary(annualSalary);
    } catch (error) {
      console.error('Error fetching annual salary:', error);
    }
  };

  // Fetch total event budget for the year from the API
  const fetchTotalEventBudgetforYear = async () => {
    try {
      const response = await fetch('http://localhost:8080/api/events/annual-total-budget');
      if (!response.ok) {
        throw new Error('Failed to fetch total event budget for the year');
      }
      const totalBudget = await response.json();
      setTotalEventBudgetforYear(totalBudget);
    } catch (error) {
      console.error('Error fetching total event budget for the year:', error);
    }
  };

  // Fetch total inventory purchases for the year from the API
  const fetchTotalInventoryPurchasesForYear = async () => {
    try {
      const response = await fetch('http://localhost:8080/api/inventory/annual-total-purchases');
      if (!response.ok) {
        throw new Error('Failed to fetch total inventory purchases for the year');
      }
      const totalPurchases = await response.json();
      setTotalInventoryPurchasesForYear(totalPurchases);
    } catch (error) {
      console.error('Error fetching total inventory purchases for the year:', error);
    }
  };


  // Fetch annual sales revenue from the API
   const fetchAnnualSalesRevenue = async () => {
    try {
      const response = await fetch('http://localhost:8080/api/orders/annaul-sales-revenue');
      if (!response.ok) {
        throw new Error('Failed to fetch sales revenue');
      }
      const salesRevenue = await response.json();
      // console.log('Monthly sales revenue data:', salesRevenue);
      setSalesRevenue(salesRevenue);
    } catch (error) {
      console.error('Error fetching sales revenue:', error);
    }
  };

  // Fetch event revenue from the API
  const fetchEventRevenue = async () => {
    try {
      const response = await fetch('http://localhost:8080/api/events/annual-total-revenue');
      if (!response.ok) {
        throw new Error('Failed to fetch event revenue');
      }
      const eventRevenue = await response.json();
      // console.log('Event data:', eventRevenue); // Debugging statement
      setEventRevenue(eventRevenue);
    } catch (error) {
      console.error('Error fetching event revenue:', error);
    }
  };

//send data to database
 const sendReportDataToBackend = () => {
  const reportData = {
    year: currentYear,
    netProfit: netProfit,
    totalIncome: totalIncome,
    totalExpenses: totalAnnualExpenses
  };

  fetch('http://localhost:8080/api/income/save-annual', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(reportData)
  })
  .then(response => {
    if (!response.ok) {
      throw new Error('Failed to save annual report data');
    }
    console.log('Annual report data sent to backend successfully');
  })
  .catch(error => {
    console.error('Error saving annual report data:', error);
  });
};

 // Calculate total revenue
  const calculateTotalAnnualRevenue = () => {
    const totalRev = salesRevenue + eventRevenue;
    setTotalRevenue(totalRev);
  };

  // Calculate total expenses
  const calculateTotalAnnaulExpenses = () => {
    const totalEx = billTypeAmounts.reduce((accumulator, item) => {
      return accumulator + item.totalAmount;
    }, 0);
    setTotalAnnualExpenses(totalEx);

  const totalExpenses = totalEx + totalAnnualSalary + totalEventBudgetforYear;
  // const totalExpenses = totalEx + totalAnnualSalary + totalEventBudgetforYear + totalInventoryPurchasesForYear;
  setTotalAnnualExpenses(totalExpenses);
  };


  // Calculate total income
  const calculateTotalAnnaulIncome = () => {
  const totalIn = totalRevenue  - totalAnnualExpenses;
  setTotalIncome(totalIn);
};


  // Calculate tax
  const calculateTax = () => {
    const taxAmount = totalIncome * 0.3; // 30% of total income
    console.log('Tax amount:', taxAmount); // Debugging statement
    setTax(taxAmount);
  };


  // Calculate net profit
  const calculateNetProfit = () => {
    const net = totalIncome - tax;
    setNetProfit(net);
  };


  const handleDownloadPDF = () => {
   // Download PDF of the annual statement
    const inputElement = document.getElementById('annual-report'); // Element to capture

    html2canvas(inputElement).then((canvas) => {
      const imgData = canvas.toDataURL('image/png'); // Convert canvas to image data
      const pdf = new jsPDF('p', 'mm', 'a4'); // Create new PDF document (portrait mode, millimeters, A4 size)

      const imgWidth = 210; // A4 width in mm (landscape mode)
      const imgHeight = canvas.height * imgWidth / canvas.width; // Calculate image height based on aspect ratio

      pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight); // Add image to PDF

      pdf.save('Annual Income Statement.pdf'); // Save PDF with filename    
    });

    sendReportDataToBackend(); // Send report data to backend
  };

  return (
    <div className="w-full pt-10 ">
      <div className='flex'>
        <div className=" w-1/2 pl-5">
          <h1 className=" text-3xl font-bold text-gray-900 dark:text-white">Annual Profit and Loss Statement</h1> <br/>
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
            Rs. {totalIncome.toLocaleString()}
          </h5>
          <p className=" dark:text-gray-400 ">
            Previous Year:  Rs. x,xxx,xxx
          </p>
        </Card>
        <Card className="max-w-xs flex-1 text-red-500">
          <h5 className="text-l font-bold  dark:text-white">
            Total Expenses <br/>
            Rs. {totalAnnualExpenses.toLocaleString()}
          </h5>
          <p className=" dark:text-gray-400">
            Previous Year:  Rs. x,xxx,xxx
          </p>
        </Card>
        <Card className="max-w-xs flex-1 text-green-500">
          <h5 className="text-l font-bold dark:text-white">
            Net Profit <br/>
             Rs. {netProfit.toLocaleString()}
          </h5>
          <p className=" dark:text-gray-400">
            Previous Year:  Rs. x,xxx,xxx
          </p>
        </Card>
      </div>

      {/* Container for the table */}
      <div id="annual-report" className="overflow-x-auto w-1/2 mx-auto p-5">
        <div className="inline-block border w-full">
          <div className='flex p-4'>
            <div className='w-1/2'>
               <img src={CafeandEvent} alt="Kingsman Cafe Logo" className="h-12 w-auto" />
            </div>
            <div className='w-1/2'>
              <h1 className='font-bold text-right'>Annual Profit and Loss Statement</h1>
              <h2 className='font-semibold text-right'>For the year {currentYear}</h2>
            </div>
          </div>

          <Table hoverable className=''>
            <Table.Body className=''>
              <Table.Row className="bg-white text-black dark:border-gray-700 dark:bg-gray-800">
                <Table.Cell className='bg-green-600 text-white font-semibold' >REVENUES</Table.Cell>
                <Table.Cell className='bg-green-600 text-white font-semibold text-right' >Rs.</Table.Cell>
                <Table.Cell className='bg-green-600 text-white font-semibold text-right' >Rs.</Table.Cell>
              </Table.Row>
              <Table.Row className="bg-white text-black dark:border-gray-700 dark:bg-gray-800">
                <Table.Cell>Sales Revenue</Table.Cell>
                <Table.Cell className='pr-2 text-right'>{salesRevenue}</Table.Cell>
                <Table.Cell></Table.Cell>
              </Table.Row>
              <Table.Row className="bg-white text-black dark:bg-gray-800">
                <Table.Cell>Event Revenue</Table.Cell>
                <Table.Cell className='pr-2 text-right'>{eventRevenue}</Table.Cell>
                <Table.Cell></Table.Cell>
              </Table.Row>
              <Table.Row className='border-t-2 text-blue-700 '>
                <Table.Cell className="font-semibold "> TOTAL REVENUES</Table.Cell>
                <Table.Cell></Table.Cell>
                <Table.Cell className='pr-2 text-right font-semibold'>{totalRevenue}</Table.Cell>
              </Table.Row>
              <Table.Row className=''>
                <Table.Cell className='bg-green-600 text-white font-semibold'>EXPENSES</Table.Cell>
                <Table.Cell className='bg-green-600 text-white font-semibold text-right' >Rs.</Table.Cell>
                <Table.Cell className='bg-green-600 text-white font-semibold text-right' >Rs.</Table.Cell>
              </Table.Row>
              {billTypeAmounts.map((item, index) => (
                <Table.Row key={index} className="bg-white text-black dark:border-gray-700 dark:bg-gray-800">
                  <Table.Cell>{item.billType}</Table.Cell>
                  <Table.Cell className='pr-2 text-right'>{item.totalAmount}</Table.Cell>
                  <Table.Cell></Table.Cell>
                </Table.Row>
              ))}
              <Table.Row className="bg-white text-black dark:border-gray-700 dark:bg-gray-800">
                <Table.Cell>Employee Wages</Table.Cell>
                <Table.Cell className='pr-2 text-right'>{totalAnnualSalary}</Table.Cell>
                <Table.Cell></Table.Cell>
              </Table.Row>
               <Table.Row className="bg-white text-black dark:border-gray-700 dark:bg-gray-800">
                <Table.Cell>Event Budget</Table.Cell>
                <Table.Cell className='pr-2 text-right'>{totalEventBudgetforYear}</Table.Cell>
                <Table.Cell></Table.Cell>
              </Table.Row>
              <Table.Row className="bg-white text-black dark:border-gray-700 dark:bg-gray-800">
                <Table.Cell>Inventory Item Purchases</Table.Cell>
                {/* <Table.Cell className='pr-2 text-right'>{totalInventoryPurchasesForYear}</Table.Cell> */}
                <Table.Cell className='pr-2 text-right'>0</Table.Cell>
                <Table.Cell></Table.Cell>
              </Table.Row>
              <Table.Row className='border-t-2 border-b-2 font-semibold text-red-700'>
                <Table.Cell className=""> TOTAL EXPENSES</Table.Cell>
                <Table.Cell></Table.Cell>
                <Table.Cell  className='pr-2 text-right '> {totalAnnualExpenses} </Table.Cell>
              </Table.Row>
              <Table.Row className='border-t-2 font-semibold text-green-700'>
                <Table.Cell>TOTAL INCOME</Table.Cell>
                <Table.Cell></Table.Cell>
                <Table.Cell className="pr-2 text-right ">{totalIncome} </Table.Cell>
              </Table.Row>
              <Table.Row className="bg-white text-black dark:border-gray-700 dark:bg-gray-800">
                <Table.Cell>Less: Taxes</Table.Cell>
                <Table.Cell className='pr-2 text-right'> {tax}  </Table.Cell>
                <Table.Cell></Table.Cell>
              </Table.Row>
              <Table.Row className='border-t-2 font-semibold text-green-700'>
                <Table.Cell className='bg-green-600 text-white'>NET PROFIT / LOSS</Table.Cell>
                <Table.Cell className='bg-green-600 text-white'></Table.Cell>
                <Table.Cell className="pr-2 text-right bg-green-600 text-white">{netProfit} </Table.Cell>
              </Table.Row>
            </Table.Body>
          </Table>
        </div>
      </div>
    </div>
  );
}

export default  AnnualIncome;

