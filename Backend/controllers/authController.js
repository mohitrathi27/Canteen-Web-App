const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');


exports.signup = async (req, res) => {
  try {
    const { name, email, number, collegeId, username, password } = req.body;

    // Check if user already exists
    let user = await User.findOne({ username });
    if (user) {
      return res.status(400).json({ msg: 'User already exists' });
    }

    
    // // Hash password
    // const salt = await bcrypt.genSalt(10);
    // password = await bcrypt.hash(password, salt);

    // Create new user
    user = new User({ name, email, number, collegeId, username, password });

    await user.save();

    // Return the registered user details
    res.json({
      msg: 'User registered successfully',
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        number: user.number,
        collegeId: user.collegeId
        // You may add more user details here if needed
      }
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error nahi h');
  }
};




exports.login = async (req, res) => {
  try {
    const { usernameOrEmail, password } = req.body;

    // Check if user exists with username
    let user = await User.findOne({ username: usernameOrEmail });
    
    // If user doesn't exist with username, check with email
    if (!user) {
      user = await User.findOne({ email: usernameOrEmail });
    }

    // If user still doesn't exist, return error
    if (!user) {
      return res.status(400).json({ msg: 'Invalid credentials' });
    }

    // Check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ msg: 'Invalid credentials' });
    }

    // Create JWT token
    const payload = {
      user: {
        id: user._id // Use user's ID for the payload
      }
    };

    jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' }, (err, token) => {
      if (err) throw err;
      // Return the token and user ID
      res.json({ token, id: user._id });
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};
