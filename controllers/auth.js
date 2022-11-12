import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import dotenv from 'dotenv'
import sendMail from '../middlewares/otp.js'
dotenv.config()
const accountSid = process.env.ACCOUNTSID
const authToken = process.env.AUTHTOKEN
import { createRequire } from "module";
const require = createRequire(import.meta.url);
const client = require('twilio')(accountSid,authToken)


// import {client as client(accountSid,authToken)} from 'twilio'

import users from '../models/auth.js'

export const signup =async(req,res)=>{
    const {name,email,password,mobile} = req.body;
    try{
        const existinguser=await users.findOne({email})
        if(existinguser){
            return res.status(400).json({message:'User already found..'})
        }
        const hashPassword = await bcrypt.hash(password,12);
        const newUser=await users.create({name,email,mobile,password:hashPassword})
        const token = jwt.sign({email:newUser.email,id:newUser._id},process.env.JWT_SECRET,{expiresIn:'1h'})
        res.status(200).json({result:newUser,token})
        }catch(err){
        res.status(500).json("Something went wrong...")
    }
}


export const login = async(req,res)=>{
    const {mobile} = req.body;
    try{
        const existinguser = await users.findOne({mobile})
        if(!existinguser){
            return res.status(404).json({message:"User not found..."})
        }
        const isPasswordCrt = await bcrypt.compare(password,existinguser.password)
        if(!isPasswordCrt){
            return res.status(400).json({message:"Invalid credentials"})
        }
        const token = jwt.sign({email:existinguser.email,id:existinguser._id},process.env.JWT_SECRET,{expiresIn:'1h'})
        res.status(200).json({result:existinguser,token})
    }catch(err){
        res.status(500).json(err.message)
    }
}
