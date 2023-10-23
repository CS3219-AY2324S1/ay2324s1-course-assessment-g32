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
 * @returns {userId, isMaintainer}
 */
const findByEmail = async (email) => {
  var _userId = Number();
  var _isMaintainer = Boolean();
  const query = conn
    .promise()
    .query('SELECT id, is_maintainer FROM users WHERE email=?;', [email])
    .then(([rows, fields]) => {
      _userId = rows.length ? rows[0].id : null;
      _isMaintainer = rows.length ? rows[0].is_maintainer : null;
    })
    .catch(console.error);

  await query; // Wait for uid and isMaintainer to be updated
  return { userId: _userId, isMaintainer: _isMaintainer };
};

const createUser = async (email, password) => {
  var _userId = Number();
  var _password = String();
  const _displayName = getDisplayNameFromEmail(email);

  await password.then((x) => (_password = x));

  // Add new user to database
  const query = conn
    .promise()
    .query(
      'INSERT INTO users(display_name, email, password) VALUES (?, ?, ?);',
      [_displayName, email, _password]
    )
    .then(([result, fields]) => {
      _userId = result.insertId;
    })
    .catch(console.error);

  await query; // Wait for new user to be inserted
  return _userId;
};

const getUserInfoByEmail = async (email) => {
  var _userId = Number();
  await findByEmail(email).then((userInfo) => (_userId = userInfo.userId));

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
      _userInfo = rows.map(
        ({
          password,
          display_name,
          created_at,
          updated_at,
          is_maintainer,
          ...rest
        }) => ({
          ...rest,
          displayName: display_name,
          createdAt: created_at,
          updatedAt: updated_at,
          isMaintainer: is_maintainer,
        })
      );
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
      _userInfo['displayName'] = userInfo.display_name;
      _userInfo['email'] = userInfo.email;
      _userInfo['password'] = userInfo.password;
      _userInfo['createdAt'] = userInfo.created_at;
      _userInfo['updatedAt'] = userInfo.updated_at;
      _userInfo['isMaintainer'] = userInfo.is_maintainer;
    })
    .catch(console.error);

  await query; // Wait for new user to be inserted

  if (Object.keys(_userInfo).length === 0)
    throw 'User info cannot be retrieved';

  return _userInfo;
};

const updateUser = async (userId, displayName) => {
  var _success = Boolean();
  var _placeholders = [];
  var _sql = 'UPDATE users SET ';

  if (displayName) {
    _sql = _sql.concat('display_name=?');
    _placeholders.push(displayName);
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

const updatePassword = async (userId, password) => {
  var _success = Boolean();
  var _placeholders = [];
  var _sql = 'UPDATE users SET ';

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

const getDisplayNameFromEmail = (email) => {
  // Assumes displayName from email (up until '@')
  return email.substring(0, email.indexOf('@'));
};

/**
 * Toggle role of user of given userId from the database.
 * @param {int|string} userId
 * @returns If the deletion was successful
 */
const toggleUserRole = async (userId) => {
  const user = await getUserInfoById(userId);
  const newIsMaintainer = user?.isMaintainer ? 0 : 1; // Toggle the isMaintainer field

  var _success = Boolean();
  var _placeholders = [];
  var _sql = 'UPDATE users SET ';

  _sql = _sql.concat('is_maintainer=?');
  _placeholders.push(newIsMaintainer);

  _sql = _sql.concat(' WHERE id=?;');
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

module.exports = {
  findByEmail,
  createUser,
  updateUser,
  updatePassword,
  deleteUser,
  getAllUserInfo,
  getUserInfoByEmail,
  getUserInfoById,
  toggleUserRole,
};
