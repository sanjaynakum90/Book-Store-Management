import mongoose from "mongoose";

async function connectDB() {
    try {
        const connect = await mongoose.connect(process.env.MONGO_URI);
        console.log(`MongoDB connected: ${connect.connection.host}`);
        return connect;
    } catch (error) {
        throw new Error(error.message);
    }
}

export default connectDB;