import mongoose from "mongoose";
import users from '../models/auth.js'


export const getAllUsers = async(req,res)=>{
    try {
            const allUsers = await users.find()
            const allUserDetails = []
            allUsers.forEach(user => {
                allUserDetails.push({_id:user._id,name:user.name,about:user.about,tags:user.tags,joinedOn:user.joinedOn})
            })
            res.status(200).json(allUserDetails)
    } catch (err) {
            res.status(400).json({message:err.message})
    }
}



export const updateProfile = async(req,res) =>{
    const {id:_id} = req.params
    const {name,about,tags} = req.body
    if(!mongoose.Types.ObjectId.isValid(_id)){
        return res.status(404).send("user not found")
    }
    try{
        const updatedProfile= await users.findByIdAndUpdate(_id,{$set:{'name':name,'about':about,"tags":tags}},{new:true})
        await updatedProfile.save()
        res.status(200).json(updatedProfile)

    }catch(err){
        res.status(405).json({message:err.message})
    }
}