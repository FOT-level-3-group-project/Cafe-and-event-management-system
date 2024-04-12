import React, { useState, useRef } from "react";
import { Table, Button, Modal, TextInput, Label, Pagination } from "flowbite-react";
import { FaUserEdit } from "react-icons/fa"; // Importing user edit icon

function AttendanceFrManager() {
  const [attendance, setAttendance] = useState([
    { id: 1, firstName: "John", lastName: "Doe", position: "Manager", date: "30-03-2024", status: "present", action: <Button style={{ backgroundColor: "blue", color: "white", outline: "none" }}><FaUserEdit style={{ fontSize: "25px" }} className="w-4 h-4" /></Button>},
    { id: 2, firstName: "Jane", lastName: "Smith", position: "Server", date: "30-03-2024", status: "absent", action: <Button style={{ backgroundColor: "blue", color: "white", outline: "none" }}><FaUserEdit style={{ fontSize: "25px" }} className="w-4 h-4" /></Button>},
    { id: 3, firstName: "Alice", lastName: "Johnson", position: "Manager", date: "30-03-2024", status: "present", action: <Button style={{ backgroundColor: "blue", color: "white", outline: "none" }}><FaUserEdit style={{ fontSize: "25px" }} className="w-4 h-4" /></Button>},
    { id: 4, firstName: "Alice", lastName: "Johnson", position: "Manager", date: "30-03-2024", status: "present", action: <Button style={{ backgroundColor: "blue", color: "white", outline: "none" }}><FaUserEdit style={{ fontSize: "25px" }} className="w-4 h-4" /></Button>},
    { id: 5, firstName: "Alice", lastName: "Johnson", position: "Manager", date: "30-03-2024", status: "half day", action: <Button style={{ backgroundColor: "blue", color: "white", outline: "none" }}><FaUserEdit style={{ fontSize: "25px" }} className="w-4 h-4" /></Button>},
    { id: 6, firstName: "Alice", lastName: "Johnson", position: "Manager", date: "30-03-2024", status: "half day", action: <Button style={{ backgroundColor: "blue", color: "white", outline: "none" }}><FaUserEdit style={{ fontSize: "25px" }} className="w-4 h-4" /></Button>},
    { id: 7, firstName: "Alice", lastName: "Johnson", position: "Manager", date: "30-03-2024", status: "present", action: <Button style={{ backgroundColor: "blue", color: "white", outline: "none" }}><FaUserEdit style={{ fontSize: "25px" }} className="w-4 h-4" /></Button>},
    { id: 8, firstName: "Alice", lastName: "Johnson", position: "Manager", date: "30-03-2024", status: "present", action: <Button style={{ backgroundColor: "blue", color: "white", outline: "none" }}><FaUserEdit style={{ fontSize: "25px" }} className="w-4 h-4" /></Button>},

  ]);

  const [showModal, setShowModal] = useState(false);
  const emailInputRef = useRef(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6; // Number of items to display per page

  // Function to set color based on status
  const getStatusColor = (status) => {
    switch (status) {
      case "present":
        return "green";
      case "absent":
        return "red";
      case "half day":
        return "orange";
      default:
        return "white";
    }
  };

  // Calculate indexes for pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = attendance.slice(indexOfFirstItem, indexOfLastItem);

  // Change page
  const onPageChange = (page) => setCurrentPage(page);

  return (
    <div className="flex flex-col mt-4 p-10 ">
      <div className="flex items-center justify-between border-b pb-2">
        <div className="flex gap-4">
          <div>
            <label htmlFor="attendanceType" className="text-lg font-semibold">Name: </label>
            <select id="attendanceType" name="attendanceType" className="p-2 border border-gray-300 rounded-md w-40">
              <option value="select">-- Select --</option>
              <option value="view">M.W.D.Piyath</option>
              <option value="edit">G.H.K.Sudath</option>
              {/* Add more options as needed */}
            </select>
          </div>
          <div>
            <label htmlFor="department" className="text-lg font-semibold">Type: </label>
            <select id="department" name="department" className="p-2 border border-gray-300 rounded-md w-40">
              <option value="select">-- Select --</option>
              <option value="management">Today</option>
              <option value="staff" onClick={() => setShowModal(true)}>This Month</option>
              {/* Add more options as needed */}
            </select>
          </div>
          <button className="px-4 py-2 bg-blue-600 hover:bg-blue-800 text-white rounded-md">Submit</button>
        </div>
        <div className="flex gap-4">
          <button className="px-4 py-2 bg-blue-600 hover:bg-blue-800 text-white rounded-md">Today</button>
          <button className="px-4 py-2 bg-blue-600 hover:bg-blue-800 text-white rounded-md">This Month</button>
          <button className="px-4 py-2 bg-blue-600 hover:bg-blue-800 text-white rounded-md"  onClick={() => setShowModal(true)}>By Date Range</button>
        </div>
      </div>
      
      <div>
        <Table hoverable className="my-5 ">
          <Table.Head>
            <Table.HeadCell>#</Table.HeadCell>
            <Table.HeadCell>First Name</Table.HeadCell>
            <Table.HeadCell>Last Name</Table.HeadCell>
            <Table.HeadCell>Position</Table.HeadCell>
            <Table.HeadCell>Date</Table.HeadCell>
            <Table.HeadCell>Status</Table.HeadCell>
            <Table.HeadCell>Action</Table.HeadCell>
          </Table.Head>
          <Table.Body className="divide-y">
            {currentItems.map((employee, index) => (
              <Table.Row 
                key={employee.id} 
                className="bg-slate-900 hover:bg-emerald-400"
              >
                <Table.Cell className="text-white">{indexOfFirstItem + index + 1}</Table.Cell>
                <Table.Cell className="text-white">{employee.firstName}</Table.Cell>
                <Table.Cell className="text-white">{employee.lastName}</Table.Cell>
                <Table.Cell className="text-white">{employee.position}</Table.Cell>
                <Table.Cell className="text-white">{employee.date}</Table.Cell>
                <Table.Cell style={{ backgroundColor: getStatusColor(employee.status) }} className="text-white">{employee.status}</Table.Cell>
                <Table.Cell>{employee.action}</Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
        <div className="flex justify-center">
          <Pagination currentPage={currentPage} totalPages={Math.ceil(attendance.length / itemsPerPage)} onPageChange={onPageChange} />
        </div>
      </div>
      
      <Modal show={showModal} size="md" popup onClose={() => setShowModal(false)} initialFocus={emailInputRef}>
        <Modal.Header />
        <Modal.Body>
          <div className="space-y-6">
            <h3 className="text-xl font-medium text-gray-900 dark:text-white">Custom Date Range</h3>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="fromDate" value="From Date" />
              </div>
              <TextInput id="fromDate" ref={emailInputRef} type="date" required />
            </div>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="toDate" value="To Date" />
              </div>
              <TextInput id="toDate" type="date" required />
            </div>
            <div className="w-full">
              <Button>Submit</Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default AttendanceFrManager;




