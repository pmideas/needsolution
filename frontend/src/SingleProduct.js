import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import PageNavigation from './PageNavigation';
import { useProductContext } from './context/productContext';
import AddToCart from './AddToCart';

const SingleProduct = () => {

    const { slug } = useParams([]);
    console.log("slugproduct", slug);

    const { getSingleProduct, singleProduct, isSingleLoading } = useProductContext();
    console.log("single product page", singleProduct);
    const {
       slug:alias, _id, name, category, description, image } = singleProduct;





    useEffect(() => {
        getSingleProduct(`/api/products/${slug}`);
    }, [slug])

if (isSingleLoading){
    return <div>Loading....</div>
}

    return (
        <>
        <PageNavigation title={name}/>
            <h1>SingleProduct{slug}</h1>

            <img src={image} alt={name} width="150px"/>
            <p>{name}</p>
            <p>{description}</p>
            <p>{category}</p>
<AddToCart product = {singleProduct}/>


        </>
    )
}

export default SingleProduct;