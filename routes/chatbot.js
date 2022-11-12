import express from "express";
import { getAnswer } from "../controllers/chatbot.js";


const router = express.Router()
router.post('/',getAnswer)



export default router