import React from 'react';
import { NavLink } from 'react-router-dom';

const Product =(curElem) =>{
const {slug, name , image, category} = curElem;
// const [varients, SetVarients]= useState(" ");

return(
    <NavLink to={`/singleproduct/${slug}`}>
        <img src={image} alt={name} width ="150px"/>
        <p> {category}</p>
        <p>{name}</p>
        {/* <p>{price}</p> */}
    </NavLink>
)
   


}
export default Product;