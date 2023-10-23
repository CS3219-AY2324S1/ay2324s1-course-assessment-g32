const cors = require('cors');
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const historyRoutes = require('./HistoryRoutes.js');
const env = require('./loadEnvironment.js');

console.log('Starting HistoryServer...');

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use('/history', historyRoutes);
app.listen(env.HISTORY_PORT, () => {
  console.log(`HistoryServer is running on port: ${env.HISTORY_PORT}`);
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
