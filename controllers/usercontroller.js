// bussiness logic to register...
import User from '../models/usermodel.js';
import bcrypt from "bcryptjs";
import jwt from 'jsonwebtoken';
import { verifyEmail } from "../emailVerify/verifyEmail.js";

export const register = async(req,res)=>{
    try{
        const{firstName, lastName, email, password} = req.body;
        if(!firstName || !lastName || !email || !password){
            return res.status(400).json({
                success: false,
                message: 'All fields are required'
            })
        }

        const user = await User.findOne({email})
        if(user){
            return res.status(400).json({
                success: false,
                message: 'User already exists'
            })        
        }

        // hashed a password using bcrypt
        const hashedPasswords = await bcrypt.hash(password,10);
        const newUser = await User.create({
            firstName,
            lastName,
            email,
            password: hashedPasswords
        })

        const token = jwt.sign({id: newUser._id}, process.env.SECRET_KEY, {expiresIn: '10m'})
        verifyEmail(token, email)    // send email here
        newUser.token = token 
        await newUser.save()

        return res.status(201).json({
            success: true,
            message: "User registered Successfully",
            user: newUser,
        })
    } catch(error) {
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

export const verify = async(req, res)=>{
    try{
        // passing bearers token
        const authHeader = req.headers.authorization
        if(!authHeader || !authHeader.startWith("Bearer ")){
            res.status(400).json({
                success: false,
                message: 'Authorization token is missing or invalid'
            })
        }
        const token = authHeader.split(" ")[1]    // [bearer, fchgtyurgtu]
        
        let decoded 
        try{
            decoded = jwt.verify(token, process.env.SECRET_KEY)
        } catch (error){
            if(error.name === 'TokenExpiredError'){
                return res.status(400).json({
                    success: false,
                    message: "The registration Token has expired"
                })
            }
            return res.status(400).json({
                success: false,
                message: "Token verification failed"
            })
        }

        const user = await User.findById(decoded.id)
        if(!user){
            return res.status(400).json({
                success: false,
                message: 'User not found',
            })
        }
        user.token = null
        user.isVerified = true
        await user.save()
        return res.status(200).json({
            success: true,
            message: 'Email verified successfully' 
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}