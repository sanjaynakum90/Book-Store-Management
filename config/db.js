import mongoose from "mongoose";

const connectDb = async () => {
  try {
    const connect = await mongoose.connect(process.env.MONGO_URI);
    return connect;
  } catch (error) {
    console.error("MongoDB connection failed:", error.message);
    return null;
  }
};

export default connectDb;