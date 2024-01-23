
import jwt from "jsonwebtoken";

export const sendCookie = (user,res,message,statusCode = 200)=>{
    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);
    res
   .status(statusCode)
   .cookie("token",token,{
    httpOnly: true,
    maxAge: 15*60*1000,
    // This is done beacuse we want that when we are running server on local host then 
    // sameSite should be lax and secure should be false but when the server is deployed then 
    // sameSite should be none and secure should be true 
    sameSite: process.env.NODE_ENV === "Development"?"lax" : "none",
    secure: process.env.NODE_ENV === "Development"?false : true,
   })
   .json({
    sucess: true,
    message,
   });
}