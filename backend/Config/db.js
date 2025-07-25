import mongoose from "mongoose";
import dotenv from "dotenv"
dotenv.config()

async function connnectDB() {
    try {
        await mongoose.connect(process.env.LOCAL_URL)
        .then(()=>console.log("Connect Succesfully to Database") );
       
    } catch (error) {
        console.log(error)
    }
    
}

export default connnectDB