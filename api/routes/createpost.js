import express from 'express';
import multer from 'multer';
import uploadToCloudinary from '../middleware/uploadToCloudinary.js';
const uploadmiddleware=multer({dest:'uploads/'});
const router=express.Router();
router.post('/createpost',uploadmiddleware.single('files'),uploadToCloudinary,(req,res)=>{
    const cloudinaryUrl=req.file.cloudinaryUrl;
    res.json({msg:'file uploded successfully',url:cloudinaryUrl});
})
export default router;