import mongoose from "mongoose";
const connectDb = async ()=>{
    try {

        const connect = await mongoose.connect(process.env.MONGODB_URL);
        console.log ("Database Connected:" ,
                     connect.connection.host,
                     connect.connection.name);
        
    } catch (error) {
        console.log("Database Connection is Unsccessfull" , error);
        process.exit(1);
    }
}

export default connectDb;