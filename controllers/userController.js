// login, register, updateProfile

import User from "../models/userModel.js";
import bcrypt from "bcryptjs";

export const registerUser = async(req, res)=>{
    try{
        const {firstName, lastName, email, password, userName} = req.body

        if(!firstName || !lastName ||!email || !password || !userName){
            return res.status(400).json({
                message: "All fields are required"
            })
        }
        const oldUser = await User.findOne({email});
        if(oldUser){
            return res.status(400).json({
                message: "User already exists with this email"
            })
        }
        const hashedPaswd = await bcrypt.hash(password, 10);
        const newUser = new User({
            firstName,
            lastName,
            email,
            password: hashedPaswd,
            userName
        });

        await newUser.save();
        return res.status(201).json({
            message: "User registered successfully",
            success: true
        })
    }
    catch(err){
        console.error("Error in registerUser:", err);
        res.status(500).json({ message: "Internal server error" });
    }
}

export const loginUser = async(req, res)=>{
    try{
        const {email, password} = req.body;
        if(!email || !password){
            return res.status(400).json({
                message: "Email and password are required"
            });
        }
        const user = await User.findOne({email});
        if(!user){
            return res.status(400).json({
                message: "User not found"
            });
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if(!isPasswordValid){
            return res.status(400).json({
                message: "Invalid password"
            });
        }
        return res.status(200).json({
            message: "Login successful",
            user: {
                id: user._id,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                userName: user.userName,
                postNo: user.posts.length,
                bio: user.bio,
            }
        });
    }
    catch(err){
        console.error("Error in loginUser:", err);
        res.status(500).json({ message: "Internal server error" });
    }
}