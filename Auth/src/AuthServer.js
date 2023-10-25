const cors = require('cors');
const express = require('express');
const bodyParser = require('body-parser');
const authRoutes = require('./AuthRoutes');
const env = require('./loadEnvironment');

console.log('Starting AuthServer ...');

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use('/auth', authRoutes);
app.listen(env.AUTH_PORT, () => {
  console.log(`AuthServer is running on port: ${env.AUTH_PORT}`);
});
