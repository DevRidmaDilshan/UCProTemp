const express = require('express');
const router = express.Router();
const { getSizesByBrand, getBrands } = require('../controllers/sizeController');

router.get('/', getSizesByBrand);
router.get('/brands', getBrands);

module.exports = router;