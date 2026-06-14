import passport from "passport";
import {Strategy as GoogleStrategy} from "passport-google-oauth20"
import User from "../models/usermodel.js";

// console.log(process.env.GOOGLE_CLIENT_ID);
// console.log(process.env.GOOGLE_CLIENT_SECRET);


passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:8000/auth/google/callback"
  },
  async (accessToken, refreshToken, profile, cb) => {
    try{
     let user = await User.findOne(
      { googleId: profile.id },
       {isLoggedIn: true}
      );

     if(!user){
        user = await User.create({
            googleId: profile.id,
            firstName: profile.name?.givenName,
            lastName: profile.name?.familyName,
            username: profile.displayName,
            email: profile.emails[0].value,
            avatar: profile.photos?.[0]?.value,
            isLoggedIn: true,
            isVerified: true,
        })
     }

     return cb(null, user)

    } catch(error){
        return cb(error, null)
    }
    
  }
));