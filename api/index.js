import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import connectDB from './config/db.js';
import User from './models/User.models.js';
import bcrypt from 'bcrypt';
import cookieParser from 'cookie-parser';
import jwt from 'jsonwebtoken';
const app=express();
const port=4000;
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true,
}));
connectDB();
app.use(cookieParser());
app.use(bodyParser.json());

const salt=bcrypt.genSaltSync(10);
const secret='abseniheifhghb';

app.post('/login',async(req,res)=>{
  const {username,password}=req.body;
  if(!username||!password){
    return res.status(400).json({error:"Username and password are required"});}
    try{
      const userDoc=await User.findOne({$or:[{email:username},{username:username}]});
      
      if(!userDoc){
        return res.status(400).json({error:"Username does not exist"});
      }
      bcrypt.compare(password,userDoc.password,(err,result)=>{
        if(err){
          res.status(500).json({error:"Internal server error"});
        }
        if(result){
          jwt.sign({username,id:userDoc._id,fullname:userDoc.fullname},secret,{},(err,token)=>{
            if(err)
            {
              res.status(500).json("token error");
            }
            res.cookie('token',token).json("ok");
          })
        }else{
          res.status(400).json("password does not match");
        }
      })
    }catch(error){
      res.json("Internal server error");
    }
  })

  app.get('/profile',async (req,res)=>{
    const token=req.cookies.token;
    
    if(!token){
      return res.status(401).json({error:"Unauthorized"});
    }
    jwt.verify(token,secret,{},(err,decoded)=>{
      if(err){
        return res.status(401).json({error:"Unauthorized"});
      }
      res.json(decoded);
    })
  })
  app.post('/logout',(req,res)=>{
   return res.clearCookie('token').json("ok");
  })
app.post('/register', async(req, res) => {
  const {fullname,email,username,password}=req.body;
  if (!fullname || !email || !username || !password) {
    return res.status(400).json({ error: "All fields are required" });
  }
      try {
        const existingUser = await User.findOne({username: username});
        if(existingUser){
          return res.status(400).json({error: "Username already exists"});
        }
        const userDoc = await User.create({
          fullname,
          username,
          email,
          password :bcrypt.hashSync(password,salt)
        });
        res.json(userDoc);
    } catch (error) {
        {
            console.error('Error creating user', error);
            res.status(500).json({ error: "Internal server error" });
        }
    }
    }
);
app.listen(port,()=>{
  console.log('server is running on port ',port);
})
//FZVGObGNsfFk5hkp
