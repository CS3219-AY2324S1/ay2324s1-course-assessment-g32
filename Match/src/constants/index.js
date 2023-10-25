// HTTP status codes
export const Status = {
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  REQUEST_TIMEOUT: 408,
  CONFLICT: 409,
  GONE: 410,
  INTERNAL_SERVER_ERROR: 500,
};

// Time-related constants
export const TIMEOUT = 30000; // 30 seconds

// Connection-related constants
export const MAX_CONNECTION_ATTEMPTS = 10;
export const CONNECTION_INTERVAL = 5000; // 5 seconds
