// adminRoutes.js
const express = require('express');
const router = express.Router();
const transcastionController = require("../controllers/transactionController")


router.post("/handle",transcastionController.handleTransaction) 
router.get("/user/:userId",transcastionController.getTransactionsByUser)



module.exports = router;


module.exports = router;
