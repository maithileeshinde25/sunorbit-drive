import mongoose from "mongoose";
import User from "../models/userModel.js"
import jwt from "jsonwebtoken"
async function register(req,res){
    try {

        const email=req.body.email;
        const existUser=await User.findOne({email:email});
        if(!existUser){
            const newUser=new User(req.body)
            await newUser.save()
            res.status(202).send({ msg: "Registered successfully", success: true})
        }else{
            res.status(202).send({ msg: "User already Registered", success: false})
        }
        
    } catch (error) {
       res.status(500).send({msg:"server Error"})
        
    }
}

async function login(req,res) {
    try {
        console.log(req.body)
        const email=req.body.email;
const existUser=await User.findOne({email:email});
console.log(existUser,"existUser");
if(!existUser){
    res.status(200).send({msg:"Inavalid user",sucess:false})
}

const isMatch = await existUser.matchPassword(req.body.password);


    if(isMatch){
        const token =jwt.sign({id:existUser._id,name:existUser.name},'password',{expiresIn:"1d"})
        res.status(201).send({ msg: "login Success", success: true,token:token });
    }else{
      return res.status(202).send({ msg: "password Incorrect", success: false });

    }

        
    } catch (error) {
        console.log(error)
        res.status(400).send({msg:"server Error"})
        
    }
}

async function getUserInfo (req,res) {
    try {
        console.log("User Object:", req.User);
      const id = req.User.id
    
   const loggedUser = await User.find({_id:id})
   res.status(202).send({ msg: "login Success", success: true,loggedUser:loggedUser[0]});
   
    } catch (error) {
   res.status(202).send({ msg: "login Fail", success: false});
        
    }
   
}

 export default {register,login, getUserInfo }