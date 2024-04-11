const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema({
  // user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  // product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
  // balance: { type: Number, required: true ,integer: true},
  // timestamp: { type: Date, default: Date.now },
  collegeId: {
    type:String,
    required: true,
  },
  userName: {
    type: String,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  type: {
    type: String,
    enum: ["increment", "decrement"],
    required: true,
  },
  total: {
    type: Number,
    required: true,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Transaction", transactionSchema);
