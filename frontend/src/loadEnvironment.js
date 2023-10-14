const SERVER_HOST = process.env.REACT_APP_HOST || 'http://localhost';
const SERVER_PORT = process.env.REACT_APP_SERVER_PORT || 3001;
const AUTH_PORT = process.env.REACT_APP_AUTH_PORT || 5001;
const QUESTION_PORT = process.env.REACT_APP_QUESTION_PORT || 6001;
const QUESTION_URL = SERVER_HOST + ':' + QUESTION_PORT;
const SERVER_URL = SERVER_HOST + ':' + SERVER_PORT;
const AUTH_URL = SERVER_HOST + ':' + AUTH_PORT;

module.exports = {
  SERVER_URL,
  AUTH_URL,
  QUESTION_URL,
};
