require('dotenv').config({ path: `${__dirname}/../.env` });

const WEB_PORT = process.env.WEB_PORT || 3000;
const AUTH_PORT = process.env.AUTH_PORT || 5001;

const MONGO_CLIENT = process.env.ATLAS_URI || '';

const mysqlDbName = process.env.MY_SQL_DB_NAME || '';
const mysqlCreds = {
  port: process.env.MY_SQL_PORT || 3306,
  host: process.env.MY_SQL_HOST || 'localhost',
  user: process.env.MY_SQL_USER || 'root',
  password: process.env.MY_SQL_PWD || '',
};

const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY || '';

module.exports = {
  WEB_PORT,
  AUTH_PORT,
  MONGO_CLIENT,
  mysqlDbName,
  mysqlCreds,
  JWT_SECRET_KEY,
};
