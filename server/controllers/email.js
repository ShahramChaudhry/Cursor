const nodemailer = require('nodemailer');
const cheerio = require('cheerio');
const Subscription = require('../models/Subscription');
const Transaction = require('../models/Transaction');
const User = require('../models/User');

// Email parsing patterns for UAE services
const SUBSCRIPTION_PATTERNS = {
  // UAE Telecom providers
  etisalat: {
    patterns: [
      /etisalat.*subscription/i,
      /etisalat.*renewal/i,
      /etisalat.*payment/i
    ],
    amountPattern: /AED\s*(\d+\.?\d*)/i,
    datePattern: /(\d{1,2}\/\d{1,2}\/\d{4})/i
  },
  du: {
    patterns: [
      /du.*subscription/i,
      /du.*renewal/i,
      /du.*payment/i
    ],
    amountPattern: /AED\s*(\d+\.?\d*)/i,
    datePattern: /(\d{1,2}\/\d{1,2}\/\d{4})/i
  },
  
  // Streaming services
  netflix: {
    patterns: [
      /netflix.*subscription/i,
      /netflix.*renewal/i,
      /netflix.*payment/i
    ],
    amountPattern: /USD\s*(\d+\.?\d*)|AED\s*(\d+\.?\d*)/i,
    datePattern: /(\d{1,2}\/\d{1,2}\/\d{4})/i
  },
  starzplay: {
    patterns: [
      /starzplay.*subscription/i,
      /starzplay.*renewal/i,
      /starzplay.*payment/i
    ],
    amountPattern: /AED\s*(\d+\.?\d*)/i,
    datePattern: /(\d{1,2}\/\d{1,2}\/\d{4})/i
  },
  
  // Software services
  adobe: {
    patterns: [
      /adobe.*subscription/i,
      /adobe.*renewal/i,
      /adobe.*payment/i
    ],
    amountPattern: /USD\s*(\d+\.?\d*)|AED\s*(\d+\.?\d*)/i,
    datePattern: /(\d{1,2}\/\d{1,2}\/\d{4})/i
  },
  
  // Generic patterns
  generic: {
    patterns: [
      /subscription.*renewal/i,
      /monthly.*payment/i,
      /recurring.*payment/i,
      /auto.*renewal/i
    ],
    amountPattern: /(\d+\.?\d*)\s*(USD|AED|EUR|GBP)/i,
    datePattern: /(\d{1,2}\/\d{1,2}\/\d{4})/i
  }
};

// @desc    Parse email for subscription information
// @route   POST /api/email/parse
// @access  Private
const parseEmail = async (req, res, next) => {
  try {
    const { emailContent, subject, from, date } = req.body;
    
    if (!emailContent || !subject) {
      return res.status(400).json({
        success: false,
        message: 'Email content and subject are required'
      });
    }

    const parsedData = await extractSubscriptionData(emailContent, subject, from, date);
    
    if (parsedData) {
      // Check if subscription already exists
      const existingSubscription = await Subscription.findOne({
        user: req.user.id,
        provider: parsedData.provider,
        externalId: parsedData.externalId
      });

      if (!existingSubscription) {
        // Create new subscription
        const subscription = await Subscription.create({
          user: req.user.id,
          name: parsedData.name,
          provider: parsedData.provider,
          amount: parsedData.amount,
          currency: parsedData.currency,
          billingCycle: parsedData.billingCycle,
          billingDate: parsedData.billingDate,
          nextBillingDate: parsedData.nextBillingDate,
          paymentMethod: parsedData.paymentMethod,
          paymentProvider: parsedData.paymentProvider,
          externalId: parsedData.externalId,
          source: 'email',
          confidence: parsedData.confidence
        });

        // Create transaction record
        await Transaction.create({
          user: req.user.id,
          subscription: subscription._id,
          amount: parsedData.amount,
          currency: parsedData.currency,
          transactionDate: parsedData.billingDate,
          description: subject,
          merchant: parsedData.provider,
          category: parsedData.category,
          paymentMethod: parsedData.paymentMethod,
          source: 'email',
          confidence: parsedData.confidence,
          metadata: {
            emailSubject: subject,
            emailFrom: from,
            rawData: parsedData.rawData
          }
        });

        res.status(201).json({
          success: true,
          message: 'Subscription created from email',
          data: subscription
        });
      } else {
        res.status(200).json({
          success: true,
          message: 'Subscription already exists',
          data: existingSubscription
        });
      }
    } else {
      res.status(200).json({
        success: true,
        message: 'No subscription data found in email'
      });
    }
  } catch (error) {
    next(error);
  }
};

