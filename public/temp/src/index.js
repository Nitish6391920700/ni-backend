
import dotenv from "dotenv"

// import mongoose from "mongoose";
// import { DB_NAME } from "./constants";
import connectDB from "./db/index.js";
// import {app} from './app.js'
import app from './app.js'
dotenv.config({

    path: './.env'
    // path: './.env'
})

connectDB()
.then(() => {
    app.listen(3000, () =>{
        console.log(process.env.PORT);
        console.log(` Server is running at port : ${process.env.PORT}`);
        
    } )
})
.catch((err) => {
    console.log("MONGO db connection failed !!!",err);
    
})

 