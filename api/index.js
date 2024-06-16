const express = require("express");
const cors=require('cors');
const mongoose=require('mongoose');
const User=require('./models/User')
const app = express();
const port = 4000;

app.use(cors())
app.use(express.json());

mongoose.connect(
  'mongodb+srv://sanksar:FZVGObGNsfFk5hkp@cluster0.ajlkhr7.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'
);
app.post('/register',async (req,res)=>{
    const{username,password}=req.body;
    const userDoc=await User.create({username,password});
    res.json(userDoc);
});
app.listen(port)

//FZVGObGNsfFk5hkp
