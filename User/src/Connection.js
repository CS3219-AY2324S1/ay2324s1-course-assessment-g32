const mysql = require('mysql2');
const env = require('./loadEnvironment.js');

const mysqlDb = mysql.createPool({
  ...env.mysqlCreds,
  ...{ database: env.mysqlDbName },
});

mysqlDb.on('error', err => {
  console.error('MySQL', err);
});

module.exports = mysqlDb;
