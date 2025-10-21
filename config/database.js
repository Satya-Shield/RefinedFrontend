import mongoose from "mongoose";

let isConnected = false; 

const connectDB = async () => {
  mongoose.set('strictQuery', true);
  if(isConnected){
    console.log("Database is already connected");
    return;
  }

  try{
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Database connected successfully");
    isConnected = true;
  }catch(err){
    console.log(err);
  }
};

export default connectDB;
