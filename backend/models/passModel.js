const mongoose = require ('mongoose')
const Schema = mongoose.Schema

const passSchema = new Schema({
    visitor:{
        type: Schema.Types.ObjectId,
        ref: 'visitor',
        required:true
    },
    appointment:{
        type: Schema.Types.ObjectId,
        ref: 'appointment',
        required:true
    },
    passNumber:{
        type: String,
        required: true,
        unique: true
    },
    qrcode:{
        type:String
    },
    issueDate:{
        type:Date,
        required:true
    },
    expiryDate:{
        type:Date,
        required:true
    },
    status:{
        type:String,
       enum: ['active', 'inside', 'completed', 'expired', 'revoked'],
        default:'active'
    }
    }, {timestamps: true})
module.exports = mongoose.model('pass', passSchema)