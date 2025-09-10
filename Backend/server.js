// start server and connect database
require('dotenv').config();
const path = require('path');
const express = require('express');
const app = require('./src/app');
const connectDB = require('./src/db/db');

// Connect to DB
connectDB();

// ✅ Serve frontend build (after running `npm run build` in frontend)
app.use(express.static(path.join(__dirname, '../frontend/dist')));

// Catch-all route to serve React index.html
app.get(/.*/, (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/dist', 'index.html'));
});


// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});
