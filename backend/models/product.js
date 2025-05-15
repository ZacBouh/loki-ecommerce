const mongoose = require('../../config/db');
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

const product = mongoose.model('product', productSchema);
module.exports = product;
