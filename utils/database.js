import mongoose from "mongoose";

// Track the connection status
let isConnected = false;

export const connectToDB = async () => {
    mongoose.set('strictQuery', true);

    if(isConnected) {
        console.log('MongoDB is aleady connected');
        return;
    }

    try {
        await mongoose.connect(process.env.MONGODB_URI, {
            dbName: "Posts_db",
            useNewUrlParser: true,
            useUnifieldTopology: true,
        })

        isConnected = true;
        console.log('MongoDB Connected');
    } catch (err) {
        console.log(err);
    }
}