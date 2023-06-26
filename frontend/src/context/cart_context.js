import { createContext, useReducer, useContext, useEffect } from "react";
import cartReducer from "../reducer/cartReducer";
import { getError } from "../utils";

const CartContext = createContext();

const getLocalCartData = () => {
  let localCartData = localStorage.getItem("dataCart");
  if (localCartData) {
    return JSON.parse(localCartData);
  } else {
    return [];
  }

  // const parsedData = JSON.parse(localStorage.getItem("dataCart"))
  // if (!Array.isArray(parsedData)) return [];
  // return parsedData;
};



const initialState = {
  cart:getLocalCartData(),
  // cart: [],
  // cart: localStorage.getItem("dataCart")
  //   ? JSON.parse(localStorage.getItem("dataCart"))
  //   : [],
  total_item: "",
  total_price: "",
  shipping_fee: 5000,
  userInfo: localStorage.getItem("userInfo")
    ? JSON.parse(localStorage.getItem("userInfo"))
    : null,
  shipping: localStorage.getItem("shippingAddress")
    ? JSON.parse(localStorage.getItem("shippingAddress"))
    : {},
   pay: localStorage.getItem("pay")
   ? JSON.parse(localStorage.getItem("pay"))
   : "",
   loading:false,
   loads: true,
   order: {},
   error: '',
   successPay: false,
   loadingPay: false,
   orderiId: '',
   paymentStatus: '',
   
};

const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  const addToCart = (_id, varient, price, product) => {
    console.log("add to cart", _id, varient, price, product);
    dispatch({
      type: "ADD_TO_CART",
      payload: { _id, varient, price, product },
    });
  };

  useEffect(() => {
    dispatch({ type: "TOTAL_CART_PRICE"});
    localStorage.setItem("dataCart", JSON.stringify(state.cart));
  }, [state.cart]);

  const removeItem = (_id) => {
    dispatch({ type: "REMOVE_ITEM", payload: _id });
  };

  const clearCart = () => {
    dispatch({ type: "CLEAR_CART" });
  };

  // useEffect(() => {
  //   dispatch({ type: "CART_TOTAL_PRICE" });
  //   console.log("cart", state.cart);
  //   localStorage.setItem("dataCart", JSON.stringify(state.cart));
  // }, [state.cart]);

  const signIn = (data) => {
    dispatch({ type: "USER_SIGNIN", payload: data });
    localStorage.setItem("userInfo", JSON.stringify(state.userInfo));
  };

  const shipIn = ( shipy) => {
    dispatch({ type: "SHIPPING_ADDRESS", payload:shipy});
    console.log("shipping", state.shipping);
    // localStorage.setItem("shippingAddress", JSON.stringify(state.shipping))
    
  };


  const payment=(pay)=>{
    dispatch({type:"SAVE_PAYMENT",payload:pay})
    console.log("payment",pay);
  }

useEffect(()=>{
  localStorage.setItem("shippingAddress", JSON.stringify(state.shipping))
  localStorage.setItem("pay", JSON.stringify(state.pay)); 
  console.log("payment",state.pay);
 
},[state.shipping,state.pay])

  const signOut = () => {
    dispatch({ type: "USER_SIGNOUT" });
    localStorage.removeItem("userInfo");
    localStorage.removeItem("shippingAddress");
    localStorage.removeItem("pay");
  };


const orderScreen=(data)=>{
  try {
    dispatch({ type: 'FETCH_REQUEST' });
    dispatch({ type: 'FETCH_SUCCESS', payload: data });
    
  }
  catch(err){
    dispatch({ type: 'FETCH_FAIL', payload: getError(err) });
    alert(getError(err));
  }
}




// function payrequest (){
//   dispatch({ type: 'PAY_REQUEST' });
// }
// function paysuccess (data){
//   dispatch({ type: 'PAY_SUCCESS', payload: data });
// }
// function payerror (err){
//   dispatch({ type: 'PAY_FAIL', payload: getError(err) });
// }
// function payreset(){
 
//     dispatch({ type: 'PAY_RESET' });
  
// }



const  setorder =(response)=>{
 
  dispatch({ type: 'SET_ORDER_ID', payload: response });

}
const setpayment =()=>{
 
  dispatch({ type: 'SET_PAYMENT_STATUS', payload: 'success' });

}
const setfail=()=>{
 
  dispatch({ type: 'SET_PAYMENT_FAILED', payload: 'failure' });

}


const creReq=()=>{
  dispatch({ type: 'CREATE_REQUEST' });
} 
 
const creSuc=()=>{
  dispatch({ type: 'CREATE_SUCCESS' });
} 
    
const crefai=()=>{
  dispatch({ type: 'CREATE_FAIL' });
} 

const cartclr=()=>{
  dispatch({ type: 'CART_CLEAR' });
}


// }
  return (
    <CartContext.Provider
      value={{
        ...state,
        addToCart,
        removeItem,
        clearCart,
        signIn,
        signOut,
        shipIn,
        payment,
        orderScreen,
    creReq,
    creSuc,
    crefai,
    cartclr,
     setorder,
     setfail,
     setpayment,
    //  orderiId,
      }}
    >
      {children}
    </CartContext.Provider>
  );
    }  
const useCartContext = () => {
  return useContext(CartContext);
};

export { CartProvider, useCartContext };
