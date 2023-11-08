require('dotenv').config({ path: `${__dirname}/../../.env` });

// Config for this service
const EXECUTION_PORT = process.env.EXECUTION_PORT || 9001;

module.exports = {
  EXECUTION_PORT,
}
