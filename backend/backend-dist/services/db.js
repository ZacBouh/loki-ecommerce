import mongoose from "mongoose";
const dbUrl = process.env.DB_URL;
if (!process.env.DB_URL) {
    throw new Error('Missing database url, check in your .env file');
}
try {
    await mongoose.connect(process.env.DB_URL);
    '[DATABASE] Connected to database';
}
catch (err) {
    console.log("Error connecting to the database ", err);
}
export default mongoose;
