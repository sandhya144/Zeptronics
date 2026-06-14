import jwt  from "jsonwebtoken"
import User from "../models/usermodel.js"

// middleware (next) --> means it runs b/w the client request and server response

export const isAuthenticated = async (req, res, next) => {
    try{
        const authHeader = req.headers.authorization
        if(!authHeader || !authHeader.startsWith('Bearer ')){
            return res.status(400).json({
                success: false,
                message: "Authorisation token is missing or invalid"
            })
        }
        const token = authHeader.split(" ")[1]
        let decoded 
        try{
           decoded = jwt.verify(token, process.env.SECRET_KEY)
        } catch(error){
            if(error.name === "TokenExpiredError"){
                return res.status(400).json({
                    success:false,
                    message: "The registration token has expired"
                })
            }  
            return res.status(400).json({
                success: false,
                message: 'Access token is missing or invaid'
            })
        }

        const user = await User.findById(decoded.id)
        if(!user){
            return res.status(400).json({
                success: false,
                message: 'User not found'
            })
        }
        req.user = user
        req.id = user._id
        next();
    } 
    catch(error){
        return res.status(500).json({
            success: false,
            message: error.message 
        })
    }
}

// to check is admin 
export const isAdmin = (req,res, next) => {
    console.log(req.user);
    console.log(req.user?.role);
    
    if(req.user && req.user.role === 'admin'){
        next()
    } else{
        return res.status(403).json({
            message: 'Access denied : admins Only'
        })
    }
}