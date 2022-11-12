import mongoose from "mongoose";
import questions from "../models/questions.js";

export const postAnswer = async(req,res)=>{
    const {id:_id} = req.params
    const {noOfAnswers,answerBody,userAnswered,userId} = req.body
    if(!mongoose.Types.ObjectId.isValid(_id)){
        return res.status(404).send("question unavailable")
    }
    updateNoOfQuestions(_id,noOfAnswers)
    try{
        const updatedQuestion = await questions.findByIdAndUpdate(_id,{$addToSet:{'answer':[{answerBody,userAnswered,userId}]}})
        res.status(200).json(updatedQuestion)
    }catch(err){
        res.status(400).json({message:err.message})
    }
}

const updateNoOfQuestions  = async(_id,noOfAnswers) =>{
        try{
            await questions.findByIdAndUpdate(_id,{$set:{'noOfAnswers':noOfAnswers}})
        }catch(err){
              console.log(err.message)
        }
}

export const deleteAnswer =async(req,res) =>{
    const {id:_id} = req.params
    const {answerId,noOfAnswers} = req.body
    if(!mongoose.Types.ObjectId.isValid(_id)){
       
        return res.status(404).send("question unavailable")
    }
    if(!mongoose.Types.ObjectId.isValid(answerId)){
       
        return res.status(404).send('Answer unavailable')
    }
    updateNoOfQuestions(_id,noOfAnswers)
    try {
        await questions.updateOne(
            {_id},
            {$pull:{'answer':{_id:answerId}}}
        )
        res.status(200).json({me})
    } catch (err) {
        console.log(err.message);
           res.status(400).json({message:err.message})
    }
}

