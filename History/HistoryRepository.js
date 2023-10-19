const mysql = require('mysql2');
const env = require('./loadEnvironment.js');

const conn = mysql.createConnection({
  ...env.mysqlCreds,
  ...{ database: env.mysqlDbName },
});

const findAttemptByEmailAndQuestion = async (userId, questionId) => {
  var _timeStamp = String();
  const query = conn
    .promise()
    .query('SELECT timeStamp FROM attempts WHERE userId=? AND questionId=?;', [userId, questionId])
    .then(([rows, fields]) => {
      _timeStamp = rows.length ? rows[0].timeStamp : null;
    })
    .catch(console.error);
  await query;
  return { timeStamp: _timeStamp };
};

const addAttempt = async (userId, questionId) => {
  // Add new attempt to database
  const query = conn
    .promise()
    .query('INSERT INTO attempts(userId, questionId) VALUES (?, ?);', [
      userId,
      questionId,
    ])
    .catch(console.error);

  await query; // Wait for new attempt to be inserted
};

const deleteAttempt = async (userId, questionId) => {
  // Delete attempt from database
  const query = conn
    .promise()
    .query('DELETE FROM attempts WHERE userId=? AND questionId=?;', [
      userId,
      questionId,
    ])
    .catch(console.error);

  await query; // Wait for attempt to be deleted
};

const getAttempts = async (userId) => {
  var _attempts = Array();
  const query = conn
    .promise()
    .query('SELECT * FROM attempts WHERE userId=?;', [userId])
    .then(([rows, fields]) => {
      _attempts = rows;
    })
    .catch(console.error);
  await query;
  return _attempts;
};

module.exports = {
  findAttemptByEmailAndQuestion,
  addAttempt,
  deleteAttempt,
  getAttempts,
};
