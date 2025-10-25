const express = require('express');
const { getAnalytics } = require('../controllers/analytics');

const router = express.Router();

router.get('/', getAnalytics);

module.exports = router;