import mongoose from 'mongoose';
const connectDB=async()=>{
    try{
        await mongoose.connect(
            'mongodb+srv://sanksar:FZVGObGNsfFk5hkp@cluster0.ajlkhr7.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0/BLOG_DB',
        );
        console.log('Connected to MongoDB');
    }catch(err){
        console.error("could not connect to mongoDB",err);
        process.exit(1);
    }
}
export default connectDB;
