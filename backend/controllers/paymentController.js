// // import { instance } from "../server.js";
// import Razorpay from "razorpay";

// const YOUR_KEY_ID="rzp_test_I88vvkjeW3N0fW";
// const YOUR_SECRET_KEY ="x90qM3iewd6K0twtpm1pnB2e";

// const orders =async (req,res)=>{
 
//   try {
//     let instance = new Razorpay ({key_id:YOUR_KEY_ID , key_secret:YOUR_SECRET_KEY});
//     const options = {
//       amount: req.body.totalPrice * 100,
//       currency: "INR",
//     };
//       const order = await instance.orders.create(options)
//       if (!order) return res.status(500).send('Some error occured');
//       res.send(order);

//   }
  
//     catch(err) {
//       res.status(500).send(err);
//     }
    
  
//   // res.send({orders});
// } 

// app.post('/pay-order', async (req, res) => {
//   try {
//     const { amount, razorpayPaymentId, razorpayOrderId, razorpaySignature } =
//       req.body;
//     const newOrder = Order({
//       isPaid: true,
//       amount: amount,
//       razorpay: {
//         orderId: razorpayOrderId,
//         paymentId: razorpayPaymentId,
//         signature: razorpaySignature,
//       },
//     });
//     await newOrder.save();
//     res.send({
//       msg: 'Payment was successfull',
//     });
//   } catch (error) {
//     console.log(error);
//     res.status(500).send(error);
//   }
// });

// //  const verify =(req,res)=>{
// //   res.send({verify});
// // } 

// export default orders;




