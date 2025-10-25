const express = require('express');
const { register, login, logout, getMe } = require('../controllers/auth');

const router = express.Router();

// Public routes
router.post('/register', register);
router.post('/login', login);

// Protected routes (simplified for demo)
router.get('/logout', logout);
router.get('/me', getMe);

module.exports = router;