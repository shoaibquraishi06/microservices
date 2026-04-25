const {body, validationResult} = require('express-validator');

const responseWithValidationErrors = (req, res, next) =>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
}

const registerUserValidations = [

  body('username')
  .isString()
  .notEmpty()
  .isLength({ min: 4 })
  .withMessage('Username is required'),
  body('email')
  .isEmail()
  .withMessage('Invalid email format'),
  body('password')
  .isString()
  .isLength({ min: 6 })
  .withMessage('Password must be at least 6 characters long'),
 
  body("role")
  .optional()
  .isIn(['user', 'seller'])
  .withMessage('Role must be either "user" or "seller"'),

  responseWithValidationErrors
]

const loginValidations = [
    body('username')
    .optional()
    .isString()
    .notEmpty()
    .withMessage('Email or username is required'),
    body('email')
     .optional()
    .isEmail()
    .withMessage('Invalid email format'),
    body('password')
    .isString()
    .notEmpty()
    .withMessage('Password is required'),
   
    (req, res, next) => {

        if(!req.body.email && !req.body.username) {
            return res.status(400).json({ message: 'Email or username is required' });
        }
        responseWithValidationErrors(req, res, next);
    },


    
];


const addressValidation = [
  
    body('street')
    .isString()
    .notEmpty()
    .withMessage('Street is required'),

    body('city')
    .isString()
    .notEmpty()
    .withMessage('City is required'),

    body('state')
    .isString()
    .notEmpty()
    .withMessage('State is required'),

    body('zip')
    .isString()
    .notEmpty()
    .withMessage('Zip code is required'),

    body('country')
    .isString()
    .notEmpty()
    .withMessage('Country is required'),

    body('isDefault')
    .isBoolean()
    .withMessage('isDefault must be a boolean'),

    responseWithValidationErrors
];



module.exports = {
        registerUserValidations,
        loginValidations,
        addressValidation

}