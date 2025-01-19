import { MongoClient } from "mongodb";
import dotenv from "dotenv"; // ES module import for dotenv
dotenv.config();

const uri = process.env.MONGO_URI;

const client = new MongoClient(uri);

async function connectDB() {
    try {
        await client.connect();
        console.log("Connected to MongoDB Atlas!");
    } catch (err) {
        console.error("Error connecting to MongoDB Atlas:", err);
        throw err;
    }
}

export default { connectDB, client }; // ES module export
