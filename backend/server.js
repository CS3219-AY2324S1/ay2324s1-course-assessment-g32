const cors = require("cors");
const express = require("express");
const mongoose = require("mongoose");
const mysql = require("mysql2");
const bodyParser = require("body-parser");
const authRoutes = require("./server/routes/auth");
const testRoutes = require("./server/routes/test");
require("dotenv").config();

// Retrieve environment variables
const PORT = process.env.SERVER_PORT || 3000;
const MONGOCLIENT = process.env.ATLAS_URI || "";
const mysqlHost = process.env.MY_SQL_HOST || "localhost";
const mysqlUser = process.env.MY_SQL_USER || "root";
const mysqlPassword = process.env.MY_SQL_PWD || "";
const mysqlDbName = process.env.MY_SQL_DB_NAME || "";

console.log("Starting server ...");


// start the Express (web) server
const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use("/auth", authRoutes); // Use the authRoutes for handling authentication-related routes
app.use("/test", testRoutes);
app.listen(PORT, () => {
	console.log(`Running server on port: ${PORT}`);
});


// MongoDB
mongoose.connect(MONGOCLIENT, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
});

const mongoDb = mongoose.connection;
mongoDb.once("open", () => {
	console.log("SUCCESS: Connected to the MongoDB database");
});
mongoDb.on("error", (error) => {
	console.error("MongoDB database connection error\n", error);
});


// MySQL
const mysqlDb = mysql.createConnection({
	host: mysqlHost,
	user: mysqlUser,
	password: mysqlPassword,
	database: mysqlDbName,
});
mysqlDb.connect((error) => {
	if (error)
		console.error("MySQL database connection error:", error);
	else
		console.log("SUCCESS: Connected to the MySQL database");
});
