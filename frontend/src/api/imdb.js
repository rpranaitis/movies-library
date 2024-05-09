import axios from 'axios';
import { API } from './constants';

export const searchMovie = async (query) => {
  const token = localStorage.getItem('authToken');

  const response = await axios.get(`${API}/imdb?q=${query}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    dontUseSpinner: true,
    dontShowSuccess: true,
    dontShowError: true,
  });

  return response.data;
};
