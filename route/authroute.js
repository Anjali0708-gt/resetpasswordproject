import express from 'express';
import dotenv from 'dotenv';
import{login,signup,protectedroute,publicroute,forgetpassword,resetpassword} from '../controller/authcontroller.js';
import {authmiddleware} from '../middleware/authmiddleware.js';
dotenv.config();
const router=express.Router();


router.post('/signup',signup)
router.post('/login',login)
router.get('/protected',authmiddleware,protectedroute);
router.get('/public',publicroute);
router.post('/forgetpassword',forgetpassword)

router.post("/resetpassword/:id/:token", resetpassword);



export default router; // 👈 IMPORTANT: default export
