
const mongoose=require("mongoose");

const AssetSchema=new mongoose.Schema({
    name:String,
    category:String,
    description:String,

    totalQuantity:Number,

    availableQuantity:Number,

    status:{
        type:String,
        enum:["available","unavailable"]
    }
})

const Asset=mongoose.model('Asset',AssetSchema);

module.exports={Asset};