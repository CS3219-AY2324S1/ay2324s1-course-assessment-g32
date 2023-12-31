const Status = {
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  REQUEST_TIMEOUT: 408,
  CONFLICT: 409,
  GONE: 410,
  INTERNAL_SERVER_ERROR: 500,
};

// MySQL connection
const MAX_CONNECTION_ATTEMPTS = 20;
const CONNECTION_INTERVAL = 5000;

// Email validation regex
const EMAIL_REGEX = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;

const MIN_PASSWORD_LENGTH = 8;
const BCRYPT_SALT_ROUNDS = 10;

module.exports = {
  Status,
  EMAIL_REGEX,
  MIN_PASSWORD_LENGTH,
  BCRYPT_SALT_ROUNDS,
};
