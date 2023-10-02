require('dotenv').config({ path: `${__dirname}/../.env` });

const WEB_PORT = process.env.WEB_PORT || 3000;
const AUTH_PORT = process.env.AUTH_PORT || 5001;

const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY || '';

module.exports = {
  WEB_PORT,
  AUTH_PORT,
  JWT_SECRET_KEY,
};
