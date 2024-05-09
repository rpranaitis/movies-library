import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import SearchInput from '../SearchInput/SearchInput';
import PropTypes from 'prop-types';
import CloseIcon from '@mui/icons-material/Close';
import { forwardRef, useEffect, useState, useRef } from 'react';

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

const SearchMovieModal = ({ show, onClose }) => {
  const [open, setOpen] = useState(show);

  useEffect(() => {
    setOpen(show);
  }, [show]);

  const handleClose = () => {
    onClose();
  };

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
        <DialogContentText id="alert-dialog-slide-description">
          Discover your favorite movies with ease using our Movie Search Engine. Simply enter the title and explore
          detailed information. Enjoy seamless browsing and dive into the world of cinema effortlessly!
        </DialogContentText>
        <SearchInput style={{ marginLeft: -10, marginTop: 13 }} />
      </DialogContent>
    </Dialog>
  );
};

SearchMovieModal.propTypes = {
  show: PropTypes.bool,
  onClose: PropTypes.func.isRequired,
};

export default SearchMovieModal;
