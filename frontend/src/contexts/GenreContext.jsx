import PropTypes from 'prop-types';
import { createContext, useState } from 'react';

const GenreContext = createContext({
  selectedGenre: null,
});

const GenreProvider = ({ children }) => {
  const [selectedGenre, setSelectedGenre] = useState(null);

  const selectGenre = (genre) => {
    setSelectedGenre(genre);
  };

  return <GenreContext.Provider value={{ selectedGenre, selectGenre }}>{children}</GenreContext.Provider>;
};

GenreProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export { GenreProvider, GenreContext };
