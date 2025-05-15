import mongoose from '../services/db.js'
const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: String,
    email: String,
    password: String,
    isAdmin: Boolean,
});

export const User = mongoose.model('user', userSchema);
