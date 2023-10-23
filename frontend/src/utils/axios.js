import axios from 'axios';

export const axiosUser = axios.create({
  baseURL: '/user',
});

export const axiosAuth = axios.create({
  baseURL: '/auth',
});

export const axiosQuestion = axios.create({
  baseURL: '/question',
});

export const axiosMatch = axios.create({
  baseURL: '/queue',
});
