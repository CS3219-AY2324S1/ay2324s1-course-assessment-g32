const SERVER_HOST = process.env.REACT_APP_HOST || 'http://localhost';
const SERVER_PORT = process.env.REACT_APP_SERVER_PORT || 3001;
const SERVER_URL = SERVER_HOST + ':' + SERVER_PORT;

const USER_HOST = process.env.USER_HOST || 'localhost';
const USER_PORT = process.env.REACT_APP_USER_PORT || 4001;
const USER_URL = 'http://' + USER_HOST + ':' + USER_PORT;

const AUTH_HOST = process.env.AUTH_HOST || 'localhost';
const AUTH_PORT = process.env.REACT_APP_AUTH_PORT || 5001;
const AUTH_URL = 'http://' + AUTH_HOST + ':' + AUTH_PORT;

const QUESTION_HOST = process.env.QUESTION_HOST || 'localhost';
const QUESTION_PORT = process.env.REACT_APP_QUESTION_PORT || 6001;
const QUESTION_URL = 'http://' + QUESTION_HOST + ':' + QUESTION_PORT;

module.exports = {
  SERVER_URL,
  USER_URL,
  AUTH_URL,
  QUESTION_URL,
};
