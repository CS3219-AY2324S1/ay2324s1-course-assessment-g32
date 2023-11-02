const cors = require('cors');
const express = require('express');
const bodyParser = require('body-parser');
const chatbotRoutes = require('./ChatbotRoutes');
const env = require('./loadEnvironment');
const logger = require('./Log');

logger.register({
  serviceName: 'Chatbot Service',
  logLevel: logger.LOG_LEVELS.warn,
});

logger.log('Starting ...');

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use('/chatbot', chatbotRoutes);
app.listen(env.CHATBOT_PORT, () => {
  logger.log(`Running on port: ${env.CHATBOT_PORT}`);
});
