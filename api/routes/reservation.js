import express from "express"
import { getAllReservation, createReservation, updatedReservation,getMyReserve} from "../controllers/reservation.js";
import { verifyAdmin,verifyUser } from "../utils/verifyToken.js";

const router = express.Router();


//UPDATE
router.put("/:id", updatedReservation)
//DELETE
//router.delete("/:id",verifyUser, deleteUser)
//POST
router.post("/create/:id",verifyUser, createReservation)
//GETALL
router.get("/:id", getMyReserve)
router.get("/",verifyAdmin, getAllReservation)

export default router