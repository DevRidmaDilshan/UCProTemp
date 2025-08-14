const express = require('express');
const router = express.Router();
const { getAllConsultants } = require('../controllers/consultantController');

router.get('/', getAllConsultants);

module.exports = router;