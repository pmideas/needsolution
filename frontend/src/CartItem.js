import React from "react";
import { useCartContext } from "./context/cart_context";



const CartItem =({_id,name,image,varient, price})=>{
    const {removeItem} = useCartContext();
    return (
        <>
        <div className="parent">
        <img src={image} alt={_id} width="150px"/>
        <p>name:{name}</p>
        <p>course:[{varient}]</p>
        <p>amt:{price?.[0][varient]}</p>

        <button onClick={()=>removeItem(_id)} >Delete</button>
        </div>
       
        </>
    )
}

export default CartItem;