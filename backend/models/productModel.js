import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
    {
        name: { 
            type: String, 
            required:true, 
            unique:true
        },
        varients:[],
        price:[],
        slug: {
            type:String,
            required:true, 
            unique:true
        },
        category:{
            type:String,
            required:true
        },
        desp:{
            type:String,
            required:true
        },
        image:{
            type:String,
            required:true
        },
       
     
    },
    {
        timestamps:true,
    }
);
const Product = mongoose.model('Product',productSchema);
export default Product;