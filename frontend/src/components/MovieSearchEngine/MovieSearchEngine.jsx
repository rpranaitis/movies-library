import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Grid from '@mui/material/Grid';
import Slide from '@mui/material/Slide';
import SearchInput from '../SearchInput/SearchInput';
import PropTypes from 'prop-types';
import CloseIcon from '@mui/icons-material/Close';
import debounce from 'debounce';
import styles from './MovieSearchEngine.module.scss';
import { forwardRef, useEffect, useState, useRef } from 'react';
import { searchMovie } from '../../api/imdb';

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

const MovieSearchEngine = ({ show, onClose }) => {
  const [open, setOpen] = useState(show);
  const [searchResults, setSearchResults] = useState([]);
  const searchInput = useRef(null);

  useEffect(() => {
    setOpen(show);

    if (show) {
      setTimeout(() => {
        setSearchResults([]);
        searchInput.current.value = null;
        searchInput.current.focus();
      }, 0);
    }
  }, [show]);

  const handleClose = () => {
    onClose();
  };

  const handleSearchAction = async (query) => {
    if (query) {
      try {
        const response = await searchMovie(query);
        setSearchResults(response);
      } catch (error) {
        setSearchResults([]);
        console.error(error);
      }
    } else {
      setSearchResults([]);
    }
  };

  const debouncedSearch = debounce(handleSearchAction, 300);

  return (
    <Dialog
      open={open}
      TransitionComponent={Transition}
      keepMounted
      onClose={handleClose}
      aria-describedby="alert-dialog-slide-description"
    >
      <Box display={'flex'} alignItems={'center'} justifyContent={'space-between'}>
        <DialogTitle>Movie Search Engine</DialogTitle>
        <Button onClick={handleClose}>
          <CloseIcon />
        </Button>
      </Box>
      <DialogContent sx={{ paddingTop: 0 }}>
        <Box className={styles.header}>
          <DialogContentText id="alert-dialog-slide-description">
            Discover your favorite movies with ease using our Movie Search Engine. Simply enter the title and explore
            detailed information.
          </DialogContentText>
          <SearchInput
            onChange={(e) => debouncedSearch(e.target.value)}
            searchInput={searchInput}
            style={{ margin: '13px 0px 13px -10px' }}
          />
        </Box>
        {searchResults.length !== 0 && (
          <Grid container spacing={1} className={styles.resultsContainer}>
            {searchResults.map((item) => (
              <Grid key={item.imdb_id} item xs={6}>
                <Box className={styles.movieBox}>
                  <Box sx={{ width: '110px', height: '90px' }}>
                    <img style={{ width: '100%', height: '100%' }} src={item.image} alt={item.title} />
                  </Box>
                  <Box sx={{ width: '100%' }} p={1.4}>
                    <Box display={'flex'} flexDirection={'column'} gap={1}>
                      <span className={styles.title}>
                        {item.title} ({item.year})
                      </span>
                      <span className={styles.credits}>{item.credits}</span>
                    </Box>
                  </Box>
                </Box>
              </Grid>
            ))}
          </Grid>
        )}
      </DialogContent>
    </Dialog>
  );
};

MovieSearchEngine.propTypes = {
  show: PropTypes.bool,
  onClose: PropTypes.func.isRequired,
};

export default MovieSearchEngine;
