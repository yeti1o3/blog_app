import express from 'express';
import multer from 'multer';
import uploadToCloudinary from '../middleware/uploadToCloudinary.js';
import Post from '../models/Post.models.js';
const uploadmiddleware=multer({dest:'uploads/'});
const router=express.Router();
router.post('/setpost',uploadmiddleware.single('files'),uploadToCloudinary,async(req,res)=>{
    const cloudinaryUrl=req.file.cloudinaryUrl;
    try{
        const {title,summery,content}=req.body;
        const image=cloudinaryUrl;
        const postDoc=await Post.create({title,summery,content,image});
        if(!postDoc){
            return res.status(400).json({error:"Error creating post"});
        }
        res.json(postDoc);
    }catch(error){
        console.error('Error creating post',error);
        res.status(500).json({error:"Internal server error"});
    }
})
router.get('/getpost',async(req,res)=>{
    try{
        const postDoc=await Post.find();
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