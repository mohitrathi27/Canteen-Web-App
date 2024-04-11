// routes/user.js
const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth'); // Import middleware for authentication
const {getUserProfile,updateUser,getUserById, createUser} = require('../controllers/userController');

// GET user profile
router.get('/', auth, getUserProfile);
router.put('/:userId',auth, updateUser);
router.get('/:userId', getUserById);
router.post('/adduser', createUser);

// router.post('')

module.exports = router;
