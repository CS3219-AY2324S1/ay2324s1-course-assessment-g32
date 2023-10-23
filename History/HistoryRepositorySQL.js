const mysql = require('mysql2');
const env = require('./loadEnvironment.js');

const conn = mysql.createConnection({
  ...env.mysqlCreds,
  ...{ database: env.mysqlDbName },
});

const findAttemptByUserIdAndQuestion = async (userId, questionId) => {
  var _timeStamp = String();
  const query = conn
    .promise()
    .query('SELECT timeStamp FROM attempts WHERE userId=? AND questionId=?;', [userId, questionId])
    .then(([rows, fields]) => {
      _timeStamp = rows.length ? rows[0].timeStamp : null;
    })

  await query;
  return { timeStamp: _timeStamp };
};

const addAttempt = async (userId, questionId, code) => {
  // Add new attempt to database
  const query = conn
    .promise()
    .query('INSERT INTO attempts(userId, questionId, code) VALUES (?, ?, ?);', [
      userId,
      questionId,
      code,
    ])

  await query; // Wait for new attempt to be inserted
};

const deleteAttemptsByUserId = async (userId) => {
  // Delete attempt from database
  const query = conn
    .promise()
    .query('DELETE FROM attempts WHERE userId=?;', [
      userId,
      questionId,
    ])

  await query; // Wait for attempt to be deleted
};

const getAttemptsByUserId = async (userId) => {
  var _attempts = Array();
  const query = conn
    .promise()
    .query('SELECT id, questionId, timeStamp FROM attempts WHERE userId=?;', [userId])
    .then(([rows, fields]) => {
      _attempts = rows;
    })

  await query;
  return _attempts;
};

const deleteAttemptsByQuestionId = async (questionId) => {
  // Delete all attempts from database with specified questionId
  conn.promise().query('DELETE FROM attempts WHERE questionId=?;', [questionId]);
};

module.exports = {
  findAttemptByUserIdAndQuestion,
  addAttempt,
  deleteAttemptsByUserId,
  getAttemptsByUserId,
  deleteAttemptsByQuestionId,
};
