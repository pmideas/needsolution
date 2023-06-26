import express from 'express';
import Product from '../models/productModel.js';
// import data from '../data.js';
import  {data, user}  from '../data.js';
const seedRouter = express.Router();
import User from '../models/userModel.js';

seedRouter.get('/', async(req,res)=>{
    await Product.deleteMany();
    const createdProducts = await Product.insertMany(data);
    await User.deleteMany();
    const createdUsers = await User.insertMany(user);
    res.send({ createdProducts, createdUsers });
    
    // res.send({createProducts});
    // res.send({createProducts,createUsers});
});
export default seedRouter;