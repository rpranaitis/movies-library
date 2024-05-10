import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import PropTypes from 'prop-types';
import CloseIcon from '@mui/icons-material/Close';
import { forwardRef, useEffect, useState, useRef } from 'react';

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

const MovieTrailerDialog = ({ show, data, onClose }) => {
  const [open, setOpen] = useState(show);
  const iframeRef = useRef(null);

  const stopVideo = () => {
    const iframe = iframeRef.current;
    const src = iframe.src;

    setTimeout(() => {
      iframe.src = '';
      iframe.src = src;
    }, 300);
  };

  useEffect(() => {
    setOpen(show);
  }, [show]);

  const handleClose = () => {
    onClose();
    stopVideo();
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
        <DialogTitle>
          „{data?.title} ({data?.year})“
        </DialogTitle>
        <Button onClick={handleClose}>
          <CloseIcon />
        </Button>
      </Box>
      <DialogContent sx={{ paddingTop: 0 }}>
        <DialogContentText id="alert-dialog-slide-description" pb={1}>
          {data?.description}
        </DialogContentText>
        <iframe ref={iframeRef} width={'100%'} height={300} title="video" src={data?.trailer} allowFullScreen></iframe>
      </DialogContent>
    </Dialog>
  );
};

MovieTrailerDialog.propTypes = {
  show: PropTypes.bool,
  data: PropTypes.object,
  onClose: PropTypes.func.isRequired,
};

export default MovieTrailerDialog;
