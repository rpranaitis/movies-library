import PropTypes from 'prop-types';
import UserBlock from '../components/UserBlock/UserBlock';
import NavigationBar from '../components/NavigationBar/NavigationBar';
import Header from '../components/Header/Header';
import Subheader from '../components/Subheader/Subheader';
import MainBlock from '../components/MainBlock/MainBlock';
import Grid from '@mui/material/Grid';
import Box from '@mui/material//Box';

const AuthLayout = ({ children }) => {
  return (
    <Box display={'flex'}>
      <Grid container style={{ height: '100vh' }}>
        <Grid item xs={2}>
          <UserBlock />
          <NavigationBar />
        </Grid>
        <Grid item xs={10}>
          <Header />
          <Subheader />
          <MainBlock>{children}</MainBlock>
        </Grid>
      </Grid>
    </Box>
  );
};

AuthLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AuthLayout;
