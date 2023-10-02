const cors = require('cors');
const express = require('express');
const mongoose = require('mongoose');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const userRoutes = require('./server/routes/user');
const questionRoutes = require('./server/routes/question');
const authorisationRoutes = require('./server/routes/authorisation');
const env = require('./loadEnvironment');

console.log('Starting server ...');
// start the Express (web) server
const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use('/user', userRoutes);
app.use('/question', questionRoutes);
app.use('/authorisation', authorisationRoutes);
app.listen(env.SERVER_PORT, () => {
  console.log(`Server is running on port: ${env.SERVER_PORT}`);
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
