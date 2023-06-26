const cartReducer =(state, action)=>{
    if(action.type === "ADD_TO_CART"){
        let {_id,varient,price, product} = action.payload;
        console.log("reducerCart", product);

let cartProduct

 cartProduct ={
    _id: _id,
    name: product.name,
    image:product.image,
    varient:varient,
    price: product.price,
    prices: product.price[0][varient],
}
// console.log ("state cart ",...state.cart)

return{   
...state,
cart:[...state.cart, cartProduct],
};
}


if(action.type==="REMOVE_ITEM"){
let updateCart = state.cart.filter((curItem)=> curItem._id !== action.payload
 );

 return {
    ...state,
    cart:updateCart,
 }
    }


if(action.type === "CLEAR_CART"){
    return {
        ...state,
        cart: [],
    }
}


// const cartReducer =(state={cart:[]} , action)=>{
//     if(action.type === "ADD_TO_CART"){
//         let {_id,varient,price, product} = action.payload;
//         console.log("reducerCart", product);

//         let existingProduct = state.cart || [].find((curItem) =>  curItem._id === product._id);
// console.log("existing product" , existingProduct);


// let cartProduct ={
//     _id: _id,
//     name: product.name,
//     image:product.image,
//     varient:varient,
//     price: product.price,
//     prices : product.price[0][varient],
// }

// if(existingProduct){
// return {state};
// } else {
   
//  return {
//       ...state,
//       cart: [...state.cart, cartProduct]
//     };
  
// }

// }





if(action.type === "TOTAL_CART_PRICE"){
    let {total_item ,total_price}= state.cart.reduce(
  
        (accum, curElem)=>{
            console.log("cart", curElem);
let {prices,name} = curElem;
accum.total_item += name.split(" ").length;
accum.total_price += prices;
return accum;
        },
        {
            total_item:0,
            total_price:0,
        }
    );
    return{
        ...state,
        total_item,
        total_price,
    };
}



// if(action.type === "USER_SIGNOUT"){


// return {
//     ...state,
//     userInfo: null,
  
// }

// }


if (action.type === "USER_SIGNIN"){
    return{
        ...state,
        userInfo:action.payload,
        // cart:[...state.cart],
        // shipping: action.payload,
    }
}

if(action.type === "USER_SIGNOUT"){
return {
    ...state,
    userInfo: null,
    cart: [],
    shipping: {},
    pay : '',
}

}

if(action.type === "SHIPPING_ADDRESS") {
//   let {}
      return {
        ...state,
    cart:[...state.cart],
        shipping: action.payload,
}
}


if(action.type === "SAVE_PAYMENT"){
    return{
        ...state,
        cart:[...state.cart],
        pay: action.payload,
    }
}

if(action.type === "CREATE_REQUEST"){
    return{
...state,
loading:true,
    }
}
if(action.type === "CREATE_SUCCESS"){
    return{
        ...state,
        loading:false, 
    }
}
if(action.type === "CREATE_FAIL"){
    return{
        ...state,
        loading:false,
    }
}
if(action.type === "CART_CLEAR"){
    return {
        ...state,
        cart: [],
    }
}

// CART_CLEAR


if(action.type === "FETCH_REQUEST"){
    return{
        ...state,
        loads: true, 
        error: '',
    }
}
if(action.type === "FETCH_SUCCESS"){
    return{
        ...state,
         loads: false,
          order: action.payload,
           error: '', 
    }
}
if(action.type === "FETCH_FAIL"){
    return{
        ...state, 
        loads: false, 
        error: action.payload,
    }
}

// if(action.type === "PAY_REQUEST") {
//     return {
//         ...state, 
//         loadingPay: true
//     }
// } 

// if(action.type === "PAY_SUCCESS") {
//     return {
//         ...state, loadingPay: false, successPay: true 
//     }
// } 

// if(action.type === "PAY_FAIL") {
//     return {
//         ...state, loadingPay: false 
//     }
// } 

// if(action.type === "PAY_RESET") {
//     return { ...state, loadingPay: false, successPay: false };
// } 

if(action.type ==='SET_ORDER_ID')
      return {
        ...state,
        orderId: action.payload,
      };

  if  (action.type ===  'SET_PAYMENT_STATUS')
      return {
        ...state,
        paymentStatus: action.payload,
      };
      if  (action.type ===  'SET_PAYMENT_FAILED')
      return {
        ...state,
        paymentStatus: action.payload,
      };


return state;
}






export default cartReducer;