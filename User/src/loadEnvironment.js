require('dotenv').config({ path: `${__dirname}/../../.env` });

// Config for this service
const USER_PORT = process.env.USER_PORT || 4001;

// Dependency Config: Auth Service
const AUTH_HOST = process.env.AUTH_HOST || 'localhost';
const AUTH_PORT = process.env.AUTH_PORT || 5001;
const AUTH_URL = 'http://' + AUTH_HOST + ':' + AUTH_PORT;

// Dependency Config: MySQL
const mysqlDbName = process.env.MYSQL_DB_NAME || '';
const mysqlCreds = {
  port: process.env.MYSQL_PORT || 3306,
  host: process.env.MYSQL_HOST || 'localhost',
  user: process.env.MYSQL_USER || 'root',
  password: process.env.MYSQL_ROOT_PASSWORD || '',
};

module.exports = {
  USER_PORT,
  mysqlDbName,
  mysqlCreds,
  AUTH_URL,
};
