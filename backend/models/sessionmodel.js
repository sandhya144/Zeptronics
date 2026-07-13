// to generate for loggedIn users 

import mongoose from "mongoose";


const sessionSchema = new mongoose.Schema({
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'  // dono ka schema use krega dono ka reduction generate krega 
    }
},{timestamps: true})

export const Session = mongoose.model('Session', sessionSchema)