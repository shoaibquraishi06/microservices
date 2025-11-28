const express = require('express');
const validators = require('../middleware/validator.middleware');
const authController =require('../controller/auth.controller')
const authMiddleware = require('../middleware/auth.middleware');
const router = express.Router();

// POST /auth/register
router.post('/register', validators.registerUserValidations, authController.registerUser);

// POST /auth/login
router.post('/login', validators.loginValidations, authController.loginUser);

router.get('/me', authMiddleware.authMiddleware, authController.getCurrentUser);

router.post('/logout', authMiddleware.authMiddleware, authController.logoutUser);

router.get('/getUserAddress', authMiddleware.authMiddleware, authController.getUserAddress);

router.post('/user/me/address', validators.addressValidation, authMiddleware.authMiddleware, authController.addUserAddress);

router.delete('/user/me/address/:addressId', authMiddleware.authMiddleware, authController. deleteUserAddress);

module.exports = router;
