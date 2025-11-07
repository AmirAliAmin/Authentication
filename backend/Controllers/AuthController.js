import UserModel from "../Models/users.js";
import  Jwt  from "jsonwebtoken";
import bcrypt from 'bcrypt'


export const signup = async (req,res) => {
    try {
        const {name,email,password} = req.body;
        const user = await UserModel.findOne({email});
        if (user) {
            return res.status(409).json({success:false,message:"Already Exist"})
        }
        const userModel = new UserModel({name,email,password});

        userModel.password = await bcrypt.hash(password,10);
        await userModel.save();

        res.status(201).json({success:true, message:"SignUp Successfully"})
    } catch (error) {
        res.status(500).json({success:false, message:`internal server error ${error}`})
        
    }
}

export const login = async (req,res) => {
    try {
        const {email,password} = req.body;
        const user = await UserModel.findOne({email});
        if (!user) {
            return res.status(403).json({success:false,message:"Auth Failed email or password is wrong"})
        }
        const isPassword = await bcrypt.compare(password, user.password)
         if (!isPassword) {
            return res.status(403).json({success:false,message:"Auth Failed email or password is wrong"})
        }
        const jwToken = Jwt.sign({email:user.email, _id:user._id},process.env.JWT_SECRET,{expiresIn:'24h'})

        res.status(201).json({success:true, message:"SignUp Successfully",jwToken,email,name:user.name})
    } catch (error) {
        res.status(500).json({success:false, message:`internal server error ${error}`})
        
    }
}