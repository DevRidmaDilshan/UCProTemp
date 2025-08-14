const db = require('../config/db');

exports.getAllConsultants = (req, res) => {
  db.query('SELECT * FROM consultants', (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
};