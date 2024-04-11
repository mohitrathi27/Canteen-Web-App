const express = require('express');
const router = express.Router();
const purchaseController = require('../controllers/purchaseController');

// Route for user purchase
router.post('/purchase', purchaseController.purchaseItem);

module.exports = router;
