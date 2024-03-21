import React, { useState } from 'react';
import { Button, Container, Card, Form, Row, Col, Image, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './login.css';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleClear = () => {
    setUsername('');
    setPassword('');
    setError('');
  };

  const handleLogin = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior

    // Basic client-side validation
    if (!username && !password) {
      setError('Username and password are required.');
      return;
    }else if (!username) {
      setError('Username required.');
      return;
    }else if (!password) {
      setError('Password required.');
      return;
    }

    try {
      const response = await axios.post('http://localhost:8080/login', { username, password });

      if (response.status !== 200) {
        const errorMessage = await response.text();
        throw new Error(errorMessage);
      }

      const userRole = response.data; // Assuming the response data is the user role itself

      switch (userRole) {
        case 'manager':
          navigate('/manager-sidebar');
          break;
        case 'cashier':
          navigate('/cashier-sidebar');
          break;
        case 'chef':
          navigate('/chef-sidebar');
          break;
        case 'waiter':
          navigate('/waiter-sidebar');
          break;
        default:
          console.log('Unknown user role:', userRole);
          setError('Unknown user role');
      }
    } catch (error) {
        setError('Invalid username or password');
    }
  };

  return (
    <div className="container-fluid" id="div1">
      <Card className='my-5 shadow' id="card">
        <Row className='g-0'>
          <Col md='5'>
            <Image src='https://mdbootstrap.com/img/new/ecommerce/vertical/004.jpg' id="img" alt='phone' className='rounded-t-5 rounded-tr-lg-0' fluid />
          </Col>
          <Col md='7'>
            <Card.Body>
              <h2 className="text-center mt-3 mb-4" id="loginHeading">Sign In</h2>
              {error && <Alert variant="danger">{error}</Alert>}
              <Form onSubmit={handleLogin}>
                <Form.Group className='mb-4' controlId="formUsername">
                  <Form.Label>Username</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </Form.Group>
                <Form.Group className='mb-4' controlId="formPassword">
                  <Form.Label className="d-flex justify-content-between align-items-center">
                    <span>Password</span>
                    <Form.Check
                      type="checkbox"
                      id="showpwd"
                      className="ms-2"
                      onChange={(e) => setShowPassword(e.target.checked)}
                    />
                  </Form.Label>
                  <Form.Control
                    type={showPassword ? "text" : "password"}
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <Link to='/ResetPassword' className="forgot-pwd"> Forgot Password?</Link>
                </Form.Group>
                 <div className="d-flex justify-content-between align-items-center">
                 <Button type="button" id="clearbtn" variant="danger"  onClick={handleClear} >Clear</Button>
                  <Button type="submit" id="submitbtn" variant="primary">Sign in</Button>
                  
                </div>
              </Form>
            </Card.Body>
          </Col>
        </Row>
      </Card>
    </div>
  );
}

export default Login;
