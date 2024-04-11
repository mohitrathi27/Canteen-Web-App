// controllers/userController.js
const User = require('../models/User');

getUserProfile = async (req, res) => {
  try {
    // Find the user by ID (provided by the authentication middleware)
    const user = await User.findById(req.user.id).select('-password'); // Exclude the password field
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};



const updateUser = async (req, res) => {
  const { name, email, number, collegeId, balance } = req.body;
  const userId = req.params.userId;

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Only allow admins to update balance
    if (req.user.role === 'admin') {
      // Admin can update balance if provided in request
      if (balance !== undefined) {
        user.balance = balance;
      }
    }

    // Update other fields
    user.name = name;
    user.email = email;
    user.number = number;
    user.collegeId = collegeId;

    await user.save();
    res.status(200).json({ message: 'User details updated successfully' });
  } catch (error) {
    console.error('Error updating user:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};


const getUserById = async (req, res) => {
  const userId = req.params.userId;

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json(user);
  } catch (error) {
    console.error('Error fetching user data:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

const createUser = async (req, res) => {
  const { name, email,  number, collegeId, password } = req.body;

  try {
    let user = await User.findOne({ $or: [{ email: email }, { collegeId: collegeId }] });

    if (user) {
      return res.status(400).json({ message: 'User already exists' });
    }

    user = new User({
      name,
      email,
      number,
      collegeId,
      password,
      balance: 0 
    });

    await user.save();
    res.status(201).json({ message: 'User created successfully', user:user._id });
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = { updateUser,getUserProfile ,getUserById, createUser};
