import mongoose from "mongoose"


const connectDB = async ()=>{
    try {
        await mongoose.connect(process.env.MONGODB_URL);
        console.log("MONGODB CONNECTED SUCCESSFULLY")
        
    } catch (error) {
        console.log("MONGODB Connection Error ::",error);
        process.exit(1);
        
    }
};

export default connectDB