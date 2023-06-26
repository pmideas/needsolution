import React, {  useEffect, useState } from 'react';

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';

import CheckoutSteps from './CheckoutSteps';
import { useCartContext } from './context/cart_context';

export default function ShippingAddressScreen() {
  const navigate = useNavigate();
  const {userInfo, shipping, shipIn} = useCartContext();



  const [shippingDetails, setShippingDetails] = useState({

    fullName: shipping.fullName || '',
    address: shipping.address || '',
    city: shipping.city || '',
    postalCode: shipping.postalCode || '',
    country: shipping.country || '',
  });

  const { fullName, address, city, postalCode, country } = shippingDetails;

  const onShippingInfoChange = (e) => {
    setShippingDetails({ ...shippingDetails, [e.target.name]: e.target.value });
  };
  useEffect(() => {
    if (!userInfo) {
      navigate('/signin?redirect=/shipping');
    }
  }, [userInfo, navigate]);


  const submitHandler = (e) => {
    e.preventDefault();

shipIn(shippingDetails);
    // localStorage.setItem("shippingAddress", JSON.stringify(shippingDetails));
    navigate('/payment');
  };
  return (
    <div>
      <CheckoutSteps step1 step2></CheckoutSteps>
      <div className="container small-container">
        <h1 className="my-3">Shipping Address</h1>
        <Form onSubmit={submitHandler}>
          <Form.Group className="mb-3" controlId="fullName">
            <Form.Label>Full Name</Form.Label>
            <Form.Control
              name="fullName"
              value={fullName}
              onChange={onShippingInfoChange}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="address">
            <Form.Label>Address</Form.Label>
            <Form.Control
              name="address"
              value={address}
              onChange={onShippingInfoChange}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="city">
            <Form.Label>City</Form.Label>
            <Form.Control
              name="city"
              value={city}
              onChange={onShippingInfoChange}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="postalCode">
            <Form.Label>Postal Code</Form.Label>
            <Form.Control
              name="postalCode"
              value={postalCode}
              onChange={onShippingInfoChange}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="country">
            <Form.Label>Country</Form.Label>
            <Form.Control
              name="country"
              value={country}
              onChange={onShippingInfoChange}
              required
            />
          </Form.Group>
          <div className="mb-3">
            <Button variant="primary" type="submit">
              Continue
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
}