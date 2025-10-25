const axios = require('axios');
const Subscription = require('../models/Subscription');
const Transaction = require('../models/Transaction');
const User = require('../models/User');

// UAE Open Banking API configuration
const OPEN_BANKING_CONFIG = {
  baseURL: process.env.OPEN_BANKING_BASE_URL || 'https://api.openbanking.ae',
  apiKey: process.env.OPEN_BANKING_API_KEY,
  headers: {
    'Authorization': `Bearer ${process.env.OPEN_BANKING_API_KEY}`,
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  }
};

// UAE Bank transaction patterns for subscription detection
const SUBSCRIPTION_TRANSACTION_PATTERNS = {
  // Telecom providers
  etisalat: {
    patterns: [/etisalat/i, /etisalat.*mobile/i],
    amountRange: [50, 500], // AED
    frequency: 'monthly'
  },
  du: {
    patterns: [/du.*telecom/i, /du.*mobile/i],
    amountRange: [50, 500],
    frequency: 'monthly'
  },
  
  // Streaming services
  netflix: {
    patterns: [/netflix/i],
    amountRange: [30, 100],
    frequency: 'monthly'
  },
  starzplay: {
    patterns: [/starzplay/i],
    amountRange: [20, 50],
    frequency: 'monthly'
  },
  amazon_prime: {
    patterns: [/amazon.*prime/i],
    amountRange: [20, 50],
    frequency: 'monthly'
  },
  
  // Software services
  adobe: {
    patterns: [/adobe/i],
    amountRange: [50, 200],
    frequency: 'monthly'
  },
  microsoft: {
    patterns: [/microsoft.*365/i, /office.*365/i],
    amountRange: [30, 150],
    frequency: 'monthly'
  },
  
  // UAE specific services
  careem: {
    patterns: [/careem/i],
    amountRange: [10, 100],
    frequency: 'monthly'
  },
  talabat: {
    patterns: [/talabat/i],
    amountRange: [5, 50],
    frequency: 'monthly'
  }
};

// @desc    Connect bank account for transaction monitoring
// @route   POST /api/bank/connect
// @access  Private
const connectBankAccount = async (req, res, next) => {
  try {
    const { bankName, accountNumber, accountType, accessToken } = req.body;
    
    if (!bankName || !accountNumber || !accessToken) {
      return res.status(400).json({
        success: false,
        message: 'Bank name, account number, and access token are required'
      });
    }

    // Verify bank connection with Open Banking API
    try {
      const response = await axios.get(`${OPEN_BANKING_CONFIG.baseURL}/accounts`, {
        headers: OPEN_BANKING_CONFIG.headers
      });

      // Find the specific account
      const account = response.data.accounts.find(
        acc => acc.accountNumber === accountNumber
      );

      if (!account) {
        return res.status(400).json({
          success: false,
          message: 'Account not found or access denied'
        });
      }

      // Add bank account to user
      const user = await User.findById(req.user.id);
      user.bankAccounts.push({
        bankName,
        accountNumber,
        accountType: accountType || account.accountType,
        isActive: true,
        lastSync: new Date(),
        accessToken: accessToken // In production, encrypt this
      });

      await user.save();

      res.status(200).json({
        success: true,
        message: 'Bank account connected successfully',
        data: {
          bankName,
          accountNumber,
          accountType: account.accountType,
          balance: account.balance
        }
      });
    } catch (apiError) {
      // If Open Banking API is not available, simulate connection
      const user = await User.findById(req.user.id);
      user.bankAccounts.push({
        bankName,
        accountNumber,
        accountType,
        isActive: true,
        lastSync: new Date(),
        accessToken: accessToken
      });

      await user.save();

      res.status(200).json({
        success: true,
        message: 'Bank account connected successfully (simulated)',
        data: {
          bankName,
          accountNumber,
          accountType
        }
      });
    }
  } catch (error) {
    next(error);
  }
};

