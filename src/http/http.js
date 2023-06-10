import axios from 'axios';

export const API_URL = `http://localhost:4000/api`;

const $api = axios.create({
  withCredentials: true,
  baseURL: API_URL,
});

// need to attach token in all requests
$api.interceptors.request((config) => {
  // it have all base urls, headers etc., to get something or send something as request
  config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`; // token is in localstorage
});

export default $api;
