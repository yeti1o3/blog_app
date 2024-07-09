import fs from 'fs';
import {v2 as cloudinary} from 'cloudinary';
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });
  const uploadToCloudinary = async (req,res,next)=>{
    const{originalname,path}=req.file;
    const part=originalname.split('.');
    const ext=part[part.length-1];
    const newPath=path+'.'+ext;
    fs.renameSync(path,newPath);
    try{
        const uploadResult=await cloudinary.uploader.upload(newPath,{
            public_id:originalname.split('.')[0],}
        );
        req.file.cloudinaryUrl=uploadResult.url;
        fs.unlinkSync(newPath);
        next();
    }catch(error){
        console.log("Error uploading to cloudinary",error);
        res.status(500).json({error:"interenal server error"}  );
    }
}
export default uploadToCloudinary;