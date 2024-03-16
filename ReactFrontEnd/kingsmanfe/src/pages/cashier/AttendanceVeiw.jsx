import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Table from 'react-bootstrap/Table';
import { Button } from 'react-bootstrap';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { Link } from 'react-router-dom';

// import '../../styles/AttendanceVeiw.css';

const AttendanceView = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    try {
      const response = await axios.get('http://localhost:8080/attendanceView');
      setUsers(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const generatePDF = () => {
    const pdf = new jsPDF();
    pdf.autoTable({ html: '#attendanceTable' });
    pdf.save('attendance_report.pdf');
  };

  return (
    <div>
      <div className="btn-container">
        <Link className="btn btn-outline-danger mx-2 btn-add" to="/attendance">
          Add
        </Link>
        <Button variant="primary" onClick={generatePDF}>
          Download PDF
        </Button>
      </div>
      <div className="Table-container">
        <Table id="attendanceTable" striped bordered hover className="Table striped bordered hover shadow border TableWithScrollBar">
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Date</th>
              <th>Position</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={index}>
                <th scope="row">{index + 1}</th>
                <td>{user.name}</td>
                <td>{user.date}</td>
                <td>{user.position}</td>
                <td>{user.status}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </div>
  );
};

export default AttendanceView;
