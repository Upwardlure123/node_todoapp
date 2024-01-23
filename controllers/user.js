
import { User } from "../models/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { sendCookie } from "../utils/feature.js";
import { isAuthenticated } from "../middlewares/auth.js";
import errorHandler from "../middlewares/error.js";


// REGISTER PAGE
export const register = async(req,res,next)=>{
   try {
    const {name , email , password} = req.body;
   let user = await User.findOne({email});

   if(user){
    return next(new errorHandler("User already exist" , 400));
  }
   const hashedPassword = await bcrypt.hash(password,10);
   user = await User.create({name , email , password : hashedPassword});
   
   const token = jwt.sign({_id: user._id} , process.env.JWT_SECRET);

   } catch (error) {
     next(error);
   }
}

// LOGIN PAGE
export const login = async(req,res,next)=>{
    
   try {
    const {name , email , password} = req.body;
    const user = await User.findOne({email}).select("+password");

    if(!user){
        return next(new errorHandler("Invalid email or password" , 404)); 
      }
   const isMatch = await bcrypt.compare(password , user.password);

   if(!isMatch){
    return next(new errorHandler("Invalid email or password" , 400)); 
   }
   sendCookie(user,res,`Welcome back ,${user.name}`,201);  

   } catch (error) {
     next(error);
   }

}

// GET USER PROFILE
export const getMyProfile = (req,res)=>{

    res.status(200).json({
        success: true,
        user: req.user,
    });
};

// LOGOUT PAGE
export const logout = (req,res)=>{
   res.status(200)
   .cookie("token", "" , {expires:new Date(Date.now())})
   .json({
    success: true,
    
   });
}