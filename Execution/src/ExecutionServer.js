const cors = require('cors');
const express = require('express');
const bodyParser = require('body-parser');
const executionRoutes = require('./ExecutionRoutes');
const env = require('./loadEnvironment');
const logger = require('./Log');

logger.register({
  serviceName: 'Execution Service',
  logLevel: logger.LOG_LEVELS.all,
});

logger.log('Starting ...');

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use('/execute', executionRoutes);
app.listen(env.EXECUTION_PORT, () => {
  logger.log(`Running on port: ${env.EXECUTION_PORT}`);
});
