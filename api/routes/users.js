import express from "express"
import { deleteUser, getUser, getUsers, updateUser } from "../controllers/user.js";
import { verifyAdmin, verifyToken, verifyUser } from "../utils/verifyToken.js";
import passport from "passport";

const router = express.Router();
const CLIENT_URL="http://localhost:3000/"

router.get("/login/success", (req,res)=>{
    if(req.user){
        res.json(200).json({
            success:true,
            message:"successfull",
            user:req.user,
            cookie:req.cookies
        })
    }
})
router.get("/login/failed", (req,res)=>{
    res.json(401).json({
        success:false,
        message:"failure"
    })
})
router.get("/logout", (req,res)=>{
   req.logout();
   res.redirect(CLIENT_URL)
})
router.get("/google", passport.authenticate('google', {
    scope: ['profile', 'email']
  }))
router.get('/google/callback', passport.authenticate('google',{
    successRedirect:CLIENT_URL,
    failureRedirect:'/login/failed'
}));

//UPDATE
router.put("/:id", verifyUser, updateUser)
//DELETE
router.delete("/:id",verifyUser, deleteUser)
//GET
router.get("/:id",verifyUser, getUser)
//GETALL
router.get("/",verifyAdmin, getUsers)

export default router