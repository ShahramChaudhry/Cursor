const jwt = require('jsonwebtoken');

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET || 'sabless_secret', {
    expiresIn: '30d'
  });
};

module.exports = generateToken;