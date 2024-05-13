import axios from 'axios';
import { API, ERROR_MESSAGE } from './constants';

export const fetchUsers = async () => {
  const response = await axios.get(`${API}/users`, { dontShowSuccess: true });

  if (response) {
    return response.data;
  }

  throw ERROR_MESSAGE;
};
