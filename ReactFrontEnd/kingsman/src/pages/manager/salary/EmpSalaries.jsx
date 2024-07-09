import React, { useEffect, useState } from 'react';
import { Table, Button, Pagination, Select } from "flowbite-react";
import { FaCloudDownloadAlt } from "react-icons/fa";
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';

function EmpSalaries() {
  const [salaries, setSalaries] = useState([]);
  const [showExtraColumns, setShowExtraColumns] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedMonth, setSelectedMonth] = useState('');
  const itemsPerPage = 5;

  useEffect(() => {
    fetchAllMonthSalaries();
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
        setShowExtraColumns(false);
        calculateAllEmployeesDailySalary();
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
        setShowExtraColumns(true);
        calculateMonthlySalaries();
      })
      .catch(error => {
        console.error('Error fetching this month salaries:', error);
      });
  };

  const fetchMonthSalaries = () => {
    if (selectedMonth !== '') {
      fetch(`http://localhost:8080/api/salary/getMonthSalaries/${selectedMonth}`)
        .then(response => response.json())
        .then(data => {
          console.log(`Data received for ${selectedMonth} salaries:`, data);
          setSalaries(data);
        })
        .catch(error => {
          console.error(`Error fetching ${selectedMonth} salaries:`, error);
        });
    } else {
      console.warn('Please select a month.');
    }
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

  const handleMonthChange = (event) => {
    setSelectedMonth(event.target.value);
  };

  const handleSearch = () => {
    fetchMonthSalaries();
  };

  const clearSearch = () => {
    setSelectedMonth('');
    fetchAllMonthSalaries();
  };

  const handleDownloadPDF = () => {
    const doc = new jsPDF();
    
    // Adding the title to the PDF
    const title = `${selectedMonth || 'All'} 2024 Salary Report`;
    doc.text(title, 14, 10);
  
    const tableHeaders = showExtraColumns ? [
      'Emp Name', 'PPH (Rs)', 'WNH', 'TPWH (Rs)', 'PPOT (Rs)', 'OT',
      'TPOT (Rs)', 'Total Payment without B& (Rs)', 'Bonuses (Rs)', 'Deductions (Rs)', 'Month', 'Gross Payment (Rs)'
    ] : [
      'Emp Name', 'Pay per Hour (Rs)', 'Worked Normal Hours', 'Total Payment for WH (Rs)', 'Pay per OT Hour (Rs)', 'OT Hours',
      'Total Payment for OT (Rs)', 'Gross Payment (Rs)'
    ];
  
    const tableData = salaries.map(row => showExtraColumns ? [
      row.empName, row.payPerHours, row.workedHours, row.totalHourPayment, row.payPerOvertimeHour, row.othours,
      row.totalOvertimePayment, row.paymentWithoutAdditional, row.bonus, row.deduction, row.month, row.grossPayment
    ] : [
      row.empName, row.payPerHours, row.workedHours, row.totalHourPayment, row.payPerOvertimeHour, row.othours,
      row.totalOvertimePayment, row.grossPayment
    ]);
  
    doc.autoTable({
      head: [tableHeaders],
      body: tableData,
      startY: 20, // Adjusting startY to leave space for the title
      margin: { top: 15 },
      styles: { overflow: 'linebreak' }
    });
  
    doc.save(`monthly_salaries_${selectedMonth || 'all'}.pdf`);
  };
  
  

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = salaries.slice(indexOfFirstItem, indexOfLastItem);

  const onPageChange = (page) => setCurrentPage(page);

  return (
    <div>
      <div className="flex items-center m-4 justify-between border-b bg-white dark:bg-gray-500 p-3 shadow-md rounded-md">
        <div className="flex gap-4 ml-50">
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
          <Select id="month" value={selectedMonth} onChange={handleMonthChange}>
            <option value="">Select Month</option>
            <option value="January">January</option>
            <option value="February">February</option>
            <option value="March">March</option>
            <option value="April">April</option>
            <option value="May">May</option>
            <option value="June">June</option>
            <option value="July">July</option>
            <option value="August">August</option>
            <option value="September">September</option>
            <option value="October">October</option>
            <option value="November">November</option>
            <option value="December">December</option>
            {/* Add other months as needed */}
          </Select>
          <Button
            color='success'
            size='s'
            className="px-4 py-2 bg-green-500 hover:bg-blue-800 text-white rounded-md"
            onClick={handleSearch}
          >
            Search
          </Button>
          <Button
            color='warning'
            size='s'
            className="px-4 py-2 bg-yellow-500 hover:bg-yellow-800 text-white rounded-md"
            onClick={clearSearch}
          >
            Clear
          </Button>
          <FaCloudDownloadAlt size={32} onClick={handleDownloadPDF} />
        </div>
      </div>

      <div className="overflow-x-auto mr-8 ml-8 mt-8 border shadow">
        <Table>
          <Table.Head>
            <Table.HeadCell>Emp Name</Table.HeadCell>
            <Table.HeadCell>Pay per Hour (R<span style={{ textTransform: 'lowercase' }}>s</span>)</Table.HeadCell>
            <Table.HeadCell>Worked Normal Hours</Table.HeadCell>
            <Table.HeadCell className="text-red-600">Total Payment for WH (R<span style={{ textTransform: 'lowercase' }}>s</span>)</Table.HeadCell>
            <Table.HeadCell>Pay per OT Hour (R<span style={{ textTransform: 'lowercase' }}>s</span>)</Table.HeadCell>
            <Table.HeadCell>OT Hours</Table.HeadCell>
            <Table.HeadCell className="text-red-600">Total Payment for OT (R<span style={{ textTransform: 'lowercase' }}>s</span>)</Table.HeadCell>
            {showExtraColumns && (
              <>
                <Table.HeadCell>Total Payment without B& (R<span style={{ textTransform: 'lowercase' }}>s</span>)</Table.HeadCell>
                <Table.HeadCell>Bonus Type</Table.HeadCell>
                <Table.HeadCell className="text-green-600">Bonuses (R<span style={{ textTransform: 'lowercase' }}>s</span>)</Table.HeadCell>
                <Table.HeadCell>Deduction Type</Table.HeadCell>
                <Table.HeadCell className="text-blue-800">Deductions (R<span style={{ textTransform: 'lowercase' }}>s</span>)</Table.HeadCell>
                <Table.HeadCell>Month</Table.HeadCell>
              </>
            )}
            <Table.HeadCell className="text-red-600">Gross Payment (R<span style={{ textTransform: 'lowercase' }}>s</span>)</Table.HeadCell>
          </Table.Head>
          <Table.Body className="divide-y">
            {currentItems.map((salary, index) => (
              <Table.Row key={index}>
                <Table.Cell>{salary.empName}</Table.Cell>
                <Table.Cell>{salary.payPerHours}</Table.Cell>
                <Table.Cell>{salary.workedHours}</Table.Cell>
                <Table.Cell>{salary.totalHourPayment}</Table.Cell>
                <Table.Cell>{salary.payPerOvertimeHour}</Table.Cell>
                <Table.Cell>{salary.othours}</Table.Cell>
                <Table.Cell>{salary.totalOvertimePayment}</Table.Cell>
                {showExtraColumns && (
                  <>
                    <Table.Cell>{salary.paymentWithoutAdditional}</Table.Cell>
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

      <div className="flex justify-center mt-4">
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
