const db = require('../config/db');

exports.getAllDealers = (req, res) => {
  db.query('SELECT * FROM dealers', (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
};