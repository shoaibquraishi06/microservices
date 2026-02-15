const mongoose = require('mongoose');
console.log("Models:", mongoose.modelNames());
const cartSchema = new mongoose.Schema({

   user:{
    type: mongoose.Schema.Types.ObjectId,
    required: true,
   },

    items: [
        {
            productId: {
                type: mongoose.Schema.Types.ObjectId,
                required: true,
                ref: 'Product',
                
            },
            quantity: {
                type: Number,
                required: true,
                min: 1,
            },
        },
    ],



},{timestamps:true});


const CartModel = mongoose.model('Cart', cartSchema);


module.exports = CartModel;