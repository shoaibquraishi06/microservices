const paymentModel = require("../models/payment.model");
const axios = require("axios");

const Razorpay = require("razorpay");
const { publishToQueue } = require("../broker/broker.js");

require("dotenv").config();
const razorpay = new Razorpay({
  key_id: process.env.TEST_API_KEY,
  key_secret: process.env.TEST_SECRET_KEY,
});

// async function createPayment(req, res) {
//    const token =
//     req.cookies?.token ||
//     req.headers.authorization?.split(" ")[1];

//   console.log("🔥 CREATE PAYMENT");
//   console.log("📦 ORDER ID:", req.params.orderId);
//   console.log("🔐 TOKEN EXISTS:", !!token);

//   try {
//     const orderId = req.params.orderId;

//     if (!token) {
//       return res.status(401).json({
//         success: false,
//         message: "Payment service: token missing",
//       });
//     }

//   const orderUrl =
//   `https://microservices-2-o221.onrender.com/api/orders/${orderId}`;

// console.log("🌐 ORDER SERVICE URL:", orderUrl);
// console.log("🔐 TOKEN EXISTS:", !!token);

// const orderResponse = await axios.get(orderUrl, {
//   headers: {
//     Cookie: `token=${token}`,
//   },
// });

// console.log(
//   "✅ ORDER SERVICE RESPONSE:",
//   orderResponse.status,
//   orderResponse.data
// );

//     const totalPrice =
//       orderResponse.data.order.totalPrice;

//     const razorpayOrder =
//       await razorpay.orders.create({
//         amount: Math.round(totalPrice * 100),
//         currency: "INR",
//         receipt: `order_${orderId}`,
//       });

//     console.log(
//       "💳 RAZORPAY ORDER:",
//       razorpayOrder
//     );

//     const payment =
//       await paymentModel.create({
//         orderId,
//         order: razorpayOrder.id,
//         price: {
//           amount: razorpayOrder.amount,
//           currency: razorpayOrder.currency,
//         },
//       });

//     return res.status(201).json({
//       success: true,
//       message: "Payment Created Successfully",
//       payment,
//       order: razorpayOrder,
//       key: process.env.RAZORPAY_KEY_ID,
//     });

//   } catch (error) {
//      console.error("❌ CREATE PAYMENT ERROR");
//   console.error("STATUS:", error.response?.status);
//   console.error("DATA:", error.response?.data);
//   console.error("URL:", error.config?.url);
//   console.error("METHOD:", error.config?.method);

//   return res.status(500).json({
//     success: false,
//     message: "Internal Server Error",
//     error: error.response?.data || error.message,
//   });

//   }

// }

async function createPayment(req, res) {
  const token = req.cookies?.token || req.headers.authorization?.split(" ")[1];

  try {
    console.log("🔥 CREATE PAYMENT");

    const orderId = req.params.orderId;

    console.log("📦 ORDER ID:", orderId);
    console.log("🔐 TOKEN EXISTS:", !!token);

    if (!orderId) {
      return res.status(400).json({
        success: false,
        message: "Order ID is required",
      });
    }

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Token missing",
      });
    }

    // ==========================================
    // 1. GET ORDER FROM ORDER SERVICE
    // ==========================================

    const orderUrl = `https://microservices-2-o221.onrender.com/api/orders/${orderId}`;

    console.log("🌐 ORDER SERVICE URL:", orderUrl);

    const orderResponse = await axios.get(orderUrl, {
      headers: {
        Cookie: `token=${token}`,
      },
    });

    console.log(
      "✅ ORDER SERVICE RESPONSE:",
      orderResponse.status,
      orderResponse.data,
    );

    const orderData = orderResponse.data?.order;

    if (!orderData) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    // ==========================================
    // 2. GET TOTAL PRICE
    // ==========================================

    const totalPrice = orderData.totalPrice;

    console.log("💰 ORDER TOTAL:", totalPrice);

    if (!totalPrice?.amount) {
      return res.status(400).json({
        success: false,
        message: "Order amount not found",
      });
    }

    // ==========================================
    // 3. CONVERT RUPEES → PAISE
    // ==========================================

    const amountInPaise = Math.round(totalPrice.amount * 100);

    console.log("💰 RAZORPAY AMOUNT:", amountInPaise);

    // ==========================================
    // 4. CREATE RAZORPAY ORDER
    // ==========================================

    const razorpayOrder = await razorpay.orders.create({
      amount: amountInPaise,

      currency: totalPrice.currency || "INR",

      receipt: `order_${orderId}`,
    });

    console.log("💳 RAZORPAY ORDER CREATED:", razorpayOrder);

    // ==========================================
    // 5. SAVE PAYMENT
    // ==========================================

    const payment = await paymentModel.create({
      order: orderId,

      razorpayOrderId: razorpayOrder.id,

      user: orderData.user,

      price: {
        amount: razorpayOrder.amount,
        currency: razorpayOrder.currency,
      },

      status: "PENDING",
    });

    console.log("💾 PAYMENT SAVED:", payment);

    // ==========================================
    // 6. RESPONSE
    // ==========================================

    return res.status(201).json({
      success: true,

      message: "Payment Created Successfully",

      payment,

      order: razorpayOrder,

      key: process.env.RAZORPAY_KEY_ID,
    });
  } catch (error) {
    console.error("❌ CREATE PAYMENT ERROR");

    console.error("MESSAGE:", error.message);

    console.error("RESPONSE:", error.response?.data);

    console.error("STATUS:", error.response?.status);

    return res.status(500).json({
      success: false,

      message: "Internal Server Error",

      error: error.response?.data || error.message,
    });
  }
}

async function verifyPayment(req, res) {
  const { razorpayOrderId, paymentId, singnature } = req.body;
  //    console.log(razorpayOrderId, paymentId, singnature);
  const secret = process.env.TEST_SECRET_KEY;

  try {
    const {
      validatePaymentVerification,
    } = require("../../node_modules/razorpay/dist/utils/razorpay-utils.js");

    const isValid = validatePaymentVerification(
      {
        order_id: razorpayOrderId,
        payment_id: paymentId,
      },
      singnature,
      secret,
    );

    if (!isValid) {
      return res.status(400).json({ message: "Invalid Payment" });
    }

    const payment = await paymentModel.findOne({
      razorpayOrderId,
      status: "PENDING",
    });

    if (!payment) {
      return res.status(404).json({ message: "Payment Not Found" });
    }

    payment.paymentId = paymentId;
    payment.signature = singnature;
    payment.status = "COMPLETED";

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

    res.status(200).json({ message: "Payment Verified Successfully", payment });
  } catch (err) {
    console.log(err);
    await publishToQueue("PAYMENT_NOTIFICATION.PAYMENT_FAILED", {
      email: req.user.email,
      paymentId: paymentId,
      orderId: razorpayOrderId,
      fullName: req.user.fullName,
    });
    return res.status(500).json({ message: "Internal Server Error" });
  }
}

module.exports = {
  createPayment,
  verifyPayment,
};
