const mongoose = require('mongoose')
const shortId = require('shortid')
const shortUrlSchema  = new mongoose.Schema({
    full:{
        type:String,
        required:true,   
    },
    createdAt:{
        type: Date,
        default: Date.now
    },
    short:{
        type:String,
        required:true,
        default: shortId.generate
    },
    visited:{
        type:Number,
        required:true,
        default:0
    }
})

module.exports = mongoose.model('ShortUrl', shortUrlSchema)