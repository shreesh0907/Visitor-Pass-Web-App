//Model Schema
const mongoose = require ('mongoose')
const Schema = mongoose.Schema

const appointmentSchema = new Schema({
    visitor:{
        type: Schema.Types.ObjectId,
        ref: 'visitor',
        required:true
    },
    host:{
        type: Schema.Types.ObjectId,
        ref: 'user',
        required:true,
    },
    visitDate:{
        type:Date,
        required:true
    },
    purpose:{
        type:String,
        required:true
    },
    status:{
        type:String,
          enum:['pending','approved','rejected'],
        default:'pending'
    }
    }, {timestamps: true})
module.exports = mongoose.model('appointment', appointmentSchema)