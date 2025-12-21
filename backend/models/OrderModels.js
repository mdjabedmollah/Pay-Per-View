import mongoose from "mongoose";
const orderSchema = new mongoose.Schema({
    serviceId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Service"
    },
    sellerId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
    buyerId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
    status:{
        type:String,
        enum:["Active","Completed"],
        default:"Active"
    }
},{timestamps:true})
const Order =mongoose.model("Order",orderSchema)
export default Order