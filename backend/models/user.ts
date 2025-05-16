import mongoose from '../services/db.js'
const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: {type: String, required: true},
    email: {type: String, required: true},
    password: {type: String, required: true},
    isAdmin: Boolean,
});

export const User = mongoose.model('user', userSchema);
