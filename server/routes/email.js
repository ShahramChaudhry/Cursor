const express = require('express');

const router = express.Router();

// Placeholder routes
router.get('/', (req, res) => {
  res.json({ message: 'Email parsing route' });
});

module.exports = router;