const express = require('express');
const { protect } = require('../middleware/auth');

const router = express.Router();

// All subscription routes are protected
router.use(protect);

// Placeholder routes
router.get('/', (req, res) => {
  res.json({ message: 'Subscriptions route' });
});

module.exports = router;