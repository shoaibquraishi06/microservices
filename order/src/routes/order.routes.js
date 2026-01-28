const express = require('express');
const  createAuthMiddleware  = require("../middleware/auth.middleware")
const orderController = require('../controllers/order.controller')
const validation = require('../middleware/validator.middleware')

const router = express.Router();

// Example route handler (replace with actual controller)
router.post("/", createAuthMiddleware([ "user" ]), validation.createOrderValidation, orderController.createOrder );


router.get("/me", createAuthMiddleware([ "user" ]), orderController.getOrder );


router.post("/:id/cancel", createAuthMiddleware([ "user" ]), orderController.cancelOrderById)

router.patch("/:id/address", createAuthMiddleware([ "user" ]), validation.updateAddressValidation, orderController.updateOrderAddress)

router.get("/:id",createAuthMiddleware([ "user" ]), orderController.getOrderById)



module.exports = router;