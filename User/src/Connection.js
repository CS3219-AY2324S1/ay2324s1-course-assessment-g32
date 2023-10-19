const mysql = require('mysql2');
const env = require('./loadEnvironment.js');

const mysqlDb = mysql.createPool({
  ...env.mysqlCreds,
  ...{ database: env.mysqlDbName },
});

module.exports = mysqlDb;
