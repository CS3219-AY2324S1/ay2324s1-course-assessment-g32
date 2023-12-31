const cors = require('cors');
const express = require('express');
const bodyParser = require('body-parser');
const authRoutes = require('./AuthRoutes');
const env = require('./loadEnvironment');
const logger = require('./Log');

logger.register({
  serviceName: 'Auth Service',
  logLevel: logger.LOG_LEVELS.warn,
});

logger.log('Starting ...');

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use('/auth', authRoutes);
app.listen(env.AUTH_PORT, () => {
  logger.log(`Running on port: ${env.AUTH_PORT}`);
});
