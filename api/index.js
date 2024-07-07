import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import connectDB from './config/db.js';
import User from './models/User.models.js';
import bcrypt from 'bcrypt';
const app=express();
const port=4000;
app.use(cors());
connectDB();
app.use(bodyParser.json());
const salt=bcrypt.genSaltSync(10);

app.post('/register', async(req, res) => {
  const {username,password}=req.body;
    if(!username||!password)
      {
        return res.send("username and password required");
      }
      try {
        const userDoc = await User.create({
          username,
          password :bcrypt.hashSync(password,salt)
        });
        res.json(userDoc);
    } catch (error) {
        if (error.code === 11000) {
            // Duplicate key error
            res.status(400).json({ error: "Username already exists" });
        } else {
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
