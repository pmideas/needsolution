import React, {  useEffect } from 'react';
// import { Helmet } from 'react-helmet-async';
import { Link, useNavigate } from 'react-router-dom';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import ListGroup from 'react-bootstrap/ListGroup';
import { useCartContext } from './context/cart_context';
import CheckoutSteps from './CheckoutSteps';
import LoadingBox from './LoadingBox'
import { getError } from "./utils";
import axios from 'axios';
export default function PlaceOrderScreen() {
  const navigate = useNavigate();
//   const { state, dispatch: ctxDispatch } = useContext(Store);
//   const { cart, userInfo } = state;
const {shipping,pay,loading,cart,total_price, shipping_fee,creReq,creSuc,crefai,cartclr,userInfo} = useCartContext();


  console.log("user",userInfo)

  // const placeOrderHandler = async () => {};

  const placeOrderHandler = async () => {
    try {
     creReq()

      const { data } = await axios.post('/api/orders',
        {
          orderItems: cart,
          shippingAddress: shipping,
          paymentMethod: pay,
          shippingPrice: shipping_fee,
          totalPrice: total_price,
          
        },
   
        {
          headers: {
            authorization: `Bearer ${userInfo.token}`,
          },
        }
       
    
      );
      console.log("datalog", data)
    cartclr()
    creSuc()
   
      localStorage.removeItem('dataCart');
      navigate(`/order/${data.order._id}`);
     
    } catch (err) {
     crefai()
    alert(getError(err));
    }
    // paymentAsync();
  

  };

  
  useEffect(() => {
    if (!pay) {
      navigate('/payment');
    }
  }, [navigate]);

  return (
    <div>
      <CheckoutSteps step1 step2 step3 step4></CheckoutSteps>
      {/* <Helmet> */}
        <title>Preview Order</title>
      {/* </Helmet> */}
      <h1 className="my-3">Preview Order</h1>
      <Row>
        <Col md={8}>
          <Card className="mb-3">
            <Card.Body>
              <Card.Title>Shipping</Card.Title>
              <Card.Text>
                <strong>Name:</strong> {shipping.fullName} <br />
                <strong>Address: </strong> {shipping.address},
                {shipping.city}, {shipping.postalCode},
                {shipping.country}
              </Card.Text>
              <Link to="/shipping">Edit</Link>
            </Card.Body>
          </Card>

          <Card className="mb-3">
            <Card.Body>
              <Card.Title>Payment</Card.Title>
              <Card.Text>
                <strong>Method:</strong> {pay}
              </Card.Text>
              <Link to="/payment">Edit</Link>
            </Card.Body>
          </Card>

           <Card className="mb-3">
            <Card.Body>
              <Card.Title>Items</Card.Title>
              <ListGroup variant="flush">
                {cart.map((item) => (
                  <ListGroup.Item key={item._id}>
                    <Row className="align-items-center">
                      <Col md={6}>
                        <img width="100px"
                          src={item.image}
                          alt={item.name}
                          className="img-fluid rounded img-thumbnail"
                        ></img>{' '}
                        <Link to={`/product/${item.slug}`}>{item.name}</Link>
                      </Col>
                      <Col md={3}>
                      <p>course:[{item.varient}]</p>
        <p>amt:{item.price?.[0][item.varient]}</p>

                      </Col>
                    </Row>
                  </ListGroup.Item>
                ))}
              </ListGroup>
              <Link to="/cart">Edit</Link>
            </Card.Body>
          </Card>
       
       
        </Col>
        
        <Col md={4}>
          <Card>
            <Card.Body>
              <Card.Title>Order Summary</Card.Title>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <Row>
                    <Col>total price:</Col>
                    <Col>{total_price}</Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>shipping charge:</Col>
                    <Col>{shipping_fee}</Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>total amt:</Col>
                    <Col>{shipping_fee + total_price}</Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <div className="d-grid">
                    <Button
                      type="button"
                      onClick={placeOrderHandler}
                      disabled={cart.length === 0}
                      >
                      Place Order
                    </Button>
                  </div>
                  {loading && <LoadingBox></LoadingBox>}
                </ListGroup.Item>
              </ListGroup>
            </Card.Body>
          </Card> 
        </Col>
      </Row>
    </div>
  );
}