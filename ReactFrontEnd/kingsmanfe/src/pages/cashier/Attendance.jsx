import React, { useState } from 'react';
import { Form, Button, Container, Row, Col, Alert } from 'react-bootstrap';
import axios from 'axios';
import '../../styles/Attendance.css';

const Attendance = () => {
  const [formData, setFormData] = useState({
    name: '',
    position: '',
    date: '',
    status: '',
  });

  const [successMessage, setSuccessMessage] = useState(null);
  const [warningMessage, setWarningMessage] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Reset warning message when submitting
      setWarningMessage(null);

      const response = await axios.post('http://localhost:8080/attendance', formData);

      if (response.status === 200) {
        console.log('Data saved successfully');
        // Reset the form
        setFormData({
          name: '',
          position: '',
          date: '',
          status: '',
        });
        // Show success message
        setSuccessMessage('Data successfully added');
        // Hide success message after 3 seconds
        setTimeout(() => {
          setSuccessMessage(null);
        }, 3000);
      } else if (response.status === 409) {
        // Conflict status (409) indicates a warning message from the server
        console.log('Warning:', response.data);
        setWarningMessage(response.data);
      } else {
        console.error('Failed to save data');
      }
    } catch (error) {
      console.error('Error:', error.message);
      // Handle network errors or other issues
      setWarningMessage('Failed to submit data. Please try again.');
    }
  };

  return (
    <Container className="container">
      <Row className="justify-content-md-center">
        <Col md={6}>
          <div className="form-container">
            {successMessage && <Alert variant="success">{successMessage}</Alert>}
            {warningMessage && <Alert variant="warning">{warningMessage}</Alert>}
            <Form onSubmit={handleSubmit}>
              <Form.Group controlId="formName">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter your name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                />
              </Form.Group>

              <Form.Group controlId="formPosition">
                <Form.Label>Position</Form.Label>
                <Form.Control
                  as="select"
                  name="position"
                  value={formData.position}
                  onChange={handleChange}
                >
                  <option value="">Select position</option>
                  <option value="cashier">Cashier</option>
                  <option value="chef">Chef</option>
                  <option value="helper">Helper</option>
                  <option value="waiter">Waiter</option>
                </Form.Control>
              </Form.Group>

              <Form.Group controlId="formDate">
                <Form.Label>Date</Form.Label>
                <Form.Control
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                />
              </Form.Group>

              <Form.Group controlId="formStatus">
                <Form.Label>Status</Form.Label>
                <Form.Control
                  as="select"
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                >
                  <option value="">Select status</option>
                  <option value="Present">Present</option>
                  <option value="Absent">Absent</option>
                </Form.Control>
              </Form.Group>

              <Button
                variant="primary"
                style={{ display: 'block', margin: '0 auto' }}
                type="submit"
              >
                Submit
              </Button>
            </Form>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Attendance;
