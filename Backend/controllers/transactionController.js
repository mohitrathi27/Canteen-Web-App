const Transaction = require('../models/transactionSchema');
const User = require('../models/User');
const Product = require("../models/Product")



// Function to handle user purchases and transactions
exports.handleTransaction = async (req, res) => {
  const { userId, productId, amount } = req.body;

  try {
    // Retrieve user information
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Retrieve product information
    // Assuming you have a Product model
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    // Check if the user has sufficient balance
    if (user.balance < amount) {
      return res.status(400).json({ message: 'Insufficient balance' });
    }

    // Deduct the transaction amount from the user's balance
    user.balance -= amount;
    await user.save();

    // Create a new transaction record
    const transaction = new Transaction({
      user: userId,
      product: productId,
      amount,
      timestamp: new Date()
    });
    await transaction.save();

    res.status(201).json({ message: 'Transaction successful', transaction });
  } catch (error) {
    console.error('Error handling transaction:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};


// Get transactions for a specific user
exports.getTransactionsByUser = async (req, res) => {
    const userId = req.params.userId;
  
    try {
      const transactions = await Transaction.find({ user: userId });
      res.status(200).json(transactions);
    } catch (error) {
      console.error('Error fetching user transactions:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  };