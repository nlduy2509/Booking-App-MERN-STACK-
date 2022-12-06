import mongoose from "mongoose";
const {Schema} = mongoose

const HotelSchema = new mongoose.Schema({
    name:{
        type: String,
        required:true
    },
    type:{
        type: String,
        required:true
    },
    city:{
        type: String,
        required:true
    },
    distance:{
        type: Number,
    },
    address:{
        type: String,
        required:true
    },
    photos:{
        type: [String],
    },
    title:{
        type: String,
        required:true
    },
    desc:{
        type: String,
        required:true
    },
    rating:{
        type: Number,
        min: 0,
        max: 5
    },
    rooms:{
        type: [String],
    },
    minPrice:{
        type: Number,
        required:true
    },
    maxPrice:{
        type: Number,
        required:true
    },
    featured:[
        {
            key: String,
            name: String
        }
    ]
})

export default mongoose.model("hotel", HotelSchema)