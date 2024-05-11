import axios from 'axios';
import { API, ERROR_MESSAGE } from './constants';

export const addMovieToCollection = async (data) => {
  const response = await axios.post(`${API}/collection`, data);

  if (response) {
    return response.data;
  }

  throw ERROR_MESSAGE;
};

export const removeMovieFromCollection = async (id) => {
  const response = await axios.delete(`${API}/collection/${id}`);

  if (response) {
    return response.data;
  }

  throw ERROR_MESSAGE;
};
