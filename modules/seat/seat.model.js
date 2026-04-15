const mongoose = require("mongoose")
const seatSchema = new mongoose.Schema({
    showId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "Show",
        required : true,
    },
    seatNumber : {
        type : String,
        required : true,
    },
    price : {
        type : String,
        required : true,
        min : 0,
    },
    status : {
        type : String,
        enum : ["AVAILABLE" , "BOOKED"],
        default: "AVAILABLE",
        required : true,
    }
} , {timestamps : true})

seatSchema.index({showId : 1 , seatNumber : 1} , {unique : true})

module.exports = mongoose.model("Seats" , seatSchema , "Seats")