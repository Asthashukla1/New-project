const mongoose = require('mongoose');

const foodpartnerSchema = new mongoose.Schema({
    fullname: {
        type: String,
        required:true
    },
    contactName:{
        type: String,
        required:true
    },
    phone:{
        type: String,
        required:true
    },
    address:{
        type: String,
        required:true
    },
    email:{
        type:String,
        required: true,
        unique: true,
    },
    password:{
        type:String,
    }
 })
 
const foodpartnerModel = mongoose.model("foodpartner", foodpartnerSchema)
 
module.exports = foodpartnerModel;