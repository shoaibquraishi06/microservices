const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({

    user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true
  },

  items: [
    {
      productId: {
        type: String,   // 🔥 string for microservice snapshot
        required: true
      },

      title: {
        type: String
      },

      description: {
        type: String
      },

      image: {
        type: String
      },

      price: {
        amount: Number,
        currency: String
      },

      quantity: {
        type: Number,
        required: true,
        min: 1
      }
    }
  ]

}, { timestamps: true });


const CartModel = mongoose.model('Cart', cartSchema);


module.exports = CartModel;