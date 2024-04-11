// adminController.js
const Admin = require("../models/Admin");
const User = require("../models/User");
const Transaction = require("../models/transactionSchema");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Product = require("../models/Product");

exports.findUserByCollegeId = async (req, res) => {
  const { collegeId } = req.params;

  try {
    const user = await User.findOne({ collegeId });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    console.error("Error finding user by college ID:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.incrementBalance = async (req, res) => {
  const { amount, collegeId } = req.body;
  // const { userId } = req.params;

  try {
    const numericAmount = parseFloat(amount);

    if (isNaN(numericAmount) || numericAmount <= 0) {
      return res.status(400).json({ message: "Invalid amount" });
    }

    const user = await User.findOne({ collegeId: collegeId });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Only allow admins to increment balance
    // if (req.user.role !== 'admin') {
    //   return res.status(403).json({ message: 'Not authorized to perform this action' });
    // }

    // Increment user's balance
    user.balance += numericAmount;
    await user.save();
    const transaction = new Transaction({
      collegeId: user.collegeId,
      userName: user.name,
      amount: numericAmount,
      total: user.balance,
      type: "increment",
    });
    await transaction.save().then(() => {
      console.log("Transaction saved successfully");
    });

    res.status(200).json({ message: "Balance incremented successfully" });
  } catch (error) {
    console.error("Error incrementing user balance:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// controllers/adminController.js
exports.loginAdmin = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if admin exists
    const admin = await Admin.findOne({ email });
    if (!admin) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Generate JWT token
    const token = jwt.sign(
      { id: admin._id, role: admin.role },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.json({ message: "Login successful", token });
  } catch (error) {
    console.error("Error logging in admin:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// controllers/adminController.js
exports.decrementBalance = async (req, res) => {
  const { collegeId, amount, password } = req.body;

  try {
    // Find the user by userId
    const user = await User.findOne({
      collegeId: collegeId,
      password: password,
    });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (amount > user.balance) {
      return res.status(400).json({ message: "Insufficient balance" });
    }
    // Decrement the balance
    user.balance -= amount;
    await user.save();
    const transaction = new Transaction({
      collegeId: user.collegeId,
      userName: user.name,
      amount: amount,
      total: user.balance,
      type: "decrement",
    });
    await transaction.save().then(() => {
      console.log("Transaction saved successfully");
    });

    res.status(200).json({
      message: "Balance decremented successfully",
      balance: user.balance,
    });
  } catch (error) {
    console.error("Error decrementing balance:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.getUserBalance = async (req, res) => {
  const { collegeId } = req.body; // Extract userId from the request body
  try {
    // const user = await User.findById(collegeId).select("balance");
    const user = await User.findOne({ collegeId: collegeId }).select("balance");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ balance: user.balance });
  } catch (error) {
    console.error("Error fetching user balance:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Controller to update the cost of a product
exports.updateProductCost = async (req, res) => {
  const { name, cost } = req.body;

  try {
    // Find the product by name
    let product = await Product.findOne({ name });

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    // Update the cost of the product
    product.cost = cost;
    await product.save();

    res.status(200).json({ message: "Product cost updated successfully" });
  } catch (error) {
    console.error("Error updating product cost:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.addProduct = async (req, res) => {
  const { name, cost } = req.body;

  try {
    // Check if the product already exists
    const existingProduct = await Product.findOne({ name });
    if (existingProduct) {
      return res.status(400).json({ message: "Product already exists" });
    }

    // Create a new product
    const newProduct = new Product({ name, cost });
    await newProduct.save();

    res.status(201).json({ message: "Product added successfully" });
  } catch (error) {
    console.error("Error adding product:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Controller to remove a product
exports.removeProduct = async (req, res) => {
  const { name } = req.body;

  try {
    // Find the product by name and remove it
    const deletedProduct = await Product.findOneAndDelete({ name });

    if (!deletedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json({ message: "Product removed successfully" });
  } catch (error) {
    console.error("Error removing product:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
