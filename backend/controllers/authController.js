//Import the Model and JWT
const User = require ('../models/usermodel')
const jwt = require ('jsonwebtoken')

//Create the Token
const createToken = (_id) => {
    return jwt.sign({_id}, process.env.SECRET, {expiresIn: '3d'})
}

//REGISTERING THE USER
exports.registerUser = async(req,res) => {
const {name, email, password, role} = req.body
    try {
        const user = await User.register(name, email, password, role)
        //Create a token
        const token = createToken(user._id)
        res.status(200).json({
            message: "You are successfully registered",
             _id: user._id,
            email: user.email,
            role: user.role,
            token
        })
    }
    catch(error){
        res.status(400).json({error: error.message})
    }
    
}

//USER LOGIN 
exports.loginUser = async(req,res) => {
const {email, password} = req.body
    try {
        const user = await User.login(email, password)
        //Create a token
        const token = createToken(user._id)

        res.status(200).json({
            message: "You are successfully logged in",
             _id: user._id,
            email: user.email,
            role: user.role,
            token
        })
    }
    catch(error){
        res.status(400).json({error: error.message})
    }
    
}

