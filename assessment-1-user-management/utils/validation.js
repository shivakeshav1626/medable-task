const validator = require('validator');

const MIN_PASSWORD_LENGTH = 8;

function isValidEmail(email) {
  return typeof email === 'string' && validator.isEmail(email);
}

function isValidPassword(password) {
  return typeof password === 'string' && password.trim().length >= MIN_PASSWORD_LENGTH;
}

function normalizeEmail(email) {
  return typeof email === 'string' ? email.trim().toLowerCase() : '';
}

module.exports = {
  isValidEmail,
  isValidPassword,
  normalizeEmail,
  MIN_PASSWORD_LENGTH
};
