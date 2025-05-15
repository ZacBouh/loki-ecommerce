import mongoose from '../services/db.js'
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

export const Order = mongoose.model('order', orderSchema);
