import PropTypes from 'prop-types';
import { createContext, useState } from 'react';

const GenreContext = createContext({
  selectedGenres: [],
});

const GenreProvider = ({ children }) => {
  const [selectedGenres, setSelectedGenres] = useState([]);

  const selectGenre = (genre) => {
    setSelectedGenres((prevGenres) => {
      if (prevGenres.includes(genre)) {
        return prevGenres.filter((g) => g !== genre);
      } else {
        return genre === null ? [] : [...prevGenres, genre];
      }
    });
  };

  return <GenreContext.Provider value={{ selectedGenres, selectGenre }}>{children}</GenreContext.Provider>;
};

GenreProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export { GenreProvider, GenreContext };
