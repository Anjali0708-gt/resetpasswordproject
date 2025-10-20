import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

import User from '../model/authmodel.js';

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

  catch(error)
   {
    res.status(401).json({msg:"cant signup"});
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

export const protectedroute= async(req,res)=>
    {
        res.json({msg:` you  can acces the private route`})

        
    }
export const publicroute= async(req,res)=>
    {
        res.json({msg:`Anyone can acces the public  route`})
        
    }




