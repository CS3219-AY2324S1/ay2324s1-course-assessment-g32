const cors = require('cors');
const express = require('express');
const bodyParser = require('body-parser');
const authRoutes = require('./AuthRoutes.js');
const env = require('./loadEnvironment.js');

console.log('Starting server ...');

// start the Express (web) server
const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use('/auth', authRoutes);
app.listen(env.AUTH_PORT, () => {
  console.log(`Server is running on port: ${env.AUTH_PORT}`);
});
