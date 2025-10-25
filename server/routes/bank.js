const express = require('express');

const router = express.Router();

// Placeholder routes for demo
router.get('/accounts', (req, res) => {
  res.json({ success: true, data: [] });
});

router.post('/connect', (req, res) => {
  res.json({ success: true, message: 'Bank connection demo' });
});

module.exports = router;