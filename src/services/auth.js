import axios from 'axios';

const API = 'http://localhost:5000';

export const login = async (email, password) => {
  const res = await axios.post(`${API}/login`, { email, password });
  return res.data.token; // JWT
};

export const register = async (username, email, password) => {
  const res = await axios.post(`${API}/signup`, { username, email, password });
  return res.data.token; // JWT
};