const express = require('express');
const CartController = require('../controller/cart.controller');
const  authMiddleware  = require('../middleware/auth.middleware');
const  validation  = require('../middleware/validation.middleware');

const router = express.Router();


router.get('/',
    // authMiddleware([ 'user' ]),
    CartController.getCart
);

router.post(
  '/items',
  validation.validateAddItemToCart,
  authMiddleware(['user']),
  CartController.addItemToCart
);



router.patch(
    '/items/:productId',
    validation.validateUpdateCartItem,
    authMiddleware([ 'user' ]),
    CartController. updateCartController
);








module.exports = router;