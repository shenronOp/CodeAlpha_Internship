// backend/models/Product.js
const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  description: String,
  image: String, // store image URL or path
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Product', productSchema);
