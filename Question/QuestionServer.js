const cors = require('cors');
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const questionRoutes = require('./QuestionRoutes');
const env = require('./loadEnvironment');

console.log('Starting QuestionServer ...');

// start the Express (web) server
const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use('/question', questionRoutes);
app.listen(env.QUESTION_PORT, () => {
  console.log(`Server is running on port: ${env.QUESTION_PORT}`);
});

try {
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
} catch (err) {
  console.error(err);
}
