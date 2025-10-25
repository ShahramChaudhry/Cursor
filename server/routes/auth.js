const express = require('express');
const { register, login, getProfile, getSubscriptions, getAnalytics } = require('../controllers/auth');
const { protect } = require('../middleware/auth');

const router = express.Router();

// Public routes
router.post('/register', register);
router.post('/login', login);

// Protected routes
router.get('/profile', protect, getProfile);
router.get('/subscriptions', protect, getSubscriptions);
router.get('/analytics', protect, getAnalytics);

module.exports = router;