import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import keys from "../api/utils/keys.js"
import passport from "passport";

passport.use(
    new GoogleStrategy(
      {
        clientID: keys.googleClientID,
        clientSecret: keys.googleClientSecret,
        callbackURL: '/users/google/callback'
      },
      function(accessToken,refreshToken,profile,don) {
        done(null,profile)
      }
    )
  );

passport.serializeUser((user,done)=>{
    done(null,user)
})
passport.deserializeUser((user,done)=>{
    done(null,user)
})