import errorHandler from "../middlewares/error.js";
import { Task } from "../models/task.js"


export const newTask = async(req,res,next)=>{

    try {
        const {title , description} = req.body;
     await Task.create({
        title,
        description,
        user: req.user,
     })

     res.status(201).json({
        sucess: true,
        message: "Task added successfully",
     });
    } catch (error) {
        next(error)  
    }
}


export const getMyTask = async(req,res,next)=>{
    const userId = req.user._id;

    const tasks = await Task.find({user: userId});

    res.status(200).json({
        success: true,
        tasks,
    })
}

export const updateTask = async(req,res,next)=>{
    try {
        const task = await Task.findById(req.params.id);

    if(!task){
        return next(new errorHandler("Task not found" , 404)); // (err.message , err.statusCode)
    }

    task.isCompleted = !task.isCompleted;

    await task.save();
    res.status(200).json({
        success: true,
        message: "Task updated",
    });
    } catch (error) {
        next(error);
    }
}


export const deleteTask = async(req,res,next)=>{
    try {
        const task = await Task.findById(req.params.id);

    if(!task){
        return next(new errorHandler("Task not found" , 404)); // (err.message , err.statusCode)
    }
    await task.deleteOne();

    res.status(200).json({
        success: true,
        message: "Task deleted",
        httpOnly: true,
        maxAge: 15*60*1000,
        sameSite: process.env.NODE_ENV === "Development" ? "lax" : "none",
        secure: process.env.NODE_ENV === "Development" ? false : true,
    });
    } catch (error) {
        next(error);
    }
}

