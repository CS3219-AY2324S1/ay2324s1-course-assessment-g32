import { axiosChatbot } from '../utils/axios';
import { Status } from '../constants';

const getConfig = () => {
  return {
    headers: {
      'Content-Type': 'application/json',
    },
  };
};

// Define rate limiting parameters
const requestsPerMinute = 1; // Number of requests allowed per minute
const interval = 60000 / requestsPerMinute; // Interval in milliseconds

// Create a queue to manage the requests
const requestQueue = [];

// Function to make a request and add it to the queue
const makeRequest = async (url, data) => {
  if (requestQueue.length >= requestsPerMinute) {
    // If the queue is full, wait for the next interval
    await new Promise((resolve) => setTimeout(resolve, interval));
  }
  const response = await axiosChatbot.post(url, data, getConfig());
  return response.data;
};

export const getResponse = async (message) => {
  try {
    const data = { question: message };
    return await makeRequest('/get-response', data);
  } catch (err) {
    if (err.code === 'ERR_NETWORK') {
      throw Object.assign(new Error(err.code), {
        response: { status: Status.REQUEST_TIMEOUT },
        message: 'Network Error',
      });
    }
    console.log("error in api")
    throw err;
  }
};
