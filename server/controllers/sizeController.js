const db = require('../config/db');

exports.getSizesByBrand = (req, res) => {
  const { brand } = req.query;
  const sql = 'SELECT * FROM sizes WHERE brand = ?';
  
  db.query(sql, [brand], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
};

exports.getBrands = (req, res) => {
  const sql = 'SELECT DISTINCT brand FROM sizes';
  
  db.query(sql, (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results.map(row => row.brand));
  });
};