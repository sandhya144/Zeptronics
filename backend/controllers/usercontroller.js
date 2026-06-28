// bussiness logic to register...
import User from '../models/usermodel.js';
import bcrypt from "bcryptjs";
import jwt from 'jsonwebtoken';
import { verifyEmail } from "../emailVerify/verifyEmail.js";
import { Session } from '../models/sessionmodel.js';
import { sendOTPMail } from '../emailVerify/sendOTPMail.js';


export const register = async(req, res)=>{
    try{
        // console.log("BODY =>", req.body);

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
        if(!authHeader || !authHeader.startsWith("Bearer ")){
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

export const reverify = async (req, res) => {
    try{
        const {email} = req.body;
        const user = await User.findOne({email});
        if(!user){
            return res.status(400).json({
                success: false,
                message: "User not found",
            })
        }
        const token = jwt.sign({id: User._id}, process.env.SECRET_KEY, {expiresIn: '10m'})
        verifyEmail(token, email) 
        user.token = token
        await user.save();
        return res.status(200).json({
            success: true,
            message: "Verification email sent again successfully",
            token: user.token,
        })
    } catch (error) {
          return register.status(500).json({
            success: false,
            message: error.message,
          })  
        }
}

export const login = async(req, res) => {
    try{
        const {email,password} = req.body;
        if(!email || !password){
            return res.status(400).json({
                success: false,
                message: 'All fields are required'
            })
        }
        const existingUser = await User.findOne({email})
        if(!existingUser){
            return res.status(400).json({
                success: false,
                message: "User not exists"
            })
        }
        const isPasswordValid  = await bcrypt.compare(password,existingUser.password)
        if(!isPasswordValid){
            return res.status(400).json({
                success: false,
                message: 'Invalid Credentials'
            })
        }

        if(existingUser.isVerified === false){
            return res.status(400).json({
                success: false,
                message: 'Verify your account than login'
            })
        }
        // access token and refresh token...

        // generate token 
        const accessToken = jwt.sign({id:existingUser._id}, process.env.SECRET_KEY,{expiresIn:'10d'})
        const refreshToken = jwt.sign({id:existingUser._id}, process.env.SECRET_KEY,{expiresIn:'30d'})

        existingUser.isLoggedIn = true;
        await existingUser.save()

        // delete prev session before logged in to new session of a logged in user
        // check for existing session and delete it 
        const existingSession = await Session.findOne({userId: existingUser._id})
        if(existingSession){
            await Session.deleteOne({userId: existingUser._id})
        }

        // create a new sessions 
        await Session.create({userId: existingUser._id})
        return res.status(200).json({
            success: true,
            message: `Welcome back ${existingUser.firstName}`,
            user: existingUser,
            accessToken,
            refreshToken,
        })

    } catch(error){
       res.status(500).json({
         success: false,
         message: error.message,
       }) 
    }
}


export const logout = async(req, res) => {
    try{
        const userId = req.id
        await Session.deleteMany({userId: userId})
        await User.findByIdAndUpdate(userId,{isLoggedIn: false})
        return res.status(200).json({
            success: true,
            message: 'User logged out successfully'
        })
    } catch(error){
        return res.status(500).json({
            success: false,
            message: error.message,

        })
    }
}

export const forgotPassword = async (req, res) => {
    try{
        // remove email by destructuring 
        const {email} = req.body;
        const user = await User.findOne({email})
        if(!user){
            return res.status(400).json({
                success: false,
                message: "User not found"
            })
        }

        //if user exist generate an otp of 6 digit as a string
        // math.random() --> hives a no bw 0 to 1
        // Math.random()*900000 --> multiply that no with 900000 giving random no b/w 0 to 899999.999
        // 100000 + Math.random()*900000 -->  add 100000 so the ranges shifts from  100000 to 999999.999
        // Math.floor --> removes the decimal part (rounds down)
        // to string --> converts a no to string to send sms or storing in db as text 

        const otp = Math.floor(100000 + Math.random()*900000).toString()

        // otp expiry
        const otpExpiry = new Date(Date.now() + 10*60*1000)  // 10 minutes
        user.otp = otp
        user.otpExpiry = otpExpiry
    
        await user.save();
        await sendOTPMail (otp, email);
        return res.status(200).json({
            success: true,
            message: "OTP sent to email successfully."
        })

    } catch (error){
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

export const verifyOTP = async (req, res) => {
    try{
        const {otp} = req.body;
        const email = req.params.email
        if(!otp){
            return res.status(400).json({
                success: false,
                message: "OTP is required"
            })
        }
        const user = await User.findOne({email})
        if(!user){
            return res.status(400).json({
                success: false,
                message: "User Notfound"
            })
        }

        if(!user.otp || !user.otpExpiry){
            return res.status(400).json({
                success: false,
                message: " OTP is not generated or already Verified"
            })
        }
        if(user.otpExpiry < new Date()){
            return res.status(400).json({
                success: false,
                message: "OTP has expired please request a new one"
            })
        }
        if(otp !== user.otp){
            return res.status(400).json({
                success: false,
                message: "OTP is Invalid "
            })
        }

        user.otp = null
        user.otpExpiry = null
        await user.save()
        return res.status(200).json({
            success: true,
            message: "OTP verified Successfully"
        })

    } catch(error){
        return res.status(500).json({
            success:false,
            message: error.message
        })
    }
}

export const changePassword = async (req, res) => {
    try{
        const {newPassword, confirmPassword} = req.body;
        const {email} = req.params
        const user = await User.findOne({email});
        if(!user){
            return res.status(400).json({
                success: false,
                message: "User not found"
            })
        }
        if(!newPassword || !confirmPassword){
            return res.status(400).json({
                success: false,
                message: "All fields are required"
            })
        }
        if(newPassword != confirmPassword){
            return res.status(400).json({
                success: false,
                message: 'Password do not match'
            })
        }
        const hashedPasswords = await bcrypt.hash(newPassword, 10)
        user.password = hashedPasswords
        await user.save()
        return res.status(200).json({
            success: true,
            message: "Password changed successfully" 
        })

    } catch(error){
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

export const allUser = async (_, res) =>{
    try{
       const users = await User.find()
       return res.status(200).json({
         success: true,
         users
       })
    } catch (error){
       return res.status(500).json({
            success: false,
            message: error.message
        }) 
    }
}

export const getUserById = async (req,res) =>{
    try{
        const {useerId} = req.params; // extract userid by req params
        const user = await User.findById(userId).select("-password -otp -otpExpiry -token")  // want to hide sensitive info 
        if(!user){
            return res.status(404).json({
                success: false,
                message: "User Not Found"
            })
        }
        res.status(200).json({
            success: true,
            user,
        })

    } catch(error){
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}
