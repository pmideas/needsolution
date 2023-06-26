import axios from 'axios';
import React, { useContext,useState, useEffect, useReducer } from 'react';
// import { Helmet } from 'react-helmet-async';
import { useNavigate, useParams } from 'react-router-dom';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ListGroup from 'react-bootstrap/ListGroup';
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';
import LoadingBox from './LoadingBox';
import MessageBox from './MessageBox';
// import { Store } from '../Store';
import { getError } from './utils';
import { useCartContext } from './context/cart_context';
import Button from 'react-bootstrap/esm/Button';

export default function OrderScreen() {
  
  const { userInfo,orderScreen,total_price,order,error,loads,paysuccess, payrequest,payerror, successPay,
    loadingPay, payresent, setorder,setfail,setpayment,orderiId } = useCartContext();

  const params = useParams();
  const { id: orderId } = params;
  const navigate = useNavigate();

const [pending, isPending] = useState(false)




const CreateOrderButton = () => {
  // const { state, dispatch } = useContext(AppContext);

  const createOrder = async () => {
    try { 
      const response = await axios.put(`http://localhost:5000/api/orders/${order._id}/pay`, {
        amount: 1000,
        currency: 'INR',
        receipt: 'order_receipt',
      });
   setorder(response)
    } catch (error) {
      console.error('Error creating order:', error);
    }
  };

  return (
    <button onClick={createOrder}>Create Order</button>
  );
};





    // function createOrder(data, actions) {
    //   return actions.order
    //     .create({
    //       purchase_units: [
    //         {
    //           amount: { value: order.totalPrice },
    //         },
    //       ],
    //     })
    //     .then((orderID) => {
    //       return orderID;
    //     });
    // }

    // function onApprove(data, actions) {
    //   return actions.order.capture().then(async function (details) {
    //     try {
    //      payrequest()
    //       const { data } = await axios.put(
    //         `/api/orders/${order._id}/pay`,
    //         details,
    //         {
    //           headers: { authorization: `Bearer ${userInfo.token}` },
    //         }
    //       );
    //       paysuccess(data)
    //       alert('Order is paid');
    //     } catch (err) {
    //      payerror(err)
    //      alert(getError(err));
    //     }
    //   });
    // }

    // function onError(err) {
    //   alert(getError(err));
    // }


    useEffect(() => {
      const fetchOrder = async () => {
    
        try {
         
          const { data } = await axios.get(`/api/orders/${orderId}`, {
            headers: { authorization: `Bearer ${userInfo.token}` },
          });
          orderScreen(data)
        } catch (err) {
          alert(getError(err));
        }
        
      };
  
      if (!userInfo) {
        return navigate('/login');}
        if (!order._id || successPay || (order._id && order._id !== orderId)) {
  
          fetchOrder();
          if (successPay) {
           payrequest();
          }
        }

     
      }, [order, userInfo, orderId, navigate]);

  const PayNowButton = () => {
    // const { state, dispatch } = useContext(AppContext);
    function loadScript(src) {
      return new Promise((resolve) => {
          const script = document.createElement("script");
          script.src = src;
          script.onload = () => {
              resolve(true);
          };
          script.onerror = () => {
              resolve(false);
          };
          document.body.appendChild(script);
      });
  }
   
    const handlePayment = async () => {
      const res = await loadScript(
        "https://checkout.razorpay.com/v1/checkout.js"
    );
  
    if (!res) {
        alert("Razorpay SDK failed to load. Are you online?");
        return;
    }
  
  
      const key_id = 'rzp_test_I88vvkjeW3N0fW';
  
      if (orderiId) {
        const options = {
          key: key_id  ,
          amount: 1000,
          currency: 'INR',
          name: 'Acme Corp',
          description: 'Test Payment',
          order_id: orderiId,
          handler: async function (response) {
            try {
              const { razorpay_payment_id, razorpay_order_id, razorpay_signature } = response;
  
              await axios.post('http://localhost:5000/verify', {
                razorpay_payment_id,
                razorpay_order_id,
                razorpay_signature,
              });
  
             setpayment()
            } catch (error) {
              console.error('Error verifying payment:', error);
          setfail()
            }
          },
          prefill: {
            name: 'John Doe',
            email: 'john.doe@example.com',
            contact: '9876543210',
          },
        };
  
        const razorpayInstance = new window.Razorpay(options);
        razorpayInstance.open();
      } else {
        alert('Failed to create order.');
      }
    };
  
    return (
      <button onClick={handlePayment}>Pay Now</button>
    );
  };

     
    
      

    return loads ? (
      <LoadingBox></LoadingBox>
    ) : error ? (
      <MessageBox variant="danger">{error}</MessageBox>
    ) : (
      <div>
        {/* <Helmet> */}
          <title>Order {orderId}</title>
        {/* </Helmet> */}
        <h1 className="my-3">Order {orderId}</h1>
        <Row>
          <Col md={8}>
            <Card className="mb-3">
              <Card.Body>
                <Card.Title>Shipping</Card.Title>
                <Card.Text>
                  <strong>Name:</strong> {order.shippingAddress.fullName} <br />
                  <strong>Address: </strong> {order.shippingAddress.address},
                  {order.shippingAddress.city}, {order.shippingAddress.postalCode}
                  ,{order.shippingAddress.country}
                </Card.Text>
                {order.isDelivered ? (
                  <MessageBox variant="success">
                    Delivered at {order.deliveredAt}
                  </MessageBox>
                ) : (
                  <MessageBox variant="danger">Not Delivered</MessageBox>
                )}
              </Card.Body>
            </Card>
            <Card className="mb-3">
              <Card.Body>
                <Card.Title>Payment</Card.Title>
                <Card.Text>
                  <strong>Method:</strong> {order.paymentMethod}
                </Card.Text>
                {order.isPaid ? (
                  <MessageBox variant="success">
                    Paid at {order.paidAt}
                  </MessageBox>
                ) : (
                  <MessageBox variant="danger">Not Paid</MessageBox>
                )}
              </Card.Body>
            </Card>
  
            <Card className="mb-3">
              <Card.Body>
                <Card.Title>Items</Card.Title>
                <ListGroup variant="flush">
                  {order.orderItems.map((item) => (
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
                        <p>course:{item.varient}</p>
                        </Col>
                        <Col md={3}> amt:{item.prices}</Col>
                      </Row>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4}>
            <Card className="mb-3">
              <Card.Body>
                <Card.Title>Order Summary</Card.Title>
                <ListGroup variant="flush">
             
                <ListGroup.Item>
                  <Row>
                    <Col>Shipping</Col>
                    <Col>${order.shippingPrice}</Col>
                  </Row>
                </ListGroup.Item>
             
                <ListGroup.Item>
                  <Row>
                    <Col>
                      <strong> Total Price</strong>
                    </Col>
                    <Col>
                      <strong>${order.totalPrice}</strong>
                    </Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>
                      <strong> Total Amount</strong>
                    </Col>
                    <Col>
                      <strong>${order.totalPrice + order.shippingPrice} </strong>
                    </Col>
                  </Row>
                </ListGroup.Item>

                {!order.isPaid && (
                  <ListGroup.Item>
                    {isPending ? (
                      <LoadingBox />
                    ) : (
                      <div>
                        {/* <Button */}
                         
                        
                          <CreateOrderButton />
                          <PayNowButton />
                        {/* </Button> */}
                      </div>
                    )}
                    {loadingPay && <LoadingBox></LoadingBox>}
                  </ListGroup.Item>
                )}


              </ListGroup>
            </Card.Body>
         
          </Card>
        </Col>
      </Row>
    </div>
  );
}