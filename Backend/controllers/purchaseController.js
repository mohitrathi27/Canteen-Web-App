const User = require('../models/User');
const Transaction = require('../models/transactionSchema');
const Product = require("../models/Product")

exports.purchaseItem = async (req, res) => {
  const { userId, itemId } = req.body;

  try {
    // Retrieve user and item details
    const user = await User.findById(userId);
    const item = await Product.findById(itemId);
    if (!user || !item) {
      return res.status(404).json({ message: 'User or item not found' });
    }

    // Check if user has sufficient balance
    if (user.balance < item.cost) {
      return res.status(400).json({ message: 'Insufficient balance' });
    }

    // Deduct item price from user's balance
    user.balance -= item.cost;
    await user.save();

    // Record transaction
    const transaction = new Transaction({
      user: userId,
      product: itemId,
      balance: item.cost
    });
    await transaction.save();

    res.status(200).json({ message: 'Purchase successful', transaction });
  } catch (error) {
    console.error('Error handling purchase:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
