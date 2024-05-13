import axios from 'axios';
import { API, ERROR_MESSAGE } from './constants';

export const searchMovie = async (query) => {
  const response = await axios.get(`${API}/imdb?q=${query}`, {
    dontUseSpinner: true,
    dontShowSuccess: true,
    dontShowError: true,
  });

  if (response) {
    return response.data;
  }

  throw ERROR_MESSAGE;
};

export const fetchMovieInfo = async (id) => {
  const response = await axios.get(`${API}/imdb/${id}`, {
    dontShowSuccess: true,
  });

  if (response) {
    return response.data;
  }

  throw ERROR_MESSAGE;
};
