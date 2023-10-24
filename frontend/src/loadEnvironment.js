// Config for this service
const SERVER_HOST = process.env.REACT_APP_HOST || 'http://localhost';

// Dependency Config: User Service
const USER_PORT = process.env.REACT_APP_USER_PORT || 4001;
const USER_URL = SERVER_HOST + ':' + USER_PORT;

// Dependency Config: Auth Service
const AUTH_PORT = process.env.REACT_APP_AUTH_PORT || 5001;
const AUTH_URL = SERVER_HOST + ':' + AUTH_PORT;

// Dependency Config: Question Service
const QUESTION_PORT = process.env.REACT_APP_QUESTION_PORT || 6001;
const QUESTION_URL = SERVER_HOST + ':' + QUESTION_PORT;

// Dependency Config: Match Service
const MATCH_PORT = process.env.REACT_APP_MATCH_PORT || 7001;
const MATCH_URL = SERVER_HOST + ':' + MATCH_PORT;

// // Dependency Config: Collaboration Service
const COLLAB_PORT = process.env.REACT_APP_COLLAB_PORT || 8001;
const COLLAB_URL = SERVER_HOST + ':' + COLLAB_PORT;

module.exports = {
  USER_URL,
  AUTH_URL,
  QUESTION_URL,
  MATCH_URL,
  COLLAB_URL,
};
