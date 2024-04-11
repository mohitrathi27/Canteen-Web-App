// models/Product.js
const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true }, // Name of the product
  cost: { type: Number, required: true }, // Cost of the product
});

module.exports = mongoose.model('Product', productSchema);
