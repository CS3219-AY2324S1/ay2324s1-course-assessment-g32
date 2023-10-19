const cors = require('cors');
const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const historyRoutes = require('./HistoryRoutes.js');
const env = require('./loadEnvironment.js');

console.log('Starting HistoryServer...');

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use('/history', historyRoutes);
app.listen(env.HISTORY_PORT, () => {
  console.log(`HistoryServer is running on port: ${env.HISTORY_PORT}`);
});

try {
  const mysqlDb = mysql.createConnection({
    ...env.mysqlCreds,
    ...{ database: env.mysqlDbName },
  });

  mysqlDb.connect((error) => {
    if (error)
      throw new Error('MySQL database connection error:' + error.message);
    console.log('SUCCESS: Connected to the MySQL database');
  });
} catch (err) {
  console.error(err);
}
