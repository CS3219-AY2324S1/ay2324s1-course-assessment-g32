const cors = require('cors');
const express = require('express');
const mongoose = require('mongoose');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const authRoutes = require('./server/routes/auth.js');
const env = require('./loadEnvironment');

console.log('Starting server ...');

// start the Express (web) server
const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use('/auth', authRoutes);
app.listen(env.AUTH_PORT, () => {
  console.log(`Server is running on port: ${env.AUTH_PORT}`);
});

try {
  // MongoDB
  mongoose.connect(env.MONGO_CLIENT, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  const mongoDb = mongoose.connection;
  mongoDb.once('open', () => {
    console.log('SUCCESS: Connected to the MongoDB database');
  });
  mongoDb.on('error', (error) => {
    console.error('MongoDB database connection error:', error);
  });

  
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