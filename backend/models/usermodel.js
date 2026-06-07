const mongoose = require ('mongoose')
const bcrypt = require('bcrypt')
const validator = require ('validator')
const Schema = mongoose.Schema

const userSchema = new Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    role:{
        type:String,
        enum:['admin','security','employee'],
        required:true
    },
    }, {timestamps: true})


//Static Register Method
userSchema.statics.register = async function(name, email, password, role){
    //Error Handling in Registering
    const exists = await this.findOne({email})
    if (!name || !email || !password || !role){
        throw new Error('All fields are mandatory!')
    }
    if (!validator.isEmail(email)){
        throw new Error('Email is not valid')
    }
    if (!validator.isStrongPassword(password)){
        throw new Error('Please enter a stronger password')
    }
    if (exists){
        throw new Error('A user with this email already exists!')
    }

    //Password Encrypter
    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password, salt)

    //Saving the email and password in the database
    const user = await this.create({name, email, password: hash, role})

    //Returning the user
    return user
}

//Static Login Method
userSchema.statics.login = async function(email, password){
    //Error Handling in Login
    const user = await this.findOne({email})
    if (!email || !password){
        throw new Error('All fields are mandatory!')
    }
    if (!user){
        throw new Error('Incorrect Email ID!')
    }
    const match = await bcrypt.compare(password, user.password)
    if (!match){
        throw new Error('Incorrect Password')
    }

    //Returning the user
    return user
}

module.exports = mongoose.model('user', userSchema)
