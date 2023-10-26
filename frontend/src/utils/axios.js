import axios from 'axios';
const env = require('../loadEnvironment');

export const axiosUser = axios.create({
  baseURL: env.USER_URL + '/user',
});

export const axiosAuth = axios.create({
  baseURL: env.AUTH_URL + '/auth',
});

export const axiosQuestion = axios.create({
  baseURL: env.QUESTION_URL + '/question',
});

export const axiosMatch = axios.create({
  baseURL: env.MATCH_URL + '/queue',
});

export const axiosExecution = axios.create({
  baseURL: env.EXECUTION_URL + '/execute',
});
