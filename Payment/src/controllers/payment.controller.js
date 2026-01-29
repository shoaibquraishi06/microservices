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
   
      const token = req.cookies?.token || req.headers?.authorization?.split(' ')[ 1 ];
     console.log("token3:", token);
    
    try {

        const orderId = req.params.orderId;

        const orderResponse = await axios.get("http://localhost:3003/api/orders/" + orderId, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
  
                  const price = orderResponse.data.order.totalPrice;

         console.log(price);



      }catch(err){
        console.log(err);
      }
    }


        // const order = await razorpay.orders.create(price);

        // const payment = await paymentModel.create({
  
        //      order:orderId,
        //      orderId: order.id,
        //      price: {
        //         amount:order.amount,
        //         currency: order.currency
        //      }
        // })


        //     await publishToQueue("PAYMENT_SELLER_DASHBOARD.PAYMENT_CREATED", payment)
        // await publishToQueue("PAYMENT_NOTIFICATION.PAYMENT_INITIATED", {
        //     email: req.user.email,
        //     orderId: orderId,
        //     amount: price.amount / 100,
        //     currency: price.currency,
        //     username: req.user.username,
        // })


        //      return res.status(201).json({message: 'Payment Created Successfully', payment});

//     }catch(err){
//         console.log(err);
        
//         return res.status(500).json({message: 'Internal Server Error'});
//     }



// }

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

    
     await publishToQueue("PAYMENT_NOTIFICATION.PAYMENT_COMPLETED",
            {
                email: req.user.email,
                orderId: payment.order,
                paymentId: payment.paymentId,
                amount: payment.price.amount / 100,
                currency: payment.price.currency,
                fullName: req.user.fullName
            }
        )


        await publishToQueue("PAYMENT_SELLER_DASHBOARD.PAYMENT_UPDATED", payment)


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

