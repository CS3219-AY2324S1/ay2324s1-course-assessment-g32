require('dotenv').config({ path: `${__dirname}/../../.env` });

const REACT_APP_HOST = process.env.REACT_APP_HOST || 'http://localhost';

const USER_PORT = process.env.USER_PORT || 4001;

const AUTH_PORT = process.env.AUTH_PORT || 5001;
const AUTH_URL = REACT_APP_HOST + ':' + AUTH_PORT;

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
