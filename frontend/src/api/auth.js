import axios from 'axios';
import { API } from './constants';

export const registerUser = async (data) => {
  const response = await axios.post(`${API}/auth/register`, data);

  return response.data;
};

export const loginUser = async (data) => {
  const response = await axios.post(`${API}/auth/login`, data);

  return response.data;
};

export const checkUser = async () => {
  const token = localStorage.getItem('token');

  const response = await axios.get(`${API}/auth/profile`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};
