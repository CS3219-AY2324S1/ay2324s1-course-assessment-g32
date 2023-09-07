const cors = require('cors');
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;
const MONGOCLIENT = process.env.ATLAS_URI || "";

app.use(cors());
app.use(bodyParser.json());

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
