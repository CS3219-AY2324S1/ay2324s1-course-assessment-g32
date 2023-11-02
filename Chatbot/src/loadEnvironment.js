require('dotenv').config({ path: `${__dirname}/../../.env` });

// Config for this service
const CHATBOT_PORT = process.env.CHATBOT_PORT || 8002;

// Dependency Config: Collab
const COLLAB_HOST = process.env.COLLAB_HOST || 'localhost';
const COLLAB_PORT = process.env.COLLAB_PORT || 8001;
const COLLAB_URL = 'http://' + COLLAB_HOST + ':' + COLLAB_PORT;

// Dependency Config: openai secret key
const OPENAI_SECRET_KEY = process.env.OPENAI_SECRET_KEY || '';

module.exports = {
  CHATBOT_PORT,
  COLLAB_URL,
  OPENAI_SECRET_KEY,
};
