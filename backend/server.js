import express  from "express";
// import {data} from "./data.js";
import dotenv from 'dotenv';
import mongoose from "mongoose";
import seedRouter from "./routes/seedRoutes.js";
import productRouter from "./routes/productRoutes.js";
import userRouter from "./routes/userRoutes.js";
import orderRouter from './routes/orderRoutes.js';
import Razorpay from "razorpay";
import Order from "./models/orderModel.js";

// import Razorpay from "razorpay";
// import paymentRoute from "./routes/paymentRoutes.js";

// import orders from './controllers/paymentController.js'
import cors from "cors";

dotenv.config();
mongoose.set('strictQuery', false);
mongoose
.connect(process.env.MONGODB_URL,{useNewUrlParser: true,
  useUnifiedTopology: true,})
.then(()=>{
console.log("successfull connection")
})
.catch((err)=>{console.log(err.message)})

const app = express();
// 
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use('/api/seed', seedRouter);
app.use('/api/products', productRouter);
app.use('/api/users',userRouter)
app.use('/api/orders', orderRouter);

app.use((err,req,res,next)=>{
  res.status(500).send({message:err.message})
  })



//payment section

const Your_id = 'rzp_test_I88vvkjeW3N0fW';
const Your_secret ='x90qM3iewd6K0twtpm1pnB2e';
const razorpay = new Razorpay({
  key_id: Your_id,
  key_secret: Your_secret,
});



// Route to generate the order ID
app.post('/order', async (req, res) => {
  try {
    const { amount, currency, receipt ,id ,status,update_time} = req.body;

    const options = {
      amount,
      currency,
      receipt,
      id,
      status,
     update_time,
    };

    const order = await razorpay.orders.create(options);

    await Order.create({
      amount,
      currency,
      receipt,
      id,
      status,
     update_time,
    });

    res.json(order);
  } catch (error) {
    console.error('Error creating order:', error);
    res.status(500).json({ error: 'Failed to create order' });
  }
});

// Route to verify the payment
app.post('/verify', async (req, res) => {
  // Payment verification logic
});





const port = process.env.PORT || 5000;
app.listen(port,()=>{

console.log('server is started',port);
});