// adminRoutes.js
const express = require('express');
const router = express.Router();
const adminAuthMiddleware = require('../middleware/adminAuthMiddleware');
const { findUserByCollegeId, incrementBalance,updateProductCost,addProduct,removeProduct, decrementBalance, getUserBalance } = require('../controllers/adminController');
const adminController = require('../controllers/adminController');

// Apply admin authentication middleware
// router.use(adminAuthMiddleware);

// Define admin routes
router.get('/users/:collegeId', findUserByCollegeId);
router.post('/login', adminController.loginAdmin);
router.post('/user/check-balance', adminController.getUserBalance)
router.put('/user/increment-balance',adminController.incrementBalance);
router.put('/user/decrement-balance', adminController.decrementBalance);
router.put('/update_product', adminController.updateProductCost);
router.put('/add_product', adminController.addProduct);
router.put('/remove_product', adminController.removeProduct);

module.exports = router;


module.exports = router;
