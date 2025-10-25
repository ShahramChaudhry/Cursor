const express = require('express');

const router = express.Router();

// Placeholder routes for demo
router.post('/parse', (req, res) => {
  res.json({ success: true, message: 'Email parsing demo' });
});

router.post('/connect', (req, res) => {
  res.json({ success: true, message: 'Email connection demo' });
});

module.exports = router;