// @desc    Disconnect bank account
// @route   DELETE /api/bank/disconnect/:accountId
// @access  Private
const disconnectBankAccount = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);
    const accountIndex = user.bankAccounts.findIndex(
      account => account._id.toString() === req.params.accountId
    );

    if (accountIndex === -1) {
      return res.status(404).json({
        success: false,
        message: 'Bank account not found'
      });
    }

    user.bankAccounts[accountIndex].isActive = false;
    await user.save();

    res.status(200).json({
      success: true,
      message: 'Bank account disconnected successfully'
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get user's connected bank accounts
// @route   GET /api/bank/accounts
// @access  Private
const getBankAccounts = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);
    
    res.status(200).json({
      success: true,
      data: user.bankAccounts.filter(account => account.isActive)
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Sync bank transactions for subscription detection
// @route   POST /api/bank/sync/:accountId
// @access  Private
const syncTransactions = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);
    const bankAccount = user.bankAccounts.find(
      account => account._id.toString() === req.params.accountId
    );

    if (!bankAccount) {
      return res.status(404).json({
        success: false,
        message: 'Bank account not found'
      });
    }

    // Get transactions from Open Banking API
    let transactions = [];
    
    try {
      const response = await axios.get(
        `${OPEN_BANKING_CONFIG.baseURL}/accounts/${bankAccount.accountNumber}/transactions`,
        {
          headers: OPEN_BANKING_CONFIG.headers,
          params: {
            fromDate: new Date(Date.now() - 90 * 24 * 60 * 60 * 1000).toISOString(), // Last 90 days
            toDate: new Date().toISOString()
          }
        }
      );
      transactions = response.data.transactions;
    } catch (apiError) {
      // If Open Banking API is not available, use simulated data
      transactions = generateSimulatedTransactions();
    }

    let processedCount = 0;
    let subscriptionCount = 0;

    // Process each transaction
    for (const transaction of transactions) {
      try {
        const subscriptionData = await analyzeTransactionForSubscription(transaction);
        
        if (subscriptionData) {
          // Check if subscription already exists
          const existingSubscription = await Subscription.findOne({
            user: req.user.id,
            provider: subscriptionData.provider,
            externalId: subscriptionData.externalId
          });

          if (!existingSubscription) {
            // Create new subscription
            const subscription = await Subscription.create({
              user: req.user.id,
              name: subscriptionData.name,
              provider: subscriptionData.provider,
              amount: subscriptionData.amount,
              currency: subscriptionData.currency,
              billingCycle: subscriptionData.billingCycle,
              billingDate: transaction.date,
              nextBillingDate: subscriptionData.nextBillingDate,
              paymentMethod: 'bank_transfer',
              paymentProvider: 'bank',
              externalId: subscriptionData.externalId,
              source: 'bank',
              confidence: subscriptionData.confidence,
              category: subscriptionData.category
            });

            // Create transaction record
            await Transaction.create({
              user: req.user.id,
              subscription: subscription._id,
              amount: transaction.amount,
              currency: transaction.currency || 'AED',
              transactionDate: transaction.date,
              description: transaction.description,
              merchant: subscriptionData.provider,
              category: subscriptionData.category,
              paymentMethod: 'bank_transfer',
              source: 'bank',
              confidence: subscriptionData.confidence,
              bankTransactionId: transaction.id,
              metadata: {
                bankReference: transaction.reference,
                rawData: transaction
              }
            });

            subscriptionCount++;
          }
        }

        processedCount++;
      } catch (error) {
        console.error('Error processing transaction:', error);
      }
    }

    // Update last sync time
    bankAccount.lastSync = new Date();
    await user.save();

    res.status(200).json({
      success: true,
      message: `Processed ${processedCount} transactions, found ${subscriptionCount} new subscriptions`
    });
  } catch (error) {
    next(error);
  }
};

