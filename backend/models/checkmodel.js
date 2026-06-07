const mongoose = require ('mongoose')
const Schema = mongoose.Schema

const checkSchema = new Schema({
    pass:{
        type: Schema.Types.ObjectId,
        ref: 'pass',
        required: true
    },
    visitor: {
        type: Schema.Types.ObjectId,
        ref: 'visitor',
        required: true
    },
    type: {
        type: String,
        enum: ['check-in', 'check-out'],
        required: true
    },
    time: {
        type: Date,
        default: Date.now
    },
    scannedBy: {
        type: Schema.Types.ObjectId,
        ref: 'user',
        required: true
    }
    }, {timestamps: true})
    
module.exports = mongoose.model('check', checkSchema)