import mongoose from '../services/db.js'
const Schema = mongoose.Schema;

const productSchema = new Schema({
    name: String,
    image: String ,
    description: String,
    brand: String,
    category: String,
    price: Number,
    countInStock: Number,
    rating: Number,
    numReviews: Number
});

export const Product = mongoose.model('product', productSchema);
