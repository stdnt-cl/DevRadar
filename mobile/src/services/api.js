import axios from 'axios';

const api = axios.create({
  baseURL: 'http://<add-current-ip>:3333',
});

export default api;
