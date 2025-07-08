// server/routes/ticketRoutes.js
const express = require('express');
const router = express.Router();

// Sample route
router.get('/', (req, res) => {
  res.json({ message: 'Ticket route working' });
});

module.exports = router;