// @desc    Connect email account for automatic parsing
// @route   POST /api/email/connect
// @access  Private
const connectEmailAccount = async (req, res, next) => {
  try {
    const { email, password, provider } = req.body;
    
    if (!email || !password || !provider) {
      return res.status(400).json({
        success: false,
        message: 'Email, password, and provider are required'
      });
    }

    // Test email connection
    const transporter = nodemailer.createTransporter({
      host: getEmailProviderHost(provider),
      port: 587,
      secure: false,
      auth: {
        user: email,
        pass: password
      }
    });

    await transporter.verify();

    // Add email account to user
    const user = await User.findById(req.user.id);
    user.emailAccounts.push({
      email,
      provider,
      isActive: true,
      lastSync: new Date()
    });

    await user.save();

    res.status(200).json({
      success: true,
      message: 'Email account connected successfully'
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Disconnect email account
// @route   DELETE /api/email/disconnect/:accountId
// @access  Private
const disconnectEmailAccount = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);
    const accountIndex = user.emailAccounts.findIndex(
      account => account._id.toString() === req.params.accountId
    );

    if (accountIndex === -1) {
      return res.status(404).json({
        success: false,
        message: 'Email account not found'
      });
    }

    user.emailAccounts[accountIndex].isActive = false;
    await user.save();

    res.status(200).json({
      success: true,
      message: 'Email account disconnected successfully'
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Sync emails for subscription detection
// @route   POST /api/email/sync/:accountId
// @access  Private
const syncEmails = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);
    const emailAccount = user.emailAccounts.find(
      account => account._id.toString() === req.params.accountId
    );

    if (!emailAccount) {
      return res.status(404).json({
        success: false,
        message: 'Email account not found'
      });
    }

    // Create email transporter
    const transporter = nodemailer.createTransporter({
      host: getEmailProviderHost(emailAccount.provider),
      port: 587,
      secure: false,
      auth: {
        user: emailAccount.email,
        pass: emailAccount.accessToken || 'password' // In real implementation, use OAuth
      }
    });

    // Search for subscription-related emails
    const emails = await transporter.search([
      ['FROM', 'noreply@'],
      ['OR', ['SUBJECT', 'subscription'], ['SUBJECT', 'renewal'], ['SUBJECT', 'payment']]
    ], { since: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) }); // Last 30 days

    let processedCount = 0;
    let subscriptionCount = 0;

    for (const email of emails) {
      try {
        const parsedData = await extractSubscriptionData(
          email.text,
          email.subject,
          email.from,
          email.date
        );

        if (parsedData) {
          // Check if subscription already exists
          const existingSubscription = await Subscription.findOne({
            user: req.user.id,
            provider: parsedData.provider,
            externalId: parsedData.externalId
          });

          if (!existingSubscription) {
            await Subscription.create({
              user: req.user.id,
              ...parsedData,
              source: 'email'
            });
            subscriptionCount++;
          }
        }
        processedCount++;
      } catch (error) {
        console.error('Error processing email:', error);
      }
    }

    // Update last sync time
    emailAccount.lastSync = new Date();
    await user.save();

    res.status(200).json({
      success: true,
      message: `Processed ${processedCount} emails, found ${subscriptionCount} new subscriptions`
    });
  } catch (error) {
    next(error);
  }
};

// Helper function to extract subscription data from email
const extractSubscriptionData = async (content, subject, from, date) => {
  const $ = cheerio.load(content);
  const textContent = $.text().toLowerCase();
  const subjectLower = subject.toLowerCase();

  // Find matching provider
  let matchedProvider = null;
  let providerData = null;

  for (const [provider, data] of Object.entries(SUBSCRIPTION_PATTERNS)) {
    for (const pattern of data.patterns) {
      if (pattern.test(textContent) || pattern.test(subjectLower)) {
        matchedProvider = provider;
        providerData = data;
        break;
      }
    }
    if (matchedProvider) break;
  }

  if (!matchedProvider) return null;

  // Extract amount
  const amountMatch = textContent.match(providerData.amountPattern);
  if (!amountMatch) return null;

  const amount = parseFloat(amountMatch[1] || amountMatch[2]);
  const currency = amountMatch[0].includes('AED') ? 'AED' : 
                   amountMatch[0].includes('USD') ? 'USD' : 'AED';

  // Extract date
  const dateMatch = textContent.match(providerData.datePattern);
  const billingDate = dateMatch ? new Date(dateMatch[1]) : new Date();

  // Determine billing cycle (simplified logic)
  const billingCycle = textContent.includes('monthly') ? 'monthly' :
                      textContent.includes('yearly') ? 'yearly' :
                      textContent.includes('weekly') ? 'weekly' : 'monthly';

  // Calculate next billing date
  const nextBillingDate = new Date(billingDate);
  switch (billingCycle) {
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

  // Determine category
  const category = getCategoryFromProvider(matchedProvider);

  return {
    name: `${matchedProvider} Subscription`,
    provider: matchedProvider,
    amount,
    currency,
    billingCycle,
    billingDate,
    nextBillingDate,
    paymentMethod: 'credit_card', // Default assumption
    paymentProvider: 'stripe', // Default assumption
    externalId: `${matchedProvider}_${Date.now()}`,
    category,
    confidence: 85, // High confidence for matched patterns
    rawData: {
      subject,
      from,
      date,
      content: textContent.substring(0, 500) // First 500 chars
    }
  };
};

// Helper function to get email provider host
const getEmailProviderHost = (provider) => {
  const hosts = {
    gmail: 'smtp.gmail.com',
    outlook: 'smtp-mail.outlook.com',
    yahoo: 'smtp.mail.yahoo.com'
  };
  return hosts[provider] || 'smtp.gmail.com';
};

// Helper function to determine category from provider
const getCategoryFromProvider = (provider) => {
  const categories = {
    etisalat: 'telecom',
    du: 'telecom',
    netflix: 'streaming',
    starzplay: 'streaming',
    adobe: 'software',
    microsoft: 'software',
    apple: 'software'
  };
  return categories[provider] || 'other';
};

module.exports = {
  parseEmail,
  connectEmailAccount,
  disconnectEmailAccount,
  syncEmails
};
