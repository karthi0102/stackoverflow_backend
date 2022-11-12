import express  from "express";
import mongoose from "mongoose";
import cors from 'cors'
import userRoutes from "./routes/users.js";
import questionRoutes from './routes/questions.js'
import answerRoutes from './routes/answer.js'
import chatbotRoutes from './routes/chatbot.js'
import dotenv from 'dotenv'

const app = express();
dotenv.config()
const DATABASE_URL = process.env.CONNECTION_URL

mongoose.connect(DATABASE_URL,{useNewUrlParser:true,useUnifiedTopology:true})
.then( () => {
    console.log("Connection open")
}).catch(err => {
    console.log("OOPS !! ERROR")
})

app.use(express.json({limit:"30mb",extended:true}))
app.use(express.urlencoded({limit:"30mb",extended:true}))
app.use(cors())

app.get("/",(req,res)=>{
    res.send("This is a Stack overflow")
})

app.use('/user',userRoutes)
app.use('/questions',questionRoutes)
app.use('/answer',answerRoutes)
app.use('/chatbot',chatbotRoutes)
const PORT = process.env.PORT || 5000;
app.listen(PORT,()=>{
    console.log("server is running on",PORT);
})

