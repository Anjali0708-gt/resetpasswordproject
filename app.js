import express from 'express'
import mongoose from "mongoose";
import dotenv from 'dotenv';
import router from './route/authroute.js'

dotenv.config();
const app= express();
app.use(express.json());


const jwt=process.env.JWT_SECRET;
const Mongoo_url=process.env.MONGO_URL;
mongoose
        
  .connect(process.env.MONGO_URL)
  .then(() => console.log(" MongoDB connected"))
  .catch((err) => console.log(" DB Error:", err));


app.use('/api/auth',router);
app.listen(process.env.PORT, ()=>
 console.log("server on ")
);

