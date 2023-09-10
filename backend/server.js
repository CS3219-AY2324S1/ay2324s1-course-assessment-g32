const cors = require("cors");
const express = require("express");
const mongoose = require("mongoose");
const mysql = require("mysql2");
const bodyParser = require("body-parser");
const authRoutes = require("./server/routes/auth");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3000;
const MONGOCLIENT = process.env.ATLAS_URI || "";

app.use(cors());
app.use(bodyParser.json());

// Use the authRoutes for handling authentication-related routes
app.use("/auth", authRoutes);

// MongoDB
mongoose.connect(MONGOCLIENT, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
});

const mongoDb = mongoose.connection;
mongoDb.once("open", () => {
	console.log("Connected to the MongoDB database");
});
mongoDb.on("error", (error) => {
	console.error("MongoDB database connection error:", error);
});

// MySQL
const mysqlDb = mysql.createConnection({
	host: "localhost",
	user: "root",
	password: "password", // to update to your own password
	database: "assignmentdb", // to match the database name
});
mysqlDb.connect((error) => {
	if (error) {
		console.error("MySQL database connection error:", error);
	}
	console.log("Connected to the MySQL database");
});

// start the Express (web) server
app.listen(PORT, () => {
	console.log(`Server is running on port: ${PORT}`);
});
