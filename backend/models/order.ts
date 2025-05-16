import mongoose from '../services/db.js';
const Schema = mongoose.Schema;

const orderSchema = new Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true
  },
  address: {
    type: String,
    required: true
  },
  total_price: {
    type: Number,
    required: true
  },
  items: [
    {
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'product',
        required: true
      },
      quantity: {
        type: Number,
        required: true
      }
    }
  ],
  dateOrder: {
    type: Date,
    default: Date.now
  }
});

export const Order = mongoose.model('order', orderSchema);
