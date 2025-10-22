import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

import User from '../model/authmodel.js';
import {sendEmail} from "../util/sendemail.js"

dotenv.config();

 export const signup = async(req,res)=>
 {   
    try
    {
        const{name,email,password}=req.body;
        const exist=await User.findOne({email})
        if(exist) return res.status(500).json({msg:"user already resgiter"});
        const hashed=await bcrypt.hash(password,10);
        const data= new User({name,email,password:hashed});
        await data.save();
        res.status(200).json({msg:"data saved" });
    }

  catch (error) {
  console.error(error); // This will print the real error in your terminal
  res.status(500).json({ msg: "cant signup", error: error.message });
}

}

export const  login= async(req,res)=>
    
    {
        try{
      const{email,password}=req.body;
      const user=await User.findOne({email});
      if(!user) return res.status(401).json({msg:"not correct email"});
      const valid =await bcrypt.compare(password,user.password)
      if(!valid) return res.status(401).json({msg:"wrong password"});

      const token= jwt.sign({id:user._id,email:user.email,name: user.name},process.env.JWT_SECRET,{expiresIn:"1h" });

      res.status(200).json({msg:"user login sucessfully",token});

        }
        catch(error)
        {
             res.status(400).json({msg:"cant login"});
        }
    }
    export const forgetpassword= async(req,res)=>
    {
        try
        {
          const{email}=req.body;
          const user= await User.findOne({email});
         
          if (!user) return res.status(404).json({ msg: "user not registered" });
        //   token generation
          const token= jwt.sign({id:user._id},process.env.JWT_SECRET,{expiresIn:"1h" });
          const link=`http://localhost:5000/api/auth/resetpassword/${user._id}/${token}`;
          const html = `
        <h2>Hello ${user.name},</h2>
         <p>Click below to reset your password:</p>
         <a href="${link}">${link}</a>`;

        await sendEmail(user.email, "Reset Password", "", html);
        
         res.status(201).json({msg:"reset password send to your email "})

        }
        catch(error)
        {

        }
    }

    export const resetpassword= async(req,res)=>
    {
        try
        {
          const{password}=req.body;
          const { id, token } = req.params;

          const decoded= jwt.verify(token,process.env.JWT_SECRET);
          const user= await User.findById(decoded.id);

          if(!user) return res.status(500).json({msg:"token is invalid"});
          const hashed= await bcrypt.hash(password,10);
        //   const userdata=new User({newpassword:hashed});
          user.password = hashed; 
          await user.save();
          
          res.status(200).json({msg:"password changed" });

        }
        catch(error)
        {
            res.status(500).json({ msg: "Error resetting password", error: error.message });

        }
    }

export const protectedroute= async(req,res)=>
    {
        res.json({msg:` you  can acces the private route`})

        
    }
export const publicroute= async(req,res)=>
    {
        res.json({msg:`Anyone can acces the public  route`})
        
    }




