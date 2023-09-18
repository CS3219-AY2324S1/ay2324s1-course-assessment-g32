const mysql = require("mysql2");
require("dotenv").config();

const mysqlHost = process.env.MY_SQL_HOST || "localhost";
const mysqlUser = process.env.MY_SQL_USER || "root";
const mysqlPassword = process.env.MY_SQL_PWD || "";
const mysqlDbName = process.env.MY_SQL_DB_NAME || "";

const conn = mysql.createConnection({
	host: mysqlHost,
	user: mysqlUser,
	password: mysqlPassword,
	database: mysqlDbName,
});

/**
 * Finds and returns userId of user with email.
 * 
 * userId is undefined -> Error with SQL query;
 * userId is null -> Cannot find user with email;
 * 
 * @param {*} email 
 * @returns userId
 */
const findByEmail = async (email) => {
  var _userId = Number();

  const query = conn.promise()
    .query("SELECT id FROM users WHERE email=?;", [email])
    .then( ([rows, fields]) => {
      _userId = rows.length ? rows[0].id : null;
    })
    .catch(console.error);

  await query; // Wait for uid to be updated
  return _userId;
};
  
const createUser = async (email, password) => {
 
  var _userId = Number();
  var _password = String();
  const _username = getUsernameFromEmail(email);

  await password.then(x => _password = x);

  // Add new user to database
  const query = conn.promise()
    .query("INSERT INTO users(username, email, password) VALUES (?, ?, ?);", 
      [_username, email, _password]
    )
    .then( ([result, fields]) => {
      _userId = result.insertId;
    })
    .catch(console.error);

  await query; // Wait for new user to be inserted
  return _userId;
};

const getUsernameFromEmail = (email) => {
  // assume username from email (up until '@')
  return email.substring(0, email.indexOf('@'));
};

module.exports = {
  findByEmail,
  createUser
};
  