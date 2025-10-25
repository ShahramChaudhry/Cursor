const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const generateToken = require('../utils/generateToken');

// @desc    Register user
// @route   POST /auth/register
// @access  Public
const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check if user exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({
        success: false,
        message: 'User already exists'
      });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create user
    const user = await User.create({
      name,
      email,
      password: hashedPassword
    });

    if (user) {
      const token = generateToken(user._id);
      res.status(201).json({
        success: true,
        token,
        user: {
          id: user._id,
          name: user.name,
          email: user.email
        }
      });
    } else {
      res.status(400).json({
        success: false,
        message: 'Invalid user data'
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

// @desc    Login user
// @route   POST /auth/login
// @access  Public
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check for user
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials'
      });
    }

    // Check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials'
      });
    }

    const token = generateToken(user._id);
    res.status(200).json({
      success: true,
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

// @desc    Get user profile
// @route   GET /auth/profile
// @access  Private
const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    res.status(200).json({
      success: true,
      data: user
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

// Subscriptions controller
const getSubscriptions = async (req, res) => {
  const demoSubscriptions = [
    {
      id: '1',
      name: 'Du Mobile',
      provider: 'Du',
      amount: 175,
      currency: 'AED',
      nextBillingDate: '2024-11-01',
      status: 'active',
      category: 'utilities',
      icon: 'D',
      iconColor: '#FF6B35'
    },
    {
      id: '2',
      name: 'Netflix',
      provider: 'Netflix',
      amount: 39,
      currency: 'AED',
      nextBillingDate: '2024-11-05',
      status: 'active',
      category: 'entertainment',
      icon: 'N',
      iconColor: '#E50914'
    },
    {
      id: '3',
      name: 'Starzplay',
      provider: 'Starzplay',
      amount: 19,
      currency: 'AED',
      nextBillingDate: '2024-11-08',
      status: 'active',
      category: 'entertainment',
      icon: 'S',
      iconColor: '#000000'
    },
    {
      id: '4',
      name: 'Spotify',
      provider: 'Spotify',
      amount: 29,
      currency: 'AED',
      nextBillingDate: '2024-11-12',
      status: 'active',
      category: 'music',
      icon: 'S',
      iconColor: '#1DB954'
    },
    {
      id: '5',
      name: 'Adobe Creative Cloud',
      provider: 'Adobe',
      amount: 149,
      currency: 'AED',
      nextBillingDate: '2024-11-15',
      status: 'active',
      category: 'software',
      icon: 'A',
      iconColor: '#FF0000'
    },
    {
      id: '6',
      name: 'YouTube Premium',
      provider: 'YouTube',
      amount: 25,
      currency: 'AED',
      nextBillingDate: '2024-11-20',
      status: 'trial',
      category: 'entertainment',
      icon: 'Y',
      iconColor: '#FF0000',
      trialEndsIn: 3
    }
  ];

  res.status(200).json({
    success: true,
    count: demoSubscriptions.length,
    data: demoSubscriptions
  });
};

const getAnalytics = async (req, res) => {
  res.status(200).json({
    success: true,
    data: {
      totalSubscriptions: 6,
      activeSubscriptions: 5,
      totalMonthlyCost: 411,
      totalYearlyCost: 4932,
      categoryBreakdown: {
        utilities: { count: 1, amount: 175 },
        entertainment: { count: 3, amount: 83 },
        music: { count: 1, amount: 29 },
        software: { count: 1, amount: 149 }
      },
      upcomingPayments: [
        { name: 'Du Mobile', date: '1 Nov', amount: 175 },
        { name: 'Netflix', date: '5 Nov', amount: 39 },
        { name: 'Starzplay', date: '8 Nov', amount: 19 }
      ]
    }
  });
};

module.exports = {
  register,
  login,
  getProfile,
  getSubscriptions,
  getAnalytics
};