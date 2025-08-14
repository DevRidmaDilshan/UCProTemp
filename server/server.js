require('dotenv').config();
const express = require('express');
const cors = require('cors');
const db = require('./config/db');
const registerRoutes = require('./routes/registerRoutes');
const dealerRoutes = require('./routes/dealerRoutes');
const sizeRoutes = require('./routes/sizeRoutes');
const consultantRoutes = require('./routes/consultantRoutes');


const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Routes
app.use('/api/registers', registerRoutes);
app.use('/api/dealers', dealerRoutes);
app.use('/api/sizes', sizeRoutes);
app.use('/api/consultants', consultantRoutes);

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});