
import {OAuth2Client} from "google-auth-library"
import user from "../models/user.js";
import keys from "./keys.js";

const client = new OAuth2Client(keys.googleClientID);

export const  verify = async(req,res,next) =>{
  const ticket = await client.verifyIdToken({
      idToken: req.body.token,
      audience: keys.googleClientID, 
  });
  const payload = ticket.getPayload();
  if(payload.email_verified){
    const data = await  user.find({email:payload.email})
    if(data.length>0){
        next()
    }else{
        const newUserGoogle = new user({
            username: payload.email,
              fullName:payload.name,
              email: payload.email,
              country: "Việt Nam",
              img: payload.picture,
              city: "Việt Nam",
              phone: "",
              isAdmin: false,
        })
        
        try{
            const saveUser = await newUserGoogle.save()
            res.status(200).json(saveUser)
        }catch(err){
            next(err)
        }
        next()
    }
  }
  else{
    return next(createError(403, "email chưa xác thực"));
  }
}