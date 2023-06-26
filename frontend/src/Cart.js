import React from "react";
import { useCartContext } from "./context/cart_context";
import CartItem from "./CartItem";
import { NavLink, useNavigate } from "react-router-dom";

const Cart = () => {
  const navigate = useNavigate();
  const { cart, clearCart, total_price, shipping_fee } = useCartContext();
  console.log("cart page", cart);

  console.log(useCartContext());
  if (cart.length === 0) {
    return (
      <div>
        <h3>no cart item</h3>
      </div>
    );
  }
  const checkoutHandler = () => {
    navigate("/signin?redirect=/shipping");
  };




  return (
    <>
      <h1>Cart</h1>

      {/* {Array.isArray(cart)?cart.map((curElem)=> 
{
return <CartItem key ={curElem._id} {...curElem}/>
}):null } */}

      <div>
        {cart?.map((curElem) => {
          return <CartItem key={curElem._id} {...curElem} />;
        })}
      </div>

      <hr />

      <div>
        <NavLink to="/">
          <button>continue shopping</button>
        </NavLink>
        <button onClick={clearCart}>clear Cart</button>
      </div>

      <p>total price:{total_price}</p>
      {/* <p>shipping charge:{shipping_fee}</p> */}

      {/* <p>order total :</p> */}

      {/* <p>total amt: {shipping_fee + total_price}</p> */}

      <button onClick={checkoutHandler} disabled={cart.length === 0}>
        proceed to checkout
      </button>
    </>
  );
};

export default Cart;
