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

    const existingItemIndex = cart.items.findIndex(item => item.productId.toString() === productId);

    if (existingItemIndex >= 0) {
        cart.items[ existingItemIndex ].quantity += qty;
    } else {
        cart.items.push({ productId, quantity: qty });
    }

    await cart.save();

    res.status(200).json({
        message: 'Item added to cart',
        cart,
    });



}



async function updateCartController(req, res) {
    
}



module.exports = {
    getCart,
    addItemToCart,
    updateCartController
}