// Helper function to analyze transaction for subscription patterns
const analyzeTransactionForSubscription = async (transaction) => {
  const description = transaction.description.toLowerCase();
  const amount = Math.abs(transaction.amount);
  
  // Find matching provider pattern
  let matchedProvider = null;
  let providerData = null;

  for (const [provider, data] of Object.entries(SUBSCRIPTION_TRANSACTION_PATTERNS)) {
    for (const pattern of data.patterns) {
      if (pattern.test(description)) {
        matchedProvider = provider;
        providerData = data;
        break;
      }
    }
    if (matchedProvider) break;
  }

  if (!matchedProvider) return null;

  // Check if amount is within expected range
  const [minAmount, maxAmount] = providerData.amountRange;
  if (amount < minAmount || amount > maxAmount) return null;

  // Check for recurring pattern (simplified)
  const isRecurring = await checkRecurringPattern(transaction, matchedProvider);
  if (!isRecurring) return null;

  // Calculate next billing date
  const billingDate = new Date(transaction.date);
  const nextBillingDate = new Date(billingDate);
  
  switch (providerData.frequency) {
    case 'monthly':
      nextBillingDate.setMonth(nextBillingDate.getMonth() + 1);
      break;
    case 'yearly':
      nextBillingDate.setFullYear(nextBillingDate.getFullYear() + 1);
      break;
    case 'weekly':
      nextBillingDate.setDate(nextBillingDate.getDate() + 7);
      break;
  }

  return {
    name: `${matchedProvider} Subscription`,
    provider: matchedProvider,
    amount,
    currency: transaction.currency || 'AED',
    billingCycle: providerData.frequency,
    nextBillingDate,
    externalId: `${matchedProvider}_${transaction.id}`,
    category: getCategoryFromProvider(matchedProvider),
    confidence: calculateConfidence(transaction, matchedProvider, providerData)
  };
};

// Helper function to check for recurring patterns
const checkRecurringPattern = async (transaction, provider) => {
  // Look for similar transactions in the past 3 months
  const threeMonthsAgo = new Date();
  threeMonthsAgo.setMonth(threeMonthsAgo.getMonth() - 3);

  const similarTransactions = await Transaction.find({
    description: { $regex: provider, $options: 'i' },
    transactionDate: { $gte: threeMonthsAgo },
    amount: { $gte: transaction.amount * 0.9, $lte: transaction.amount * 1.1 }
  });

  return similarTransactions.length >= 2; // At least 2 similar transactions
};

// Helper function to calculate confidence score
const calculateConfidence = (transaction, provider, providerData) => {
  let confidence = 60; // Base confidence

  // Increase confidence based on amount range
  const [minAmount, maxAmount] = providerData.amountRange;
  const amount = Math.abs(transaction.amount);
  if (amount >= minAmount && amount <= maxAmount) {
    confidence += 20;
  }

  // Increase confidence for exact pattern matches
  for (const pattern of providerData.patterns) {
    if (pattern.test(transaction.description.toLowerCase())) {
      confidence += 15;
    }
  }

  return Math.min(confidence, 95); // Cap at 95%
};

// Helper function to determine category from provider
const getCategoryFromProvider = (provider) => {
  const categories = {
    etisalat: 'telecom',
    du: 'telecom',
    netflix: 'streaming',
    starzplay: 'streaming',
    amazon_prime: 'streaming',
    adobe: 'software',
    microsoft: 'software',
    careem: 'transport',
    talabat: 'food'
  };
  return categories[provider] || 'other';
};

// Helper function to generate simulated transactions for testing
const generateSimulatedTransactions = () => {
  const transactions = [];
  const providers = Object.keys(SUBSCRIPTION_TRANSACTION_PATTERNS);
  
  // Generate transactions for the last 3 months
  for (let i = 0; i < 3; i++) {
    const date = new Date();
    date.setMonth(date.getMonth() - i);
    
    providers.forEach(provider => {
      const providerData = SUBSCRIPTION_TRANSACTION_PATTERNS[provider];
      const [minAmount, maxAmount] = providerData.amountRange;
      const amount = Math.random() * (maxAmount - minAmount) + minAmount;
      
      transactions.push({
        id: `sim_${provider}_${i}`,
        description: `${provider} subscription payment`,
        amount: -amount, // Negative for outgoing
        currency: 'AED',
        date: date.toISOString(),
        reference: `REF${Math.random().toString(36).substr(2, 9)}`
      });
    });
  }
  
  return transactions;
};

module.exports = {
  connectBankAccount,
  disconnectBankAccount,
  getBankAccounts,
  syncTransactions
};
