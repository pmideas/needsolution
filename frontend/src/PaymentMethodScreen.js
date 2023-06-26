import React, {useEffect, useState } from 'react';
// import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import CheckoutSteps from './CheckoutSteps';
import { useCartContext } from './context/cart_context';
// import { Store } from '../Store';

export default function PaymentMethodScreen() {
  const navigate = useNavigate();
  const {shipping,payment,pay} = useCartContext();

  const [paymentMethodName, setPaymentMethod] = useState(
    pay || 'PayPal'
  );

  useEffect(() => {
    if (!shipping) {
      navigate('/shipping');
    }
  }, [shipping, navigate]);
  const submitHandler = (e) => {
    e.preventDefault();
    payment(paymentMethodName);
     localStorage.setItem('pay', paymentMethodName);
    navigate('/placeorder');
  };
  return (
    <div>
      <CheckoutSteps step1 step2 step3></CheckoutSteps>
      <div className="container small-container">
        {/* <Helmet> */}
          <title>Payment Method</title>
        {/* </Helmet> */}
        <h1 className="my-3">Payment Method</h1>
        <Form onSubmit={submitHandler}>
          <div className="mb-3">
            <Form.Check
              type="radio"
              id="PayPal"
              label="PayPal"
              value="PayPal"
              checked={paymentMethodName === 'PayPal'}
              onChange={(e) => setPaymentMethod(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <Form.Check
              type="radio"
              id="Stripe"
              label="Stripe"
              value="Stripe"
              checked={paymentMethodName === 'Stripe'}
              onChange={(e) => setPaymentMethod(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <Button type="submit">Continue</Button>
          </div>
        </Form>
      </div>
    </div>
  );
}