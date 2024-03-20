import React, { useState } from 'react';
import { Button, Container, Card, Form, Row, Col, Image, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior

    // Basic client-side validation
    if (!username && !password) {
      setError('Username and password are required.');
      return;
    }

      else if (!username) {
      setError('Username required.');
      return;
    }

      else if (!password) {
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
      setError(error.message);
    }
  };

  return (
    <div className="container-fluid">
      <div className="row justify-content-center">
        <div className="col-md-9">
          <Container className='my-5' style={{ height: '400px', width: '80%' }}>
            <Card>
              <Row className='g-0 align-items-center'>
                <Col md='5'>
                  <Image src='https://mdbootstrap.com/img/new/ecommerce/vertical/004.jpg' alt='phone' className='rounded-t-5 rounded-tr-lg-0' fluid />
                </Col>
                <Col md='7'>
                  <Card.Body>
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
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                          type="password"
                          placeholder="Password"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                        />
                      </Form.Group>
                      <Button type="submit" variant="primary" className="mb-4 w-50">Sign in</Button>
                    </Form>
                  </Card.Body>
                </Col>
              </Row>
            </Card>
          </Container>
        </div>
      </div>
    </div>
  );
}

export default Login;
