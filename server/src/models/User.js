import mongoose from "mongoose";

const userSchema = new mongoose.Schema({

    firstName:{
        type:String,
        required:true,
        trim:true
    },
    lastName:{
        type:String,
        required:true,
        trim:true,
    },
    email:{
        type:String,
        required:true,
        trim:true,
    },
    password:{
        type:String,
        required:true
    },
    url:[
        {
        type:mongoose.Schema.Types.ObjectId,
        ref:"UrlModel",
        }
        ],
    token:{
        type:String,
    },

})

const User = mongoose.model("User", userSchema);
export default User;

