//Defining the Route
const express = require('express')
const router = express.Router();
const User = require ('../models/usermodel')
const { registerUser, loginUser } = require('../controllers/authController')

/*  
    Route and Method: [POST /api/auth/register]
    Description: Register into the System
    Access: Public
    Parameters: None
*/
router.post('/register', registerUser)

/*  
    Route and Method: [POST /api/auth/login]
    Description: Login into the System
    Access: Public
    Parameters: None
*/
router.post('/login', loginUser)



module.exports = router

