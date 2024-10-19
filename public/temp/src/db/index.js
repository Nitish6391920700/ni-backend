import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";

const connectDB = async () => {
    try {
      const connectionInstance = await mongoose.connect("mongodb+srv://vishesh:vishesh123@cluster0.t2mqz9e.mongodb.net/Nitish")
      console.log(`\n MongoDB connected !! DB HOST: ${connectionInstance.connection.host}`);
      
    } catch (error) {
        console.log("MONGODB connection FAILED",error);
        process.exit(1)
        
    }
    
}
 export default connectDB