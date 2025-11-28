const express = require('express');
// const createAuthMiddleware = require('../middleware/auth.middleware');
const paymentController = require('../controllers/payment.controller');




const router = express.Router();


router.post("/create/:orderId", paymentController.createPayment)

router.get('/verify',  paymentController.verifyPayment);






module.exports = router;