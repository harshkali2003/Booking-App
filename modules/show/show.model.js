const mongoose = require("mongoose");
const ShowSchema = new mongoose.Schema({
    title : {
        type : String,
        required : true,
        trim : true,
    },
    dateTime : {
        type : Date,
        required : true,
        default : Date.now,
    },
    totalSeats : {
        type : Number,
        required : true,
        min : 1,
    },
    bookedSeats : {
        type : [Number],
        default : [],
    }
} , {timestamps : true})

module.exports = mongoose.model("Show" , ShowSchema , "Show")