
const mongoose=require("mongoose");
const {Asset}=require('./asset')
const {User}=require('./user')

const BookingSchema=new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },

    asset:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Asset"
    },

    quantity:Number,

    startDate:Date,

    endDate:Date,

    status:{
        type:String,
        enum:["issued","pending","approved","rejected","returned"],
        default:"pending"
    }
},{timestamps:true})

const Booking=mongoose.model('Booking',BookingSchema);

module.exports={Booking};