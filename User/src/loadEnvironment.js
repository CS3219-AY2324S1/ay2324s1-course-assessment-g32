require('dotenv').config({ path: `${__dirname}/../../.env` });

<<<<<<< HEAD
const REACT_APP_HOST = process.env.REACT_APP_HOST || 'http://localhost';

const USER_PORT = process.env.USER_PORT || 4001;

const AUTH_PORT = process.env.AUTH_PORT || 5001;
const AUTH_URL = REACT_APP_HOST + ':' + AUTH_PORT;

const mysqlDbName = process.env.MY_SQL_DB_NAME || '';
const mysqlCreds = {
  port: process.env.MY_SQL_PORT || 3306,
  host: process.env.MY_SQL_HOST || 'localhost',
  user: process.env.MY_SQL_USER || 'root',
  password: process.env.MY_SQL_PWD || '',
=======
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
>>>>>>> assignment-4
};

module.exports = {
  USER_PORT,
  mysqlDbName,
  mysqlCreds,
  AUTH_URL,
};
