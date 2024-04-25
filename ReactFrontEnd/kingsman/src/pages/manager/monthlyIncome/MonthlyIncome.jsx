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
  }, []); // Empty dependency array means this effect runs only once after initial render

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
    <div className='w-1/2  border border-black border-solid'>
        <div className='flex justify-between'>
            <h1>Kingsman Cafe </h1>
            <h1>Monthly Income Statement</h1>
        </div>
        <div>
            <table className='w-full'>
                <th colSpan={2}> Revenue</th>
                <td> Events</td>
            </table>
        </div>
    </div>
  );
};
