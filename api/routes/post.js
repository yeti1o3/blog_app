import express from 'express';
import multer from 'multer';
import uploadToCloudinary from '../middleware/uploadToCloudinary.js';
import Post from '../models/Post.models.js';
import jwt from 'jsonwebtoken';
const uploadmiddleware=multer({dest:'uploads/'});
const router=express.Router();
const secret=process.env.JWT_SECRET;
router.post('/setpost',uploadmiddleware.single('files'),uploadToCloudinary,async(req,res)=>{
    const cloudinaryUrl=req.file.cloudinaryUrl;
    try{
        const {title,summery,content}=req.body;
        const image=cloudinaryUrl;
        const token = req.cookies.token;
        let id=null;
        if (!token) {
            return res.status(401).json({ error: "Unauthorized" });
          }
          jwt.verify(token, secret, {}, (err, decoded) => {
            if (err) {
              return res.status(401).json({ error: "Unauthorized" });
            }

            id=decoded.id;
        })
        const postDoc=await Post.create({title,summery,content,image,author:id});
        if(!postDoc){
            return res.status(400).json({error:"Error creating post"});
        }
        res.json(postDoc);
    }catch(error){
        console.error('Error creating post',error);
        res.status(500).json({error:"Internal server error"});
    }
})
router.get('/getpost/:id',async(req,res)=>{
    const id=req.params.id;
    if(id ){
        try{
            const postDoc=await Post.findById(id).populate('author','fullname');
            if(!postDoc){
                return res.status(400).json({error:"Error fetching post"});
            }
            res.json(postDoc);
        }catch(error){
            console.error('Error fetching post',error);
            res.status(500).json({error:"Internal server error"});
        }
    }
    
})
router.get('/getpost',async(req,res)=>{
    try{
        const postDoc=await Post.find().populate('author','fullname').sort({createdAt:-1});
        if(!postDoc){
            return res.status(400).json({error:"Error fetching post"});
        }
        res.json(postDoc);
    }catch(error){
        console.error('Error fetching post',error);
        res.status(500).json({error:"Internal server error"});
    }
})
export default router;