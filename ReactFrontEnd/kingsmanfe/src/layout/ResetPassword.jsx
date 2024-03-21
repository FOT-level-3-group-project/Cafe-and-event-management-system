import React, { useState }from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './ResetPassword.css';
import { Button, Container, Card, Form, Row, Col, Image, Alert } from 'react-bootstrap';
import logo from '../images/logo.png';

const ResetPassword = () => {
    const [username, setUsername] = useState([]);
    const [newPassword, setNewPassword] = useState([]);
    const [confirmPassword, setConfirmPassword] = useState([]);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [error, setError] = useState('');

     const handleClearResetPwd = () => {
    setUsername('');
    setNewPassword('');
    setConfirmPassword('');
    setError('');
  };
   
    const handleSubmit = async (event) => {
       event.preventDefault();

       if (!username || !newPassword || !confirmPassword) {
            setError('Please fill in all fields.');
            return;
        }

        if (newPassword !== confirmPassword) {
            setError('Passwords do not match.');
            return;
        }

         try {
            const response = await axios.post('http://localhost:8080/resetpassword', { username, newPassword });

            if (response.status === 200) {
                alert('Password reset successfully');
                window.location.href = '/login';
            } else {
                alert('Failed to reset password');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('An error occurred, please try again later');
        }
    };

return (
  <div className="container-fluid" id="div1">
      <Card className='my-5 shadow' id="card">
          <Row className='g-0'>
            <Col md='6'>
              <Image src={logo} id="img" alt='phone' className='rounded-t-5 rounded-tr-lg-0' fluid />
            </Col>
            <Col md='6'>
              <Card.Body>
                <h2 className="text-center mt-3 mb-4" id="loginHeading">Reset Password</h2>
                <form onSubmit={handleSubmit}>
                  <Form.Group className='mb-4' controlId="formUsername"><Form.Label>Username</Form.Label>
                    <Form.Control
                      id="username"
                      type="text"
                      placeholder="Enter username"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                    />
                    </Form.Group>
                      <Form.Group className='mb-4' controlId="formPassword">
                        <Form.Label className="d-flex justify-content-between align-items-center">
                          <span>New Password</span>
                          <Form.Check 
                            type="checkbox"
                            className="ms-2"
                            id = "showNewpwd"
                            onChange={(e) => setShowNewPassword(e.target.checked)}
                          />
                        </Form.Label>
                          <Form.Control
                            id="input"
                            type={showNewPassword ? "text" : "password"}
                            placeholder="New Password"
                            value={newPassword}
                             onChange={(e) => setNewPassword(e.target.value)}
                          />

                        <Form.Label className="d-flex justify-content-between align-items-center">
                          <span>Confirm Password</span>
                            <Form.Check 
                              type="checkbox"
                              id = "showConfirmpwd"
                              className="ms-2"
                              onChange={(e) => setShowConfirmPassword(e.target.checked)}
                             />
                        </Form.Label>
                        <Form.Control
                            id="input"
                            type={showConfirmPassword ? "text" : "password"}
                            placeholder="Confrim Password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                         />            
                       </Form.Group>
                            
                        <div className="d-flex justify-content-between align-items-center">
                            <Button type="submit" id="submitbtnr" variant="primary">Sign in</Button>
                            <Button type="button" id="clearbtnr" variant="danger"  onClick={handleClearResetPwd} >Clear</Button>
                        </div>
                </form>
                        <button type='submit' id='back'><Link to='/login'>Back to Login</Link></button>
              </Card.Body>
            </Col>
          </Row>
      </Card>
  </div>
);


};

export default ResetPassword;