import axios from 'axios';

const API_BASE = "http://localhost:8081/api/auth"; // adjust if your backend URL is different

export const login = async (email, password) => {
  return axios.post(`${API_BASE}/login`, { email, password });
};

export const register = async (userData) => {
  return axios.post(`${API_BASE}/register`, userData);
};
