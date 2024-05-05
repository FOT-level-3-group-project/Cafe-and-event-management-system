import React from 'react';
import { Table, Card, Button } from "flowbite-react";
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

const AnnualIncome = () => {
  const handleDownloadPDF = () => {
    const inputElement = document.getElementById('annual-report');

    // Configure html2canvas to capture content
    html2canvas(inputElement, { scale: 2 }).then((canvas) => {
      const imgData = canvas.toDataURL('image/png', 1.0); // Use 1.0 quality for image data

      const pdf = new jsPDF('p', 'mm', 'a4'); // Create new PDF document (portrait mode, millimeters, A4 size)

      const imgWidth = 210; // A4 width in mm (landscape mode)
      const imgHeight = canvas.height * imgWidth / canvas.width; // Calculate image height based on aspect ratio

      // Add image to PDF with higher DPI for better quality
      pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight, undefined, 'FAST');

      pdf.save('Annual Income Statement.pdf'); // Save PDF with filename
    });
  };


  return (
    <div className="w-full pt-10"> 
      <div className='flex'>
        <div className=" w-1/2 pl-5">
          <h1 className=" text-3xl font-bold text-gray-900 dark:text-white">Annual Profit and Loss Statement</h1> <br/> 
        </div>
        <div className=" w-1/2 flex justify-end pr-5">
          <Button onClick={handleDownloadPDF} className=" hover:bg-green-700 text-white font-bold mb-5 rounded">Export</Button>
        </div>
      </div> <hr></hr> <br/>
      
      {/*   Container for cards arranged horizontally */}
      <div className="flex space-x-4 mb-4 justify-center">
        <Card className="max-w-xs flex-1 text-blue-500">
          <h5 className="text-l font-bold  dark:text-white">
            Total Income <br/>
            Rs. x,xxx,xxx
          </h5>
          <p className=" dark:text-gray-400 ">Prevoiuse Year:  Rs. x,xxx,xxx </p>
        </Card>
        <Card className="max-w-xs flex-1 text-red-500">
          <h5 className="text-l font-bold  dark:text-white">
            Total Expenses <br/>
            Rs. x,xxx,xxx
          </h5>
          <p className=" dark:text-gray-400"> Prevoiuse Year:  Rs. x,xxx,xxx </p>
        </Card>
        <Card className="max-w-xs flex-1 text-green-500">
          <h5 className="text-l font-bold dark:text-white">
            Net Profit <br/>
            Rs. x,xxx,xxx
          </h5>
          <p className=" dark:text-gray-400"> Prevoiuse Year:  Rs. x,xxx,xxx </p>
        </Card>
      </div>

    {/* Container for the table */}
      <div id="annual-report" className="overflow-x-auto w-1/2 mx-auto p-5">
        <div className="inline-block border w-full">
          <div className='flex p-4'>
            <div className='w-1/2'>
              <h1 className='font-bold'>Kingsman Cafe</h1>
            </div>
            <div className='w-1/2'>
              <h1 className='font-bold text-right text-black'>Annual Profit and Loss Statement</h1>
              <h2 className='font-semibold text-right text-black'>For the year of 2024</h2>
            </div>
          </div>
         <Table hoverable className=''>
         <Table.Body className='' >
            <Table.Row className='' >
              <Table.Cell className='bg-blue-400 text-black font-semibold' >REVENUES</Table.Cell>
               <Table.Cell className='bg-blue-400 text-black font-semibold text-right' >Rs.</Table.Cell>
                <Table.Cell className='bg-blue-400 text-black font-semibold text-right' >Rs.</Table.Cell>
            </Table.Row>
            <Table.Row className="bg-white text-black dark:border-gray-700 dark:bg-gray-800">
              <Table.Cell className=' '>Sales Revenue</Table.Cell>
              <Table.Cell className='pr-2 text-right '>xxxxxx</Table.Cell>
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
            <Table.Row >
              <Table.Cell className='bg-blue-400 text-black font-semibold'>EXPENSES</Table.Cell>
              <Table.Cell className='text-right bg-blue-400 text-black font-semibold' >Rs.</Table.Cell>
                <Table.Cell className='text-right bg-blue-400 text-black font-semibold' >Rs.</Table.Cell>
            </Table.Row>
            <Table.Row className="bg-white text-black dark:border-gray-700 dark:bg-gray-800">
              <Table.Cell>Electricity Bill</Table.Cell>
              <Table.Cell className='pr-2 text-right'>xxxxx</Table.Cell>
              <Table.Cell></Table.Cell>
            </Table.Row>
            <Table.Row className="bg-white text-black dark:border-gray-700 dark:bg-gray-800">
              <Table.Cell>Water Bill</Table.Cell>
              <Table.Cell className='pr-2 text-right'>xxxxx</Table.Cell>
              <Table.Cell></Table.Cell>
            </Table.Row>
             <Table.Row className="bg-white text-black dark:border-gray-700 dark:bg-gray-800">
              <Table.Cell>Telephone Bill</Table.Cell>
              <Table.Cell className='pr-2 text-right'>xxxx</Table.Cell>
              <Table.Cell></Table.Cell>
            </Table.Row>
             <Table.Row className="bg-white text-black dark:border-gray-700 dark:bg-gray-800">
              <Table.Cell>Web Hosting</Table.Cell>
              <Table.Cell className='pr-2 text-right'>xxxx</Table.Cell>
              <Table.Cell></Table.Cell>
            </Table.Row>
             <Table.Row className="bg-white text-black dark:border-gray-700 dark:bg-gray-800">
              <Table.Cell className=' '>Entertainers' Payment</Table.Cell>
              <Table.Cell className='pr-2 text-right'>xxxxx</Table.Cell>
              <Table.Cell></Table.Cell>
            </Table.Row>
            <Table.Row className="bg-white text-black dark:border-gray-700 dark:bg-gray-800">
              <Table.Cell>Employee Wages</Table.Cell>
              <Table.Cell className='pr-2 text-right '>xxxxxx</Table.Cell>
              <Table.Cell></Table.Cell>
            </Table.Row>
            <Table.Row className="bg-white text-black dark:border-gray-700 dark:bg-gray-800">
              <Table.Cell>Kitchen Utilities</Table.Cell>
              <Table.Cell className='pr-2 text-right'>xxxxxx</Table.Cell>
              <Table.Cell></Table.Cell>
            </Table.Row>
            <Table.Row className="bg-white text-black dark:border-gray-700 dark:bg-gray-800">
              <Table.Cell>Inventory Expenses</Table.Cell>
              <Table.Cell className='pr-2 text-right'>xxxxxx</Table.Cell>
              <Table.Cell></Table.Cell>
            </Table.Row>
            <Table.Row className="bg-white text-black dark:border-gray-700 dark:bg-gray-800">
              <Table.Cell> Insurance </Table.Cell>
              <Table.Cell className='pr-2 text-right'>xxxx</Table.Cell>
              <Table.Cell></Table.Cell>
            </Table.Row>
            <Table.Row className="bg-white text-black dark:border-gray-700 dark:bg-gray-800">
              <Table.Cell>Other Expenses</Table.Cell>
              <Table.Cell className='pr-2 text-right'>xxxx</Table.Cell>
              <Table.Cell></Table.Cell>
            </Table.Row>
            <Table.Row className='border-t-2 border-b-2 font-semibold text-red-700'>
              <Table.Cell className=""> TOTAL EXPENSES</Table.Cell>
               <Table.Cell></Table.Cell>
               <Table.Cell  className='pr-2 text-right '> xxxxxx </Table.Cell>
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
              <Table.Cell>PROFIT</Table.Cell>
              <Table.Cell></Table.Cell>
               <Table.Cell className="pr-2 text-right ">xxxxxx </Table.Cell>
            </Table.Row>
          </Table.Body>
        </Table>
        </div>
      </div>
    </div>
  );
};

export default AnnualIncome;
