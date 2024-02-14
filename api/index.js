import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import authRoute from "./routes/auth.js"
import hotelRoute from "./routes/hotels.js"
import roomRoute from "./routes/rooms.js"
import userRoute from "./routes/users.js"
import cookieParser from "cookie-parser";
import cors from "cors"
// const express = require("express");/
const app = express();
dotenv.config()

const connect = async ()=>{
    try {
        await mongoose.connect(process.env.MONGO);
        console.log("Connected to mongoDB");
      } catch (error) {
        handleError(error);
      }
}
mongoose.connection.on("disconnected",  ()=>{
    console.log("mongoDB disconnected!");
})

// mongoose.connection.on("connected",  ()=>{
//     console.log("mongoDB connected!");
// })
// app.use(cor())
app.use(cors())
app.use(cookieParser())
app.use(express.json())
app.use("/api/auth",authRoute)
app.use("/api/hotels",hotelRoute)
app.use("/api/rooms",roomRoute)
app.use("/api/users",userRoute)

app.use((err,req,res,next)=>{
    const errorStatus = err.status || 500
    const errorMessage = err.message || "Something went wrong"
    return res.status(errorStatus).json({
        success: false,
        status : errorStatus,
        message : errorMessage,
        stack : err.stack,
    })
})

// app.get("/",(req,res)=>{
//     res.send("first request");
// })

app.listen(8800,()=>{
    connect()
    console.log("Connected to backend!");
})