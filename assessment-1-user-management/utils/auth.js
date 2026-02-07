const jwt = require('jsonwebtoken');
const { getJwtSecret } = require('../middleware/auth');

function signToken(payload) {
  const secret = getJwtSecret();
  if (!secret) {
    return null;
  }

  return jwt.sign(payload, secret, { expiresIn: '24h' });
}

module.exports = {
  signToken
};
