const mongoose = require('mongoose');

const subscriptionSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: true
  },
  name: {
    type: String,
    required: [true, 'Please add a subscription name'],
    trim: true
  },
  description: {
    type: String,
    trim: true
  },
  category: {
    type: String,
    required: true,
    enum: [
      'streaming', 'music', 'software', 'gaming', 'fitness', 
      'news', 'cloud', 'security', 'productivity', 'education',
      'food', 'transport', 'utilities', 'telecom', 'other'
    ]
  },
  provider: {
    type: String,
    required: true,
    trim: true
  },
  amount: {
    type: Number,
    required: [true, 'Please add subscription amount'],
    min: [0, 'Amount cannot be negative']
  },
  currency: {
    type: String,
    default: 'AED',
    enum: ['AED', 'USD', 'EUR', 'GBP']
  },
  billingCycle: {
    type: String,
    required: true,
    enum: ['weekly', 'monthly', 'quarterly', 'yearly']
  },
  billingDate: {
    type: Date,
    required: true
  },
  nextBillingDate: {
    type: Date,
    required: true
  },
  status: {
    type: String,
    enum: ['active', 'paused', 'cancelled', 'expired', 'trial'],
    default: 'active'
  },
  isTrial: {
    type: Boolean,
    default: false
  },
  trialEndDate: Date,
  autoRenew: {
    type: Boolean,
    default: true
  },
  paymentMethod: {
    type: String,
    enum: ['credit_card', 'debit_card', 'bank_transfer', 'paypal', 'apple_pay', 'google_pay', 'other'],
    required: true
  },
  paymentProvider: {
    type: String,
    enum: ['stripe', 'paypal', 'apple', 'google', 'bank', 'other'],
    required: true
  },
  externalId: {
    type: String, // ID from payment provider
    sparse: true
  },
  tags: [{
    type: String,
    trim: true
  }],
  notes: {
    type: String,
    trim: true
  },
  usage: {
    lastUsed: Date,
    usageCount: {
      type: Number,
      default: 0
    },
    usageFrequency: {
      type: String,
      enum: ['daily', 'weekly', 'monthly', 'rarely', 'never'],
      default: 'monthly'
    }
  },
  cancellation: {
    cancelledAt: Date,
    cancellationReason: String,
    effectiveDate: Date
  },
  priceHistory: [{
    amount: Number,
    currency: String,
    changedAt: Date,
    reason: String
  }],
  reminders: [{
    type: {
      type: String,
      enum: ['payment_due', 'trial_ending', 'price_change', 'usage_low']
    },
    daysBefore: Number,
    isActive: {
      type: Boolean,
      default: true
    }
  }],
  metadata: {
    website: String,
    supportEmail: String,
    phone: String,
    logo: String,
    color: String
  },
  isShared: {
    type: Boolean,
    default: false
  },
  sharedWith: [{
    user: {
      type: mongoose.Schema.ObjectId,
      ref: 'User'
    },
    role: {
      type: String,
      enum: ['viewer', 'editor'],
      default: 'viewer'
    },
    addedAt: {
      type: Date,
      default: Date.now
    }
  }],
  source: {
    type: String,
    enum: ['manual', 'email', 'bank', 'api'],
    default: 'manual'
  },
  confidence: {
    type: Number,
    min: 0,
    max: 100,
    default: 100
  }
}, {
  timestamps: true
});

// Index for efficient queries
subscriptionSchema.index({ user: 1, status: 1 });
subscriptionSchema.index({ nextBillingDate: 1 });
subscriptionSchema.index({ category: 1 });
subscriptionSchema.index({ provider: 1 });

// Virtual for total cost per year
subscriptionSchema.virtual('yearlyCost').get(function() {
  const cyclesPerYear = {
    weekly: 52,
    monthly: 12,
    quarterly: 4,
    yearly: 1
  };
  return this.amount * cyclesPerYear[this.billingCycle];
});

// Method to calculate next billing date
subscriptionSchema.methods.calculateNextBilling = function() {
  const now = new Date();
  const billingDate = new Date(this.billingDate);
  
  let nextBilling = new Date(billingDate);
  
  while (nextBilling <= now) {
    switch (this.billingCycle) {
      case 'weekly':
        nextBilling.setDate(nextBilling.getDate() + 7);
        break;
      case 'monthly':
        nextBilling.setMonth(nextBilling.getMonth() + 1);
        break;
      case 'quarterly':
        nextBilling.setMonth(nextBilling.getMonth() + 3);
        break;
      case 'yearly':
        nextBilling.setFullYear(nextBilling.getFullYear() + 1);
        break;
    }
  }
  
  return nextBilling;
};

module.exports = mongoose.model('Subscription', subscriptionSchema);
