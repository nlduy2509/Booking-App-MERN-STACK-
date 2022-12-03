import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import authRoute from "./routes/auth.js"
import usersRoute from "./routes/users.js"
import hotelsRoute from "./routes/hotels.js"
import roomsRoute from "./routes/rooms.js"
import reservationRoute from "./routes/reservation.js"
import cookieParser from "cookie-parser"
import cookieSession from "cookie-session";
import cors from "cors"


import passport from "passport";
import "./passport.js"

const app = express()
dotenv.config()


const connect = async () =>{
    try {
        await mongoose.connect(process.env.MONGO);
        console.log("Connected to mongoDB")
      } catch (error) {
        throw error;
      }
}

mongoose.connection.on("disconnected",()=>{
    console.log("mongoDB disconnected")
})

//middleware

app.use(cookieParser())
app.use(cookieSession({name:"session",keys:['lama'],maxAge:24*60*60*100}))
app.use(express.json())

app.use(passport.initialize())
app.use(passport.session())
app.use(cors({
  origin:"http://localhost:3000",
  methods:"GET,POST,PUT,DELETE",
  credentials:true
}))

app.use("/api/auth", authRoute)
app.use("/api/users", usersRoute)
app.use("/api/hotels", hotelsRoute)
app.use("/api/rooms", roomsRoute)
app.use("/api/reservations", reservationRoute)


app.use((err,req,res,next)=>{
  const errStatus = err.status || 500
  const errMessage = err.message || "Something went wrong"
  return res.status(errStatus).json({
    success: false,
    status: errStatus,
    message: errMessage,
    stack: err.stack,
  })
})

app.listen(8800,()=>{
    connect()
    console.log("Connected to backend!")
})