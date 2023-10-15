const cors = require('cors');
const express = require('express');
const bodyParser = require('body-parser');
const authRoutes = require('./server/route/auth.js');
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
