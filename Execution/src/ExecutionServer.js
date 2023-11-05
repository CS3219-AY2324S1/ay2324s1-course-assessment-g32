const cors = require('cors');
const express = require('express');
const bodyParser = require('body-parser');
const executionRoutes = require('./ExecutionRoutes');
const env = require('./loadEnvironment');

console.log('Starting ExecutionServer ...');

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use('/execute', executionRoutes);
app.listen(env.EXECUTION_PORT, () => {
  console.log(`ExecutionServer is running on port: ${env.EXECUTION_PORT}`);
});
