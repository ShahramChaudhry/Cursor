// Copy the auth controller content to subscriptions controller
const { getSubscriptions, createSubscription, getAnalytics } = require('./auth');

module.exports = {
  getSubscriptions,
  createSubscription,
  getAnalytics
};