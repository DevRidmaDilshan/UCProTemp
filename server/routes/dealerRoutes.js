const express = require('express');
const router = express.Router();
const { getAllDealers } = require('../controllers/dealerController');

router.get('/', getAllDealers);

module.exports = router;