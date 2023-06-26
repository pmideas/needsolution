import React, { useState } from 'react';
import { useCartContext } from './context/cart_context';
import { NavLink } from 'react-router-dom';
const AddToCart =({product})=>{
  const{addToCart} = useCartContext();
    const {_id,price, varients} =product;
    const [varient, setVarient]= useState('small');



    return(
        <>
 <p>Select</p>
<select value={varient} onChange={(e)=>setVarient(e.target.value)}>
       {varients?.map((varient)=>{
        console.log("varient", varient);
        return <option value={varient}>{varient}</option>
       })}
       </select>

       {/* <p>Price: {price?.[0]?.[varient]} </p>  */}


       {/* {product.varients.map((varient,idx)=>{
        return  <label> <input type="radio" key={idx}
        value ={varient}
  id={`radio-${idx}`}
  name="radio"
        onClick={(e)=> setVarient(e.target.value)}
   
        />{varient}
       </label>
       })} */}

        <p>Price: {price?.[0][varient]} </p>

        <NavLink to="/cart"  onClick={()=>addToCart(_id,varient,price,product)}>
        <button className="btn">Add To Cart</button>
      </NavLink>


        </>
    )
}
export default AddToCart;