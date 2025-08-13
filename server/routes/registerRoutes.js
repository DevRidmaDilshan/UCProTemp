const express = require('express');
const router = express.Router();
const {
  createRegister,
  updateRegister,
  getAllRegisters,
  deleteRegister
} = require('../controllers/registerController');

router.post('/', createRegister);
router.put('/:id', updateRegister);
router.get('/', getAllRegisters);
router.delete('/:id', deleteRegister);

module.exports = router;