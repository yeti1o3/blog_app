import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/User.models.js';

const router = express.Router();
const salt = bcrypt.genSaltSync(10);
const secret = process.env.JWT_SECRET;

router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ error: "Username and password are required" });
  }
  try {
    const userDoc = await User.findOne({ $or: [{ email: username }, { username: username }] });
    if (!userDoc) {
      return res.status(400).json({ error: "Username does not exist" });
    }
    bcrypt.compare(password, userDoc.password, (err, result) => {
      if (err) {
        res.status(500).json({ error: "Internal server error" });
      }
      if (result) {
        jwt.sign({ username, id: userDoc._id, fullname: userDoc.fullname }, secret, {}, (err, token) => {
          if (err) {
            res.status(500).json("token error");
          }
          res.cookie('token', token).json("ok");
        })
      } else {
        res.status(400).json("password does not match");
      }
    })
  } catch (error) {
    res.json("Internal server error");
  }
});

router.post('/register', async (req, res) => {
  const { fullname, email, username, password } = req.body;
  if (!fullname || !email || !username || !password) {
    return res.status(400).json({ error: "All fields are required" });
  }
  try {
    const existingUser = await User.findOne({ username: username });
    if (existingUser) {
      return res.status(400).json({ error: "Username already exists" });
    }
    const userDoc = await User.create({
      fullname,
      username,
      email,
      password: bcrypt.hashSync(password, salt)
    });
    res.json(userDoc);
  } catch (error) {
    console.error('Error creating user', error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.post('/logout', (req, res) => {
  return res.clearCookie('token').json("ok");
});

export default router;
