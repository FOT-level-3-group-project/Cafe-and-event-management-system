import React, { useState, useEffect } from 'react';
import axios from 'axios';

export const MonthlyIncome = () => {
  // Define state variables to hold income statement data
  const [revenue, setRevenue] = useState(0);
  const [expenses, setExpenses] = useState(0);
  const [netIncome, setNetIncome] = useState(0);

  useEffect(() => {
    // Fetch income data when component mounts
    fetchIncomeData();
  }, []); 

  const fetchIncomeData = async () => {
    try {
      // Fetch income data from API
      const response = await axios.get('your-api-url');

      // Extract revenue and expenses from API response
      const { revenue, expenses } = response.data;

      // Calculate net income
      const netIncome = revenue - expenses;

      // Update state with fetched data
      setRevenue(revenue);
      setExpenses(expenses);
      setNetIncome(netIncome);
    } catch (error) {
      console.error('Error fetching income data:', error);
    }
  };

  return (
    <div className="w-1/2 ml-40">
      <div className="flex justify-center p-4">
        {/* <h1 className='font-bold'>Kingsman Vila</h1> */}
        <h2 className='font-bold'>Income Statement for January 2024 </h2>
      </div>
      <table className='w-full '>
        <tbody>
          <tr className=''>
            <td className="flex justify-normal bg-blue-900 text-white py-2">Revenue</td>
            <td className=" bg-blue-900"></td>
          </tr>
          <tr>
            <td className=" py-2">Sales</td>
            <td className=' text-right '> Rs. xxxxxx</td>
          </tr>
          <tr>
            <td className="py-2">Events</td>
            <td className=' text-right'> Rs. xxxxxx</td>
          </tr>
          <tr>
            <td className="py-2">Others</td>
            <td className=' text-right'> Rs. xxxxxx</td>
          </tr>
          <tr>
            <td className="bg-blue-200 py-2  dark:text-black">Total Revenues</td>
            <td className="bg-blue-200 text-right dark:text-black "> Rs. xxxxxx</td>
          </tr>
          <tr>
            <td className="flex justify-normal bg-blue-900 text-white py-2">Expenses</td>
            <td className=" bg-blue-900 "></td>
          </tr>
          <tr>
            <td className="py-2">Salary</td>
            <td className=' text-right'> Rs. xxxxxx</td>
          </tr>
          <tr>
            <td className="py-2">Inventory</td>
            <td className=' text-right'> Rs. xxxxxx</td>
          </tr>
          <tr>
            <td className="py-2">Electricity</td>
            <td className=' text-right'> Rs. xxxxxx</td>
          </tr>
          <tr>
            <td className="py-2">Water</td>
            <td className=' text-right'> Rs. xxxxxx</td>
          </tr>
          <tr>
            <td className="py-2">Others</td>
            <td className=' text-right'> Rs. xxxxxx</td>
          </tr>
          <tr>
            <td className="bg-blue-200 py-2 dark:text-black">Total Expenses</td>
            <td className="bg-blue-200 text-right dark:text-black"> Rs. xxxxxx</td>
          </tr>
          <tr>
            <td className="bg-blue-900 text-white py-2">Profit/Loss</td>
            <td className="bg-blue-900 text-white text-right" > Rs. xxxxxx</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};


