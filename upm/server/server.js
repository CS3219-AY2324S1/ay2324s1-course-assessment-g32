const cors = require('cors');
const mysql = require('mysql2');
const express = require("express");
const bodyParser = require('body-parser');
const userRoutes = require('./userRoutes');
const env = require('./loadEnvironment');

// start the Express (web) server
const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use('/user', userRoutes);
app.listen(env.SERVER_PORT, () => {
  console.log(`Server listening on ${env.SERVER_PORT}`);
});

try {
  // MySQL
  const mysqlDb = mysql.createConnection({
    ...env.mysqlCreds,
    ...{database: env.mysqlDbName}
  });

  mysqlDb.connect((error) => {
    if (error) 
      throw new Error('MySQL database connection error:' + error.message);
    console.log('SUCCESS: Connected to the MySQL database');
  });
}
catch(err) {
  console.error(err);
}