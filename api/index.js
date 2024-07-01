import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import connectDB from './config/db.js';
import User from './models/User.models.js';
const app=express();
const port=4000;
app.use(cors());
connectDB();
app.use(bodyParser.json());

app.post('/register', async(req, res) => {
  const {username,password}=req.body;
    console.log("this is working");
    if(username && password)
    {
      try {const userDoc=await User.create({username,password})
      console.log("username ",username,"password ",password);
    res.send(userDoc);}catch{
      res.send(error);
    }}
    else{
      res.send("error occurred");
    }
    }
);
app.listen(port,()=>{
  console.log('server is running on port ',port);
})
//FZVGObGNsfFk5hkp
