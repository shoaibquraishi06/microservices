const axios = require('axios');
const CartModel = require('../models/cart.model');




async function getCart(req, res) {
  
    const user = req.user;

    let cart = await CartModel.findOne({ user: user.id });

    if (!cart) {
        cart = new CartModel({ user: user.id, items: [] });
        await cart.save();
    }

    res.status(200).json({
        cart,
        totals: {
            itemCount: cart.items.length,
            totalQuantity: cart.items.reduce((sum, item) => sum + item.quantity, 0)
        }
    });

    
}
async function addItemToCart(req, res) {
   const { productId, qty } = req.body;

    const user = req.user

    let cart = await CartModel.findOne({ user: user.id });

    if (!cart) {
        cart = new CartModel({ user: user.id, items: [] });
    }

       const productResponse = await axios.get(`http://localhost:3001/api/products/${productId}`); 

      let productData = productResponse.data.data;
      console.log(productData);
      


    const existingItemIndex = cart.items.findIndex(item => item.productId.toString() === productId);

    if (existingItemIndex >= 0) {
        cart.items[ existingItemIndex ].quantity += qty;
    } else {
        cart.items.push({  productId: productId,
        title: productData.title,
        description: productData.description,
        image: productData.images?.[0]?.url,
        price: productData.price,
        quantity: Number(qty) });
    }

    await cart.save();

    res.status(200).json({
        message: 'Item added to cart',
        items: cart,
    });
}







async function updateCartController(req, res) {
    
}



module.exports = {
    getCart,
    addItemToCart,
    updateCartController
}