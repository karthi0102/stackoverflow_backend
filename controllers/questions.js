import questions from '../models/questions.js'
import mongoose from 'mongoose'

export const AskQuestion = async(req,res)=>{
   
    const postQuestion = new questions({...req.body})
    try{
        await postQuestion.save();
        res.status(200).json("Posted a question successfully")
    }catch(err){
        console.log(err.message)
        res.status(500).json("couldn't post a new question")
    }

}

export const getAllQuestions = async(req,res)=>{
    try{
        const questionList = await questions.find()
        res.status(200).json(questionList)

    }catch(err){
        res.status(500).json({message:"Can't fetch questions"+err.message})
    }
}

export const deleteQuestion =async (req,res)=>{
    const {id:_id} = req.params
    if(!mongoose.Types.ObjectId.isValid(_id)){
        return res.status(404).send('question unavailable')
    }
    try{
         await questions.findByIdAndRemove(_id)
         res.status(200).json({message:'success'})
       
    }catch(err){
        res.status(404).json({message:err.message})
    }
}

export const voteQuestion = async(req,res)=>{
    const {id:_id} = req.params
    const {value,userId}=req.body
    if(!mongoose.Types.ObjectId.isValid(_id)){
        return res.status(404).send("question unavailable..")
    }
    try {
        const question = await questions.findById(_id)
        const upIndex = question.upVote.findIndex((id) => id === String(userId))
        const downIndex = question.downVote.findIndex((id) => id === String(userId))

        if(value==='upVote'){
            if(downIndex!==-1){
                question.downVote=question.downVote.filter((id)=> id !== String(userId))
            }
            if(upIndex ===-1){
                 question.upVote.push(userId)
            }
            else{
                question.upVote=question.upVote.filter((id) => id !== String(userId))   
            }
        }
        if(value==='downVote'){
                if(upIndex!==-1){
                    question.upVote=question.upVote.filter((id)=> id !== String(userId))
                }
                if(downIndex ===-1){
                     question.downVote.push(userId)
                }
                else{
                    question.downVote=question.downVote.filter((id) => id !== String(userId))   
                }
            }

            await questions.findByIdAndUpdate(_id,question)
            res.status(200).json({message:"Voted successfully..."})
        
    } catch (err) {
        res.status(400).json({message:err.message})
    }
}