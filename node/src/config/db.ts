 
import mongoose from "mongoose";

export const connectDB = async () =>{
    try{
 
        const connection = await mongoose.connect(process.env.MONGO_URI);
        console.log('info connection:',connection)

    } catch(error){
        console.log('error al conectarse a mongoDB: ',error)
    }
}