const db = require('../config/db');

exports.createRegister = (req, res) => {
  const { claimNo, dealerCode, dealerView, sizeCode, brand, size } = req.body;
  const receivedDate = new Date().toISOString().slice(0, 10);
  
  const sql = `INSERT INTO registers 
    (receivedDate, claimNo, dealerCode, dealerView, sizeCode, brand, size) 
    VALUES (?, ?, ?, ?, ?, ?, ?)`;
  
  db.query(sql, 
    [receivedDate, claimNo, dealerCode, dealerView, sizeCode, brand, size], 
    (err, result) => {
      if (err) return res.status(500).json({ error: err.message });
      res.status(201).json({ id: result.insertId });
  });
};

exports.updateRegister = (req, res) => {
  const { id } = req.params;
  const { obsDate, techObs, treadDepth, consultantName, obsNo } = req.body;
  
  const sql = `UPDATE registers SET 
    obsDate = ?, techObs = ?, treadDepth = ?, 
    consultantName = ?, obsNo = ? 
    WHERE id = ?`;
  
  db.query(sql, 
    [obsDate, techObs, treadDepth, consultantName, obsNo, id], 
    (err) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ message: 'Register updated successfully' });
  });
};

exports.getAllRegisters = (req, res) => {
  const { search } = req.query;
  let sql = `SELECT * FROM registers`;
  
  if (search) {
    sql += ` WHERE claimNo LIKE '%${search}%' 
             OR dealerCode LIKE '%${search}%' 
             OR id LIKE '%${search}%'`;
  }
  
  db.query(sql, (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
};

exports.deleteRegister = (req, res) => {
  db.query('DELETE FROM registers WHERE id = ?', [req.params.id], (err) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: 'Register deleted successfully' });
  });
};