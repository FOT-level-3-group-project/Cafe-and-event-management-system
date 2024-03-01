import React, { useState } from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import '../../styles/Attendance.css';


const Attendance = () => {
  const [formData, setFormData] = useState({
    name: '',
    position: '',
    date: '',
    status: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add your form submission logic here
    console.log('Form submitted:', formData);
  };

  return (
    <Container className="container">
      <Row className="justify-content-md-center">
        <Col md={6}>
          <div className="form-container">
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
                  <option value="active">Present</option>
                  <option value="inactive">Absent</option>
                </Form.Control>
              </Form.Group>

              <Button variant="primary" style={{ display: 'block', margin: '0 auto' }} type="submit">
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
