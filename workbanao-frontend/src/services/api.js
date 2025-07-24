import axios from 'axios';

const BASE_URL = 'http://localhost:8081';

const api = axios.create({
  baseURL: BASE_URL,
});

api.interceptors.request.use((req) => {
  const token = localStorage.getItem('token');
  if (token) req.headers.Authorization = `Bearer ${token}`;
  return req;
});

export default api;
