import axios from 'axios';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import AppRouter from './router/AppRouter';
import { useEffect, useState } from 'react';
import { UserProvider } from './contexts/UserContext';
import './App.module.scss';

const App = () => {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(false);

  useEffect(() => {
    const requestInterceptor = axios.interceptors.request.use((config) => {
      setLoading(true);
      return config;
    });

    const responseInterceptor = axios.interceptors.response.use(
      (response) => {
        setLoading(false);
        setMessage({ text: response.data.message, type: 'success' });
        return response;
      },
      (error) => {
        setLoading(false);
        setMessage({ text: error.response.data.message, type: 'error' });
        throw error;
      }
    );

    return () => {
      axios.interceptors.request.eject(requestInterceptor);
      axios.interceptors.response.eject(responseInterceptor);
    };
  }, []);

  const handleCloseMessage = (_event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setMessage(false);
  };

  return (
    <UserProvider>
      <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={loading}>
        <CircularProgress color="inherit" />
      </Backdrop>
      {message && (
        <Snackbar
          open={message}
          autoHideDuration={6000}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
          onClose={handleCloseMessage}
        >
          <Alert onClose={handleCloseMessage} severity={message.type} variant="filled" sx={{ width: '100%' }}>
            {message.text}
          </Alert>
        </Snackbar>
      )}
      <AppRouter />
    </UserProvider>
  );
};

export default App;
