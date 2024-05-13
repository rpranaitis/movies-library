import axios from 'axios';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import AppRouter from './router/AppRouter';
import { useEffect, useState } from 'react';
import { UserProvider } from './contexts/UserContext';
import { GenreProvider } from './contexts/GenreContext';
import { ThemeProvider } from '@mui/material/styles';
import { theme } from './styles/theme';

const App = () => {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(false);

  useEffect(() => {
    const requestInterceptor = axios.interceptors.request.use((config) => {
      const token = localStorage.getItem('authToken');
      config.headers.Authorization = `Bearer ${token}`;

      if (!config.dontUseSpinner) {
        setLoading(true);
      }

      return config;
    });

    const responseInterceptor = axios.interceptors.response.use(
      (response) => {
        if (!response.config.dontUseSpinner) {
          setLoading(false);
        }

        if (!response.config.dontShowSuccess) {
          setMessage({ text: response.data.message, type: 'success' });
        }

        return response;
      },
      (error) => {
        if (!error.response.config.dontUseSpinner) {
          setLoading(false);
        }

        if (!error.response.config.dontShowError) {
          setMessage({ text: error.response.data.message, type: 'error' });

          return;
        }

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
    <ThemeProvider theme={theme}>
      <UserProvider>
        <GenreProvider>
          <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={loading}>
            <CircularProgress color="inherit" />
          </Backdrop>
          {message && (
            <Snackbar
              open={Boolean(message)}
              autoHideDuration={6000}
              anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
              onClose={handleCloseMessage}
            >
              <Alert onClose={handleCloseMessage} severity={message.type} sx={{ width: '100%' }}>
                {message.text ? message.text : message.type === 'success' ? 'Unexpected success' : 'Unexpected error.'}
              </Alert>
            </Snackbar>
          )}
          <AppRouter />
        </GenreProvider>
      </UserProvider>
    </ThemeProvider>
  );
};

export default App;
