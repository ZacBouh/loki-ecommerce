const mongoose = require('../../config/db');
const Schema = mongoose.Schema;

const orderSchema = new Schema({
    user: String,
    adress: String,
    price: Number,
    dateOrder: {
        type: Date,
        default: new Date()
    },
});

const order = mongoose.model('order', orderSchema);
module.exports = order;
