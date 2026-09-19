const paymentModel = require('../models/payment.model');
const axios = require('axios');

const Razorpay = require('razorpay');
const { publishToQueue } = require("../broker/broker.js");

require('dotenv').config();
const razorpay = new Razorpay({
  key_id: process.env.TEST_API_KEY,
  key_secret: process.env.TEST_SECRET_KEY,
});



async function createPayment(req, res) {
   
      const token =
    req.cookies?.token ||
    req.headers.authorization?.split(" ")[1];

  try {

    const orderId = req.params.orderId;

    console.log("🔥 CREATE PAYMENT");
    console.log("📦 ORDER ID:", orderId);
    console.log("🔐 TOKEN EXISTS:", !!token);

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Authentication token missing",
      });
    }

    // Get order from Order Service
    const orderResponse = await axios.get(
      `https://microservices-2-0221.onrender.com/api/orders/${orderId}`,
      {
        headers: {
          Cookie: `token=${token}`,
        },
      }
    );

    console.log("📦 ORDER RESPONSE:", orderResponse.data);

    const totalPrice =
      orderResponse.data.order.totalPrice;

    console.log("💰 TOTAL PRICE:", totalPrice);

    // Create Razorpay order
    const razorpayOrder = await razorpay.orders.create({
      amount: Math.round(totalPrice * 100),
      currency: "INR",
      receipt: `order_${orderId}`,
    });

    console.log(
      "💳 RAZORPAY ORDER:",
      razorpayOrder
    );

    // Save payment
    const payment = await paymentModel.create({
      orderId,
      order: razorpayOrder.id,
      price: {
        amount: razorpayOrder.amount,
        currency: razorpayOrder.currency,
      },
    });

    console.log(
      "✅ PAYMENT CREATED:",
      payment
    );

    return res.status(201).json({
      success: true,
      message: "Payment Created Successfully",
      payment,
      order: razorpayOrder,
      key: process.env.RAZORPAY_KEY_ID,
    });

  } catch (err) {

    console.error(
      "❌ CREATE PAYMENT ERROR:",
      err.response?.data || err.message
    );

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: err.response?.data || err.message,
    });
  }


}

async function verifyPayment(req, res) {

   const  { razorpayOrderId, paymentId, singnature } = req.body;
//    console.log(razorpayOrderId, paymentId, singnature);
const secret = process.env.TEST_SECRET_KEY;

try{
    const { validatePaymentVerification} = require('../../node_modules/razorpay/dist/utils/razorpay-utils.js');

    const isValid = validatePaymentVerification({
     
        order_id: razorpayOrderId,
        payment_id: paymentId,
     },singnature, secret);

     if(!isValid){
        return res.status(400).json({message: 'Invalid Payment'});
     }

    const payment = await paymentModel.findOne({ razorpayOrderId, status: 'PENDING' });

    if(!payment){
       return res.status(404).json({message: 'Payment Not Found'});
    }

    payment.paymentId = paymentId;
    payment.signature = singnature;
    payment.status = 'COMPLETED';

    await payment.save();

    
    //  await publishToQueue("PAYMENT_NOTIFICATION.PAYMENT_COMPLETED",
    //         {
    //             email: req.user.email,
    //             orderId: payment.order,
    //             paymentId: payment.paymentId,
    //             amount: payment.price.amount / 100,
    //             currency: payment.price.currency,
    //             fullName: req.user.fullName
    //         }
    //     )


    //     await publishToQueue("PAYMENT_SELLER_DASHBOARD.PAYMENT_UPDATED", payment)


      res.status(200).json({message: 'Payment Verified Successfully', payment});


}catch(err){
    console.log(err);
        await publishToQueue("PAYMENT_NOTIFICATION.PAYMENT_FAILED",
            {
                email: req.user.email,
                paymentId: paymentId,
                orderId: razorpayOrderId,
                fullName: req.user.fullName
            }
        )
    return res.status(500).json({message: 'Internal Server Error'});
}

   


}

module.exports = {
    createPayment,
    verifyPayment,
}

