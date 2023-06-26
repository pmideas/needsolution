import express from 'express';
import Product from '../models/productModel.js';
const productRouter = express.Router();


productRouter.get('/', async(req,res)=>{
    const products = await Product.find();
    res.send(products);
    // res.send({createProducts,createUsers});
});

productRouter.get('/:slug', async(req, res) => {
    const product =  await Product.findOne({slug:req.params.slug});
    if (product) {
      res.status(200).send(product);
    } else {
      res.status(404).send({ message: 'Product Not Found' });
    }
  });

  export default productRouter;