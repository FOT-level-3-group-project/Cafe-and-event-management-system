import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Link, useNavigate, useParams } from 'react-router-dom';

function EditCustomer() {
  let navigate = useNavigate();
  const { id } = useParams();

  const [user, setUser] = useState({
    cusName: "",
    cusEmail: "",
    cusTable: ""
  });

  const { cusName, cusEmail, cusTable } = user;

  const onInputChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    const loadUser = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/customers/${id}`);
        setUser(response.data);
      } catch (error) {
        console.error('Error loading user:', error);
      }
    };

    loadUser();
  }, [id]);

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:8080/api/customers/${id}`, user);
      navigate("/");
    } catch (error) {
      console.error('Error updating user:', error);
    }
  };

  return (
    <div className="controller">
      <div className='row'>
        <div className='col-md-3'></div>
        <div className='col-md-6'>
          <Form className="shadow p-3 mb-5 bg-white rounded" onSubmit={(e) => onSubmit(e)}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <h2 className='mt-2' style={{ textAlign: 'center' }}>Edit Customer Details!</h2>

              <Form.Label>Customer Name</Form.Label>
              <Form.Control type="text" name="cusName" placeholder="Enter Customer Name" value={cusName} onChange={(e) => onInputChange(e)} />

              <Form.Label>Email address</Form.Label>
              <Form.Control type="email" name="cusEmail" placeholder="Enter email" value={cusEmail} onChange={(e) => onInputChange(e)} />

              <Form.Label>Table Number</Form.Label>
              <Form.Control type="number" name="cusTable" placeholder="Enter Table Number" value={cusTable} onChange={(e) => onInputChange(e)} />
            </Form.Group>

            <div className="text-center">
              <Button variant="outline-primary" type="submit">
                Submit
              </Button>
              <Link className="btn btn-outline-danger mx-2" to="/">
                Cancel
              </Link>
            </div>

          </Form>
        </div>
      </div>
    </div>
  );
}

export default EditCustomer;
