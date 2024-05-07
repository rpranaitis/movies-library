import axios from 'axios';
import { API } from './constants';

export const registerUser = async (data) => {
  const response = await axios.post(`${API}/auth/register`, data);

  return await response.data;
};

export const loginUser = async (data) => {
  const response = await axios.post(`${API}/auth/login`, data);

  return await response.data;
};
