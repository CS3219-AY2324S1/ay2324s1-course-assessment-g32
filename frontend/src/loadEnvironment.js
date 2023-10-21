// Config for this service
const SERVER_HOST = process.env.REACT_APP_HOST || 'http://localhost';
const SERVER_PORT = process.env.REACT_APP_SERVER_PORT || 3001;
const SERVER_URL = SERVER_HOST + ':' + SERVER_PORT;

// Dependency Config: User Service
const USER_HOST = process.env.USER_HOST || 'localhost';
const USER_PORT = process.env.REACT_APP_USER_PORT || 4001;
const USER_URL = 'http://' + USER_HOST + ':' + USER_PORT;

// Dependency Config: Auth Service
const AUTH_HOST = process.env.AUTH_HOST || 'localhost';
const AUTH_PORT = process.env.REACT_APP_AUTH_PORT || 5001;
const AUTH_URL = 'http://' + AUTH_HOST + ':' + AUTH_PORT;

// Dependency Config: Question Service
const QUESTION_HOST = process.env.QUESTION_HOST || 'localhost';
const QUESTION_PORT = process.env.REACT_APP_QUESTION_PORT || 6001;
const QUESTION_URL = 'http://' + QUESTION_HOST + ':' + QUESTION_PORT;

// Dependency Config: Match Service
const MATCH_HOST = process.env.MATCH_HOST || 'localhost';
const MATCH_PORT = process.env.REACT_APP_MATCH_PORT || 7001;
const MATCH_URL = 'http://' + MATCH_HOST + ':' + MATCH_PORT;

// Dependency Config: Collaboration Service
const COLLAB_HOST = process.env.COLLAB_HOST || 'localhost';
const COLLAB_PORT = process.env.REACT_APP_COLLAB_PORT || 8001;
const COLLAB_URL = 'http://' + COLLAB_HOST + ':' + COLLAB_PORT;

module.exports = {
  SERVER_URL,
  USER_URL,
  AUTH_URL,
  QUESTION_URL,
  MATCH_URL,
  COLLAB_URL,
};
