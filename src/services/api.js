import axios from 'axios';

const api = axios.create({
  baseURL: 'https://backend-delivery.herokuapp.com',
});

export default api;
