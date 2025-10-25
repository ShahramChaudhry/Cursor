const express = require('express');
const { getSubscriptions, createSubscription, getAnalytics } = require('../controllers/subscriptions');

const router = express.Router();

// All routes are public for demo
router.get('/', getSubscriptions);
router.post('/', createSubscription);
router.get('/analytics', getAnalytics);

module.exports = router;