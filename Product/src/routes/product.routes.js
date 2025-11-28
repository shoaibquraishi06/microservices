const express = require('express');
const multer = require('multer');
const  createAuthMiddleware  = require('../middleware//auth.middleware')
const productController= require('../controller/product.controller')
const { createProductRules, } = require('../validators/product.validator')
const Product = require('../models/product.model');


const router = express.Router();

const upload = multer({ storage: multer.memoryStorage() });

router.post('/',
	createAuthMiddleware(['admin', 'seller']),
	upload.array('image', 5),
	createProductRules,
	productController.createProduct
);

router.get('/', productController.getProduct);

router.patch('/:id', createAuthMiddleware(['seller']), productController.updateProductById);

router.delete('/:id', createAuthMiddleware(['seller']), productController.deleteProductById);

router.get('/seller', createAuthMiddleware(['seller']), productController.getProductsBySeller);

router.get('/:id', productController.getProductById);

module.exports = router;