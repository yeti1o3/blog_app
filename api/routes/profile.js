import express from 'express';
import jwt from 'jsonwebtoken';

const router = express.Router();
const secret = process.env.JWT_SECRET;

router.get('/profile', async (req, res) => {
  const token = req.cookies.token;
  if (!token) {
    return res.status(401).json({ error: "Unauthorized" });
  }
  jwt.verify(token, secret, {}, (err, decoded) => {
    if (err) {
      return res.status(401).json({ error: "Unauthorized" });
    }
    res.json(decoded);
  });
});

export default router;
