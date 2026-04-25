const express = require('express');
const createAuthMiddleware = require('../middleware/auth.middleware');
const authMiddleware = require("../middleware/auth.middleware")
const paymentController = require('../controllers/payment.controller');




const router = express.Router();


router.post("/create/:orderId",  createAuthMiddleware(['user']), paymentController.createPayment)

router.get('/verify', createAuthMiddleware(['user']), paymentController.verifyPayment);






module.exports = router;