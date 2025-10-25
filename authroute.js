import express from 'express';
import dotenv from 'dotenv';
import{login,signup,protectedroute,publicroute} from '../controller/authcontroller.js';
import {authmiddleware} from '../middleware/authmiddleware.js';
dotenv.config();
const router=express.Router();


router.post('/signup',signup)
router.post('/login',login)
router.get('/protected',authmiddleware,protectedroute);
router.get('/public',publicroute);

export default router; // 👈 IMPORTANT: default export
