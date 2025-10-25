const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: true
  },
  subscription: {
    type: mongoose.Schema.ObjectId,
    ref: 'Subscription',
    required: true
  },
  amount: {
    type: Number,
    required: true
  },
  currency: {
    type: String,
    default: 'AED'
  },
  transactionDate: {
    type: Date,
    required: true
  },
  description: {
    type: String,
    trim: true
  },
  merchant: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  paymentMethod: {
    type: String,
    required: true
  },
  status: {
    type: String,
    enum: ['completed', 'pending', 'failed', 'refunded'],
    default: 'completed'
  },
  externalTransactionId: {
    type: String,
    sparse: true
  },
  bankTransactionId: {
    type: String,
    sparse: true
  },
  source: {
    type: String,
    enum: ['bank', 'email', 'manual', 'api'],
    required: true
  },
  confidence: {
    type: Number,
    min: 0,
    max: 100,
    default: 100
  },
  metadata: {
    originalDescription: String,
    bankReference: String,
    emailSubject: String,
    rawData: mongoose.Schema.Types.Mixed
  }
}, {
  timestamps: true
});

// Indexes for efficient queries
transactionSchema.index({ user: 1, transactionDate: -1 });
transactionSchema.index({ subscription: 1 });
transactionSchema.index({ merchant: 1 });
transactionSchema.index({ category: 1 });

module.exports = mongoose.model('Transaction', transactionSchema);
