const cors = require('cors');
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const authRoutes = require('./server/routes/auth');
const questionRoutes = require('./server/routes/question');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;
const MONGOCLIENT = process.env.ATLAS_URI || "";

app.use(cors());
app.use(bodyParser.json());

// Use the authRoutes for handling authentication-related routes
app.use('/auth', authRoutes);

// Use the questionRoutes for handling question-related routes
app.use('/question', questionRoutes);

mongoose.connect(MONGOCLIENT,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }
);

const db = mongoose.connection;
db.once('open', () => { console.log('Connected to the database'); });
db.on('error', (error) => { console.error('Database connection error:', error); });

// start the Express (web) server
app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});
