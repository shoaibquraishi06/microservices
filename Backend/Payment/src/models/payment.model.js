const mongoose = require('mongoose');

const paymentSchema =  new mongoose.Schema({
 
   
    // Your Order Service MongoDB Order ID
    order: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },

    // Razorpay Order ID
    razorpayOrderId: {
      type: String,
      required: true,
    },

    // Razorpay Payment ID
    paymentId: {
      type: String,
      default: null,
    },

    // Razorpay Signature
    signature: {
      type: String,
      default: null,
    },

    // Payment Status
    status: {
      type: String,
      enum: ["PENDING", "COMPLETED", "FAILED"],
      default: "PENDING",
    },

    // User ID
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },

    // Payment Amount
    price: {
      amount: {
        type: Number,
        required: true,
      },

      currency: {
        type: String,
        enum: ["INR", "USD"],
        default: "INR",
        required: true,
      },
    },
  },
  {
    timestamps: true,
  }
);

const paymentModel = mongoose.model('Payment', paymentSchema);

module.exports = paymentModel;