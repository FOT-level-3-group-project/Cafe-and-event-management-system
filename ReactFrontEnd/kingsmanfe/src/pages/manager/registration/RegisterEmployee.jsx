import React, { useState } from 'react';
import { Button, Container, Card, Form, Row, Col, Alert } from 'react-bootstrap';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import DatePicker from 'react-datepicker'; 
import 'react-datepicker/dist/react-datepicker.css'; 
import './RegisterEmployee.css';

function RegisterEmployee() {
    const [formData, setFormData] = useState({
        first_name: '',
        last_name: '',
        username: '',
        password: '',
        position: '',
        contact_number: '',
        email: '',
        address: '',
        gender: '',
        IDNumber: '',
        joined_date: new Date(),
        uniform_size: '',
        emergency_contact: ''
    });
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');
    const [validationErrors, setValidationErrors] = useState({}); 
    
    const navigate = useNavigate();

    const handleResetForm = () => {
        setFormData({
                first_name: '',
                last_name: '',
                username: '',
                password: '',
                position: '',
                contact_number: '',
                email: '',
                address: '',
                gender: '',
                IDNumber: '',
                joined_date: '',
                uniform_size: '',
                emergency_contact: '',
                setShowPassword: false,
                setShowConfirmPassword: false
            }); 
            setError('');

};

const handleChange = (e) => {
    const { name, value } = e.target;
    let errorMessage = '';

    if (name === 'contact_number' || name === 'emergency_contact') {
            if (!/^\d+$/.test(value)) {
                setError('Please enter only numbers for mobile number');
            }
        } else if (name === 'first_name' || name === 'last_name') {
            if (!/^[a-zA-Z]+$/.test(value)) {
                setError('Please enter only letters for first name and last name');
            }
        }

    setFormData({
        ...formData,
        [name]: value,
        error: errorMessage 
    });

     setValidationErrors({
            ...validationErrors,
            [name]: errorMessage
        });
};

    const handleDateChange = (date) => {
    setFormData({
        ...formData,
        joined_date: date,
    });
};

    const handleSubmit = async (e) => {
        e.preventDefault();
       handleResetForm();
       setError('Registered successfully!');

        try {
            const response = await axios.post('http://localhost:8080/register', formData);
            console.log(response.data);
            setError('Registered successfully!');

        } catch (error) {
            setError('Username is already taken');
        }
    };

    const genderOptions = ["Male", "Female", "Other"];
    const uniformSizeOptions = ["Estra Small", "Small", "Medium", "Large", "Extra Large"];
    const positionOptions = ["Cashier", "Chef", "Waiter"];

    return (
        <Container id="maincontainer">
            <Row className="justify-content-md-center">
                <Col xs={12} md={6} id="col">
                    <Card>
                        <Card.Body>
                            <h1 id="registerHeading">Employee Registration</h1> <hr></hr>
                            {error && <Alert variant="danger">{error}</Alert>}
                            <Form onSubmit={handleSubmit}>
                                <Row>
                                    <Col md={6}>
                                        <Form.Group>
                                            <Form.Label>First Name</Form.Label>
                                            <Form.Control type="text" name="first_name" value={formData.first_name} onChange={handleChange} required />
                                        </Form.Group>
                                    </Col>
                                    <Col md={6}>
                                        <Form.Group>
                                            <Form.Label>Last Name</Form.Label>
                                            <Form.Control type="text" name="last_name" value={formData.last_name} onChange={handleChange} required />
                                        </Form.Group>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col md={6}>
                                        <Form.Group>
                                            <Form.Label>Username</Form.Label>
                                            <Form.Control type="text" name="username" value={formData.username} onChange={handleChange} required />
                                        </Form.Group>
                                    </Col>
                                    <Col md={6}>
                                        <Form.Group>
                                            <Form.Label>Position</Form.Label>
                                            <Form.Control as="select" name="position" value={formData.position} onChange={handleChange} required>
                                                <option value="">Position</option>
                                                {positionOptions.map((option, index) => (
                                                    <option key={index} value={option}>{option}</option>
                                                ))}
                                            </Form.Control>
                                        </Form.Group>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col md={6}>
                                        <Form.Group>
                                            <Form.Label>Contact Number</Form.Label>
                                            <Form.Control type="text" name="contact_number" value={formData.contact_number} onChange={handleChange} required />
                                        </Form.Group>
                                    </Col>
                                    <Col md={6}>
                                        <Form.Group>
                                            <Form.Label>Email</Form.Label>
                                            <Form.Control type="email" name="email" value={formData.email} pattern="[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}" onChange={handleChange} required />
                                            {formData.email.length > 0 && !formData.email.match("[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}") && (
                                                <Form.Text className="text-danger">Please enter a valid email address</Form.Text>
                                            )}
                                        </Form.Group>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col md={6}>
                                        <Form.Group>
                                            <Form.Label>Address</Form.Label>
                                            <Form.Control type="text" name="address" value={formData.address} onChange={handleChange} required />
                                        </Form.Group>
                                    </Col>
                                    <Col md={6}>
                                        <Form.Group>
                                            <Form.Label>Gender</Form.Label>
                                            <Form.Control as="select" name="gender" value={formData.gender} onChange={handleChange} required>
                                                <option value="">Select Gender</option>
                                                {genderOptions.map((option, index) => (
                                                    <option key={index} value={option}>{option}</option>
                                                ))}
                                            </Form.Control>
                                        </Form.Group>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col md={6}>
                                        <Form.Group>
                                            <Form.Label>ID Number</Form.Label>
                                            <Form.Control type="text" name="IDNumber" value={formData.IDNumber} onChange={handleChange} required />
                                        </Form.Group>
                                    </Col>
                                    <Col md={6}>
                                         <Form.Group>
                                            <Form.Label>Joined Date</Form.Label>
                                            <DatePicker
                                                selected={formData.joined_date}
                                                onChange={handleDateChange}
                                                name="joined_date"
                                                dateFormat="yyyy/MM/dd"
                                                className="form-control"
                                            />
                                        </Form.Group>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col md={6}>
                                        <Form.Group>
                                            <Form.Label>Uniform Size</Form.Label>
                                            <Form.Control as="select" name="uniform_size" value={formData.uniform_size} onChange={handleChange}>
                                                <option value="">Select Uniform Size</option>
                                                {uniformSizeOptions.map((option, index) => (
                                                    <option key={index} value={option}>{option}</option>
                                                ))}
                                            </Form.Control>
                                        </Form.Group>
                                    </Col>
                                    <Col md={6}>
                                        <Form.Group>
                                            <Form.Label>Emergency Contact</Form.Label>
                                            <Form.Control type="text" name="emergency_contact" value={formData.emergency_contact} onChange={handleChange} required />
                                        </Form.Group>
                                    </Col>
                                </Row>
                                <Row>   
                                <Col md={6}>
                                        <Form.Group>
                                            <Form.Label>Password</Form.Label>
                                            <Form.Control type={showPassword ? "text" : "password"} name="password" value={formData.password} onChange={handleChange} required />
                                            <Form.Check type="checkbox" name="Show Password" onClick={() => setShowPassword(!showPassword)} />
                                        </Form.Group>
                                    </Col>
                                </Row>
                                <div className="d-flex justify-content-between align-items-center">
                                    <Button type="button" id="clearbtn" onClick={handleResetForm}> Clear </Button>
                                    <Button variant="primary" type="submit" id="submitbtn"> Register </Button>
                                </div>
                            </Form> <hr></hr>
                             <Link id = "link" to="http://localhost:3000/manager-sidebar/dashboard">Go Back</Link>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>

    ); 
}


export default RegisterEmployee;
