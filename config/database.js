import mongoose from "mongoose";

let isConnected = false;

const connectDB = async () => {
  mongoose.set("strictQuery", true);

  if (isConnected) {
    console.log("Database is already connected");
    return;
  }

  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Database connected successfully");
    isConnected = true;

    // Test query to list collections
    const db = mongoose.connection.db;
    if (db) {
      const collections = await db.listCollections().toArray(); // Use MongoDB driver directly
      console.log("Collections:", collections.map((c) => c.name));
    } else {
      console.log("No database connection available to list collections");
    }
  } catch (err) {
    console.error("Connection failed:", err);
  }
};

export default connectDB;