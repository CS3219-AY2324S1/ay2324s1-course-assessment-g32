require('dotenv').config({ path: `${__dirname}/../.env` });

const REACT_APP_HOST = process.env.REACT_APP_HOST || 'http://localhost';

const HISTORY_PORT = process.env.HISTORY_PORT || 9001;

const HISTORY_URL = REACT_APP_HOST + ':' + HISTORY_PORT;

const mysqlDbName = process.env.MY_SQL_DB_NAME || '';
const mysqlCreds = {
  port: process.env.MY_SQL_PORT || 3306,
  host: process.env.MY_SQL_HOST || 'localhost',
  user: process.env.MY_SQL_USER || 'root',
  password: process.env.MY_SQL_PWD || '',
};

module.exports = {
  HISTORY_PORT,
  mysqlDbName,
  mysqlCreds,
  HISTORY_URL,
};
