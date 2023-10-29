const cors = require('cors');
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const questionRoutes = require('./QuestionRoutes');
const env = require('./loadEnvironment');
const logger = require('./Log');

logger.register({
  serviceName: 'Question Service',
  logLevel: logger.LOG_LEVELS.all,
});

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use('/question', questionRoutes);
app.listen(env.QUESTION_PORT, () => {
  logger.log(`Running on port: ${env.QUESTION_PORT}`);
});

try {
  mongoose.connect(env.MONGO_CLIENT, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  const mongoDb = mongoose.connection;
  mongoDb.once('open', () => {
    logger.logSuccess('Connected to the MongoDB database');
  });
  mongoDb.on('error', (error) => {
    logger.error('Could not connect to MongoDB:', error, '\nExiting ...');
    process.exit(1);
  });
} catch (err) {
  logger.error(err);
}
