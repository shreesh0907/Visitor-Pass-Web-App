const mongoose = require ('mongoose')
const Schema = mongoose.Schema

const visitorSchema = new Schema({
    name:{
        type:String,            
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    phone:{
        type:String,
        required:true
    },
    photo:{
        type:String,
        required:true
    },
    company:{
        type:String,            
        required:true
    },
    purpose:{
        type:String,            
        required:true
    }
    }, {timestamps: true})

module.exports = mongoose.model('visitor', visitorSchema)