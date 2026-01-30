const mongoose = require('mongoose')


const addresseSchema = new mongoose.Schema({
            fullname:{type:String},
            phone:{type:String},
            street:{type:String},
            city:{type:String},
            state:{type:String},
            zip:{type:String},
            country:{type:String},
          

});

const orderSchema = new mongoose.Schema({
   
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    },
    items: [
        {
            product: {
                type: mongoose.Schema.Types.ObjectId,
                required: true,
            },
            quantity: {
                type: Number,
                default: 1,
                min: 1
            },
            price: {
                amount: {
                    type: Number,
                    required: true
                },
                currency: {
                    type: String,
                    required: true,
                    enum: [ "USD", "INR" ]
                }
            }
        }
    ],
    status: {
        type: String,
        enum: [ "PENDING", "CONFIRMED", "CANCELLED", "SHIPPED", "DELIVERED" ],
    },
    totalPrice: {
        amount: {
            type: Number,
            required: true
        },
        currency: {
            type: String,
            required: true,
            enum: [ "USD", "INR" ]
        }
    },
    shippingAddress: {
        type: addresseSchema,
        required: true
    },
}, { timestamps: true });


const orderModel = mongoose.model("order",  orderSchema);

module.exports = orderModel;
   
        
    
  




