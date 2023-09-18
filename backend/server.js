const cors = require('cors');
const express = require('express');
const mongoose = require('mongoose');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const authRoutes = require('./server/routes/auth');
const questionRoutes = require('./server/routes/question');
require('dotenv').config();

// Retrieve environment variables
const PORT = process.env.PORT || 3000;
const MONGOCLIENT = process.env.ATLAS_URI || '';
const mysqlHost = process.env.MY_SQL_HOST || "localhost";
const mysqlUser = process.env.MY_SQL_USER || "root";
const mysqlPassword = process.env.MY_SQL_PWD || "";
const mysqlDbName = process.env.MY_SQL_DB_NAME || "";

console.log("Starting server ...");

// start the Express (web) server
app.use(cors());
app.use(bodyParser.json());
app.use('/auth', authRoutes);
app.use('/question', questionRoutes);
app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});

// MongoDB
mongoose.connect(MONGOCLIENT, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const mongoDb = mongoose.connection;
mongoDb.once('open', () => {
  console.log('Connected to the MongoDB database');
});
mongoDb.on('error', (error) => {
  console.error('MongoDB database connection error:', error);
});

// MySQL
const mysqlDb = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: mysqlPassword,
  database: mysqlDbName,
});
mysqlDb.connect((error) => {
	if (error)
		console.error("MySQL database connection error:", error);
	else
		console.log("Connected to the MySQL database");
});

// start the Express (web) server
app.listen(PORT, () => {
	console.log(`Server is running on port: ${PORT}`);
});
