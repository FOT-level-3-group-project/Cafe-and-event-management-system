import React, { useEffect, useState } from 'react';
import { Table, Button, Pagination } from "flowbite-react";

function EmpSalaries() {
  const [salaries, setSalaries] = useState([]);
  const [showExtraColumns, setShowExtraColumns] = useState(true); // State to manage column visibility
  const [currentPage, setCurrentPage] = useState(1); // State to manage current page
  const itemsPerPage = 5; // Number of items to display per page

  useEffect(() => {
    fetchAllMonthSalaries(); // Fetch all month salaries by default
  }, []);

  const fetchAllMonthSalaries = () => {
    fetch('http://localhost:8080/api/salary/getAllMonthSalaries')
      .then(response => response.json())
      .then(data => {
        console.log('Data received:', data);
        setSalaries(data);
      })
      .catch(error => {
        console.error('Error fetching all month salaries:', error);
      });
  };

  const fetchTodaySalaries = () => {
    fetch('http://localhost:8080/salary/currentDateSalaries')
      .then(response => response.json())
      .then(data => {
        console.log('Data received for today salaries:', data);
        setSalaries(data);
        setShowExtraColumns(false); // Hide extra columns
        calculateAllEmployeesDailySalary(); // Call the calculation function
      })
      .catch(error => {
        console.error('Error fetching today salaries:', error);
      });
  };

  const fetchThisMonthSalaries = () => {
    fetch('http://localhost:8080/api/salary/getThisMonthSalaries')
      .then(response => response.json())
      .then(data => {
        console.log('Data received for this month salaries:', data);
        setSalaries(data);
        setShowExtraColumns(true); // Show extra columns
        calculateMonthlySalaries(); // Call the monthly calculation function
      })
      .catch(error => {
        console.error('Error fetching this month salaries:', error);
      });
  };

  const calculateAllEmployeesDailySalary = () => {
    fetch('http://localhost:8080/salary/calculateAll')
      .then(response => {
        if (response.ok) {
          console.log('All employees daily salaries calculated successfully.');
        } else {
          throw new Error('Failed to calculate all employees daily salaries.');
        }
      })
      .catch(error => {
        console.error('Error calculating all employees daily salaries:', error);
      });
  };

  const calculateMonthlySalaries = () => {
    fetch('http://localhost:8080/api/salary/calculateMonthlySalaries', {
      method: 'POST'
    })
      .then(response => response.text())
      .then(data => {
        console.log('Monthly salaries calculation result:', data);
      })
      .catch(error => {
        console.error('Error calculating monthly salaries:', error);
      });
  };

  // Calculate indexes for pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = salaries.slice(indexOfFirstItem, indexOfLastItem);

  // Function to handle page change
  const onPageChange = (page) => setCurrentPage(page);

  return (
    <div>
      <div className="flex items-center m-4 justify-between border-b bg-white dark:bg-gray-500 p-3 shadow-md rounded-md">
        <div className="flex gap-4 ml-50 ">
          <Button
            color='success'
            size='s'
            className="px-4 py-2 bg-green-500 hover:bg-blue-800 text-white rounded-md"
            onClick={fetchTodaySalaries}
          >
            Today Salaries
          </Button>
          <Button
            color='success'
            size='s'
            className="px-4 py-2 bg-green-500 hover:bg-blue-800 text-white rounded-md"
            onClick={fetchThisMonthSalaries}
          >
            This Month Salaries
          </Button>
        </div>
      </div>
      
      <div className="overflow-x-auto mr-8 ml-8 mt-8 border shadow">
        <Table>
          <Table.Head>
            <Table.HeadCell>Emp Name</Table.HeadCell>
            <Table.HeadCell>Pay per Hour</Table.HeadCell>
            <Table.HeadCell>Worked Hours</Table.HeadCell>
            <Table.HeadCell className="text-red-600">Total Payment for WH</Table.HeadCell>
            <Table.HeadCell>Pay per OT Hour</Table.HeadCell>
            <Table.HeadCell>OT Hours</Table.HeadCell>
            <Table.HeadCell className="text-red-600">Total Payment for OT</Table.HeadCell>
            {showExtraColumns && (
              <>
                <Table.HeadCell className="text-red-600">Bonus Type</Table.HeadCell>
                <Table.HeadCell className="text-red-600">Bonuses</Table.HeadCell>
                <Table.HeadCell className="text-red-600">Deduction Type</Table.HeadCell>
                <Table.HeadCell className="text-red-600">Deductions</Table.HeadCell>
                <Table.HeadCell className="text-red-600">Month</Table.HeadCell>
              </>
            )}
            <Table.HeadCell className="text-red-600">Gross Payment</Table.HeadCell>
          </Table.Head>
          <Table.Body className="divide-y">
            {currentItems.map((salary) => (
              <Table.Row key={salary.id} className="bg-white dark:border-gray-700 dark:bg-gray-800">
                <Table.Cell>{salary.empName}</Table.Cell>
                <Table.Cell>{salary.payPerHour}</Table.Cell>
                <Table.Cell>{salary.workedHours}</Table.Cell>
                <Table.Cell>{salary.totalHourPayment}</Table.Cell>
                <Table.Cell>{salary.payPerOvertimeHour}</Table.Cell>
                <Table.Cell>{salary.othours}</Table.Cell>
                <Table.Cell>{salary.totalOvertimePayment}</Table.Cell>
                {showExtraColumns && (
                  <>
                    <Table.Cell>{salary.bonusType}</Table.Cell>
                    <Table.Cell>{salary.bonus}</Table.Cell>
                    <Table.Cell>{salary.deductionType}</Table.Cell>
                    <Table.Cell>{salary.deduction}</Table.Cell>
                    <Table.Cell>{salary.month}</Table.Cell>
                  </>
                )}
                <Table.Cell>{salary.grossPayment}</Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>


      </div>


              {/* Pagination */}
              <div className="flex justify-center">
          <Pagination
            currentPage={currentPage}
            totalPages={Math.ceil(salaries.length / itemsPerPage)}
            onPageChange={onPageChange}
          />
        </div>
    </div>
  );
}

export default EmpSalaries;
