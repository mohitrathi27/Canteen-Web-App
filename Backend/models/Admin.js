// models/Admin.js
const mongoose = require('mongoose');

const adminSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['admin', 'user'], default: 'user' }, // Add role field with default value 'user'
  verified: { type: Boolean, default: false },
});

module.exports = mongoose.model('Admin', adminSchema);
