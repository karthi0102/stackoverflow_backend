import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'




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
    const result ={
        mobile,
        name:'Anonymus',
        password:"mobile",
        email:' '
    }
    try{
       var existinguser = await users.findOne({mobile})
       if(!existinguser){
       const user=await users.create(result)
        const token = jwt.sign({email:existinguser.email,id:existinguser._id},process.env.JWT_SECRET,{expiresIn:'1h'})
       return res.status(200).json({result:existinguser,token})
       }
        const token = jwt.sign({email:existinguser.email,id:existinguser._id},process.env.JWT_SECRET,{expiresIn:'1h'})
        res.status(200).json({result:existinguser,token})
    }catch(err){
        console.log(err)
        res.status(500).json(err.message)
    }
}
