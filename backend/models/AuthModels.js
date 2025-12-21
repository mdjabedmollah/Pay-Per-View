import mongoose from "mongoose";
const userSchema = mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    role:{
      type:String,
      enum:["buyer","seller","admin"]
    },
    isBanned:{
        type:String,
        default:0
    },
    averageRating:{
        type:Number,
        default:0
    }
})
const User=mongoose.model("User",userSchema);
export default User;