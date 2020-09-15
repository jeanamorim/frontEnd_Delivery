import axios from 'axios';

const api = axios.create({
  baseURL: 'https://backend-delivery.herokuapp.com/',
  // baseURL: 'http://localhost:3005/',
});

export default api;
