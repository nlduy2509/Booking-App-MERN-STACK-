import express from "express"
import { getAllReservation, createReservation, updatedReservation} from "../controllers/reservation.js";
import { verifyAdmin,verifyUser } from "../utils/verifyToken.js";

const router = express.Router();


//UPDATE
router.put("/:id", verifyUser, updatedReservation)
//DELETE
//router.delete("/:id",verifyUser, deleteUser)
//POST
router.post("/create",verifyUser, createReservation)
//GETALL
router.get("/",verifyAdmin, getAllReservation)

export default router