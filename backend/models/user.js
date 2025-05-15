const mongoose = require('../../config/db');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: String,
    email: String,
    password: String,
    isAdmin: Boolean,
});

const user = mongoose.model('user', userSchema);
module.exports = user;
