import mongoose  from "mongoose"; 
import {nanoid} from "nanoid";

const schema = new mongoose.Schema({
    fullUrl:{
        type:String,
        required:true
    },
    shortUrl:{
        type:String,
        required:true,
        default:()=>nanoid().substring(0 , 10),
    },
    clicks:{
        type:Number,
        default:0,
    },
},
    {
    timestamps:true,
    }
);


const UrlModel = mongoose.model("UrlModel" , schema);

export default UrlModel;