const mysql = require('mysql2');
const env = require('../../loadEnvironment.js');

const conn = mysql.createConnection({
  ...env.mysqlCreds,
  ...{ database: env.mysqlDbName },
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
  var _isMaintainer = Boolean();

  const query = conn
    .promise()
    .query('SELECT id, isMaintainer FROM users WHERE email=?;', [email])
    .then(([rows, fields]) => {
      _userId = rows.length ? rows[0].id : null;
      _isMaintainer = rows.length ? rows[0].isMaintainer : null;
    })
    .catch(console.error);

  await query; // Wait for uid and isMaintainer to be updated
  return { _userId, _isMaintainer };
};

const createUser = async (email, password) => {
  var _userId = Number();
  var _password = String();
  const _username = getUsernameFromEmail(email);

  await password.then((x) => (_password = x));

  // Add new user to database
  const query = conn
    .promise()
    .query('INSERT INTO users(username, email, password) VALUES (?, ?, ?);', [
      _username,
      email,
      _password,
    ])
    .then(([result, fields]) => {
      _userId = result.insertId;
    })
    .catch(console.error);

  await query; // Wait for new user to be inserted
  return _userId;
};

const getUserInfoByEmail = async (email) => {
  var _userId = Number();
  await findByEmail(email).then((userInfo) => (_userId = userInfo._userId));

  if (!_userId) throw 'No user is using ' + email;

  return getUserInfoById(_userId);
};

const getAllUserInfo = async () => {
  var _userInfo = [];

  const selectStmt = `SELECT * FROM users;`;

  const query = conn
    .promise()
    .query(selectStmt)
    .then(([rows, fields]) => {
      _userInfo = rows.map(({ password, ...rest }) => rest);
    })
    .catch(console.error);

  await query;

  return _userInfo;
};

const getUserInfoById = async (userId) => {
  var _userInfo = {};

  const selectStmt = `SELECT * FROM users WHERE id=?;`;

  const query = conn
    .promise()
    .query(selectStmt, [userId])
    .then(([rows, fields]) => {
      const userInfo = rows[0];

      if (rows.length === 0) throw 'getUserInfo: No user with id ' + userId;

      if (rows.length > 1)
        throw 'getUserInfo: Only one user should be retrieved';

      if (userInfo.id != userId) throw 'getUserInfo: Wrong user info retrieved';

      _userInfo['id'] = userId;
      _userInfo['username'] = userInfo.username;
      _userInfo['email'] = userInfo.email;
      _userInfo['password'] = userInfo.password;
      _userInfo['created_at'] = userInfo.created_at;
      _userInfo['updated_at'] = userInfo.updated_at;
    })
    .catch(console.error);

  await query; // Wait for new user to be inserted

  if (Object.keys(_userInfo).length === 0)
    throw 'User info cannot be retrieved';

  return _userInfo;
};

const getIsMaintainerById = async (id) => {
  var _isMaintainer = Boolean();

  const query = conn
    .promise()
    .query('SELECT isMaintainer FROM users WHERE id=?;', [id])
    .then(([rows, fields]) => {
      if (rows.length) {
        if (rows[0].isMaintainer == 1) {
          _isMaintainer = true;
        }
      } else {
        _isMaintainer = false;
      }
    })
    .catch(console.error);

  await query;
  return _isMaintainer;
};

const updateUser = async (userId, username, password) => {
  var _success = Boolean();
  var _placeholders = [];
  var _sql = 'UPDATE users SET ';

  if (username) {
    _sql = _sql.concat('username=?');
    _placeholders.push(username);
  }

  if (username && password) _sql = _sql.concat(', ');

  if (password) {
    _sql = _sql.concat('password=?');
    _placeholders.push(password);
  }

  _sql = _sql.concat(' WHERE id = ?;');
  _placeholders.push(userId);

  const query = conn
    .promise()
    .query(_sql, _placeholders)
    .then(([result, fields]) => {
      _success = result.affectedRows === 1;
    })
    .catch(console.error);

  await query; // Wait for user to be updated
  return _success;
};

/**
 * Delete user of given userId from the database.
 * @param {int|string} userId
 * @returns If the deletion was successful
 */
const deleteUser = async (userId) => {
  var _success = Boolean();

  const query = conn
    .promise()
    .query('DELETE FROM users WHERE id=?;', [userId])
    .then(([result, fields]) => {
      _success = result.affectedRows === 1;
    })
    .catch(console.error);

  await query; // Wait for user to be deleted
  return _success;
};

const getUsernameFromEmail = (email) => {
  // Assumes username from email (up until '@')
  return email.substring(0, email.indexOf('@'));
};

module.exports = {
  findByEmail,
  createUser,
  updateUser,
  deleteUser,
  getAllUserInfo,
  getUserInfoByEmail,
  getUserInfoById,
};
