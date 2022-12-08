import mongoose from "mongoose";
const RoomSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    maxPeople: {
      type: Number,
      required: true,
    },
    numberAdult: {
      type: Number,
      required: true,
    },
    numberChild: {
      type: Number,
      required: true,
    },
    desc: {
      type: String,
      required: true,
    },
    distance: {
      type: Number,
      required: true,
    },
    numberBed: {
      type: Number,
      required: true,
    },
    featured:[
      {
        key:String,
        name:String
      }
    ],
    roomPolicy:[
      {
        key:String,
        name:String
      }
    ],
    photos:{
      type: [String],
    },
    roomNumbers: [{ number: Number, unavailableDates: {type: [Date]}}],
  },
  { timestamps: true }
);

export default mongoose.model("room", RoomSchema);
