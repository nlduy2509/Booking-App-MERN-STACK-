import reservation from "../models/reservation.js";

export const createReservation = async(req, res, next)=>{
    const newReservation = new reservation(req.body)
    
    try{
        const saveReservation = await newReservation.save()
        res.status(200).json(saveReservation)
    }catch(err){
        next(err)
    }
}
export const updatedReservation = async (req, res, next) => {
  try {
    const updatedReservation = await reservation.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(updatedReservation);
  } catch (err) {
    next(err);
  }
};

export const getAllReservation = async (req,res,next)=>{
  try {
    const reservations = await reservation.find();
    res.status(200).json(reservations);
  } catch (err) {
    next(err);
  }
}