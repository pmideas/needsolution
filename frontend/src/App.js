import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import About from "./About";
import Home from "./Home";
import Contact from "./Contact";
import Cart from "./Cart";
import SingleProduct from "./SingleProduct";
// import Error from "./Error";
import { useCartContext } from "./context/cart_context";
import Signinscreen from "./Signinscreen";
import { Nav, NavDropdown } from "react-bootstrap";
import ShippingAddressScreen from "./ShippingAddScreen";
import Signupscreen from "./Signupscreen";
import PaymentMethodScreen from "./PaymentMethodScreen";
import PlaceOrderScreen from "./PlaceOrderScreen";
import OrderScreen from './OrderScreen';
const App = () => {
  const { total_item, userInfo, signOut } = useCartContext();

  //   useEffect(()=>{
  // signOut()
  // })

  const handleLogout = () => {
    signOut();
    // localStorage.removeItem("shippingDetails");
  };
  return (
    <Router>
      <header>
        <Link to="/">amazon</Link> <br />
        <Link to="/cart">Cart {total_item} </Link>
        <Nav>
          {userInfo ? (
            <NavDropdown title={userInfo.name} id="basic-nav-dropdown">
              <Link to="/profile">
                <NavDropdown.Item>User Profile</NavDropdown.Item>
              </Link>
              <Link to="/orderhistory">
                <NavDropdown.Item>Order History</NavDropdown.Item>
              </Link>
              <NavDropdown.Divider />
              <Link
                className="dropdown-item"
                to="#signout"
                onClick={handleLogout}
              >
                Sign Out
              </Link>
            </NavDropdown>
          ) : (
            <Link className="nav-link" to="/signin">
              Sign In
            </Link>
          )}
        </Nav>
      </header>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        {/* <Route path="/products" element={<Products />} /> */}
        <Route path="/contact" element={<Contact />} />
        <Route path="/singleproduct/:slug" element={<SingleProduct />} />
        <Route path="/signin" element={<Signinscreen />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/shipping" element={<ShippingAddressScreen />} />
        <Route path="/signup" element={<Signupscreen />} />
        <Route path="/payment" element={<PaymentMethodScreen />}></Route>
        <Route path="/order/:id" element={<OrderScreen />}></Route>

        <Route path="/placeorder" element={<PlaceOrderScreen />} />
        {/* <Route path="*" element={<Error />} /> */}
      </Routes>
    </Router>
  );
};

export default App;
