const mongoose = require("mongoose");

const assetSchema = new mongoose.Schema(
{
    name:{
        type:String,
        required:true
    },

    category:{
        type:String,
        required:true
    },

    description:{
        type:String,
        default:""
    },

    totalQuantity:{
        type:Number,
        required:true,
        min:0
    },

    availableQuantity:{
        type:Number,
        required:true,
        min:0
    },

    status:{
        type:String,
        enum:["Available","Limited","Out of Stock"],
        default:"Available"
    }
},
{
    timestamps:true
}
);

module.exports = mongoose.model("Asset",assetSchema);