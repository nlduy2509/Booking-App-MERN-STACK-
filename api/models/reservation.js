import mongoose from "mongoose";
const {Schema} = mongoose

const ReservationSchema = new mongoose.Schema({
    idUser:{
        type: String,
        required:true
    },
    nameReservator:{
        type: String,
        required:true
    },
    phoneReservator:{
        type: Number,
        required:true
    },
    mailReservator:String,
    idHotel:{
        type: String,
        required:true
    },
    nameHotel:{
        type: String,
        required:true
    },
    address:{
        type: String,
        required:true
    },
    idRoom:{
        type: String,
        required:true
    },
    nameRoom: {
        type: String,
        required: true,
      },
    idNumberRoom:{
        type: String,
        required:true
    },
    numberRoom: {
        type: Number,
        required: true,
      },
    price: {
        type: Number,
        required: true,
    },
    dateCheckIn:{
        type:Date,
        require:true
    },
    dateCheckOut:{
        type:Date,
        require:true
    },
    status:{
       id:Number,
       name:String   
    }
  
})

export default mongoose.model("reservation", ReservationSchema)