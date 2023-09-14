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
 * @param {string} email 
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

// TODO: test code
/**
 * Provide a email and hashed password
 * 
 * @param {string} email User of user
 * @param {string} password Hashed password of user
 * @returns boolean if the provided password matches the one in the database
 */
const verifyPassword = async (email, password) => {
  var _isMatch = Boolean();

  const query = conn.promise()
    .query("SELECT id FROM users WHERE email=? AND password=?;", 
      [email, password]
    )
    .then( ([rows, fields]) => {
      _isMatch = rows.length > 0;
      if (rows.length > 1)
        console.warn("email + password is not unique");
    })
    .catch(console.error);

  await query; // Wait for reply from database
  return _isMatch;
};

const getUserInfoByEmail = async (email) => {
  var _userId = Number();
  await findByEmail(email).then(id => _userId = id);

  if (!_userId)
    throw "No user is using " + email; 

  return getUserInfoById(_userId);
};

const getUserInfoById = async (userId) => {
  var _userInfo = {};

  const selectStmt = `
    SELECT id, username, email, created_at, updated_at 
    FROM users WHERE id=?;`;

  const query = conn.promise()
    .query(selectStmt, [userId])
    .then( ([rows, fields]) => {
      const userInfo = rows[0];

      if (rows.length === 0)
        throw "getUserInfo: No user with id " + userId;

      if (rows.length > 1)
        throw "getUserInfo: Only one user should be retrieved";

      if (userInfo.id != userId)
        throw "getUserInfo: Wrong user info retrieved";

      _userInfo["id"] = userId;
      _userInfo["username"] = userInfo.username;
      _userInfo["email"] = userInfo.email;
      _userInfo["created_at"] = userInfo.created_at;
      _userInfo["updated_at"] = userInfo.updated_at;
    })
    .catch(console.error);

  await query; // Wait for new user to be inserted

  if (Object.keys(_userInfo).length === 0)
    throw "User info cannot be retrieved";

  return _userInfo;
};

// TODO : test code
const updateUser = async (userId, pkg) => {
  var _success = Boolean();
  var _placeholders = [];
  var _sql = "UPDATE users SET ";
  
  //TODO - how to implement this? hmmm....
  if (pkg.password) {
    _sql = _sql.concat("password=?");
    _placeholders.push(pkg.password);
  }
  

  _sql = _sql.concat("WHERE id = ?;");
  _placeholders.push(userId);

  const query = conn.promise()
    .query(_sql, _placeholders)
    .then( ([result, fields]) => {
      _success = result.affectedRows === 1;
    })
    .catch(console.error);

  await query; // Wait for user to be updated
  return _success;
};

// TODO : test code
const deleteUser = async (userId) => {
  var _success = Boolean();

  const query = conn.promise()
    .query("DELETE FROM users WHERE id=?;", [userId])
    .then( ([result, fields]) => {
      _success = result.affectedRows === 1;
    })
    .catch(console.error);

  await query; // Wait for user to be deleted
  return _success;
};

const getUsernameFromEmail = (email) => {
  // assume username from email (up until '@')
  return email.substring(0, email.indexOf('@'));
};

module.exports = {
  findByEmail,
  createUser,
  updateUser,
  deleteUser,
  getUserInfoByEmail,
  getUserInfoById,
  verifyPassword,
};
  