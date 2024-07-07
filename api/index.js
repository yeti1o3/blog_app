import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import connectDB from './config/db.js';
import User from './models/User.models.js';
import bcrypt from 'bcrypt';
import cookieParser from 'cookie-parser';
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
          res.cookie('username',userDoc.username,{httpOnly:true,secure:true,sameSite:'none'});
          res.cookie('fullname',userDoc.fullname,{httpOnly:true,secure:true,sameSite:'none'});  
          res.cookie('email',userDoc.email,{httpOnly:true,secure:true,sameSite:'none'});
          res.json("password match");
        }else{
          res.json("password does not match");
        }
      })
    }catch(error){
      res.json("Internal server error");
    }
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
