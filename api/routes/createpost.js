import express from 'express';
const router=express.Router();
router.post('/createpost',async(req,res)=>{
    console.log(req.body);
    res.json("ok");
})
export default router;