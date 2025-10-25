// Demo controllers for سبLess

// Auth controller
const register = async (req, res) => {
  res.status(201).json({
    success: true,
    token: 'demo-token',
    user: {
      id: 'demo-user',
      name: req.body.name,
      email: req.body.email,
      role: 'user'
    }
  });
};

const login = async (req, res) => {
  res.status(200).json({
    success: true,
    token: 'demo-token',
    user: {
      id: 'demo-user',
      name: 'Demo User',
      email: req.body.email,
      role: 'user'
    }
  });
};

const logout = async (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Logged out successfully'
  });
};

const getMe = async (req, res) => {
  res.status(200).json({
    success: true,
    user: {
      id: 'demo-user',
      name: 'Demo User',
      email: 'demo@example.com',
      role: 'user'
    }
  });
};

// Subscriptions controller
const getSubscriptions = async (req, res) => {
  const demoSubscriptions = [
    {
      id: '1',
      name: 'Netflix Premium',
      provider: 'Netflix',
      amount: 55,
      currency: 'AED',
      nextBillingDate: '2024-01-15',
      status: 'active',
      category: 'streaming'
    },
    {
      id: '2',
      name: 'Spotify Premium',
      provider: 'Spotify',
      amount: 25,
      currency: 'AED',
      nextBillingDate: '2024-01-20',
      status: 'active',
      category: 'music'
    },
    {
      id: '3',
      name: 'Adobe Creative Cloud',
      provider: 'Adobe',
      amount: 120,
      currency: 'AED',
      nextBillingDate: '2024-01-25',
      status: 'active',
      category: 'software'
    },
    {
      id: '4',
      name: 'Etisalat Mobile',
      provider: 'Etisalat',
      amount: 150,
      currency: 'AED',
      nextBillingDate: '2024-01-10',
      status: 'active',
      category: 'telecom'
    },
    {
      id: '5',
      name: 'Starzplay',
      provider: 'Starzplay',
      amount: 35,
      currency: 'AED',
      nextBillingDate: '2024-01-18',
      status: 'trial',
      category: 'streaming'
    }
  ];

  res.status(200).json({
    success: true,
    count: demoSubscriptions.length,
    data: demoSubscriptions
  });
};

const createSubscription = async (req, res) => {
  res.status(201).json({
    success: true,
    data: {
      id: Date.now().toString(),
      ...req.body,
      status: 'active'
    }
  });
};

const getAnalytics = async (req, res) => {
  res.status(200).json({
    success: true,
    data: {
      totalSubscriptions: 12,
      activeSubscriptions: 10,
      totalMonthlyCost: 450,
      totalYearlyCost: 5400,
      categoryBreakdown: {
        streaming: { count: 3, amount: 90 },
        music: { count: 1, amount: 25 },
        software: { count: 1, amount: 120 },
        telecom: { count: 1, amount: 150 }
      }
    }
  });
};

module.exports = {
  register,
  login,
  logout,
  getMe,
  getSubscriptions,
  createSubscription,
  getAnalytics
};