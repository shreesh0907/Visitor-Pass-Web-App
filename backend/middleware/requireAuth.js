const jwt = require('jsonwebtoken')
const usermodel = require('../models/usermodel')
const requireAuth = async(req, res, next) => {

    //Verify Authentication
    const {authorization} = req.headers
    if(!authorization){
        return res.status(401).json({error: "Authentication Token Required"})
    }
    //Bearer abdw.wjjdwo.jjwfn
    const token = authorization.split(' ')[1]
    try {
        const {_id} = jwt.verify(token, process.env.SECRET)
        req.user = await usermodel.findById({_id}).select('_id role email')
        next()
    }
    catch (error){
        console.log (error)
        return res.status(401).json({error: "You are not Authorized"})
    }

}

module.exports = requireAuth