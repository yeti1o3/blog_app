import{Router} from 'express';
import User from '../models/User.models.js';
const router=Router();
router.post('/register',async(req,res)=>{
    const{username,password}=req.body;
    if(!username||!password){
        return res.status(400).json({error:"Username and password are required"});
    }
    try{
        const userDoc=await User.create({username,password});
        res.json(userDoc);
    }catch(error){
        console.error('Error creating user',error);
        res.status(500).json({error:"Internal server error"});
    }
})
export default router;