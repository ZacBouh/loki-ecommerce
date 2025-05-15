import mongoose from "mongoose";
import { config } from "dotenv";
config()
const dbUrl = process.env.DB_URL;

if (!dbUrl){
    throw new Error('Missing database url, check in your .env file')
}

try {
    await mongoose.connect(dbUrl)
    console.log('[DATABASE] Connected to database');
} catch (err) {
    console.log("Error connecting to the database ", err)
}

export default mongoose

