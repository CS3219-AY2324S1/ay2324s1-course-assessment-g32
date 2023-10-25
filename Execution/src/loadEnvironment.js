require('dotenv').config({ path: `${__dirname}/../../.env` });

// Config for this service
const EXECUTION_PORT = process.env.EXECUTION_PORT || 9001;

// Dependency Config: Collab
const COLLAB_HOST = process.env.COLLAB_HOST || 'http://localhost';
const COLLAB_PORT = process.env.COLLAB_PORT || 8001;
const COLLAB_URL = COLLAB_HOST + ':' + COLLAB_PORT;

module.exports = {
  EXECUTION_PORT,
  COLLAB_URL,
}
