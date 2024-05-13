import styles from './Header.module.scss';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import { useContext } from 'react';
import { UserContext } from '../../contexts/UserContext';

const Header = () => {
  const { handleLogOut } = useContext(UserContext);

  return (
    <div className={styles.container}>
      <Box display={'flex'} flexDirection={'column'} alignItems={'start'} gap={1.8}>
        <span style={{ fontStyle: 'italic' }}>This place is for your advertisement</span>
        <span className={styles.credentials}>
          Project created by <span style={{ fontWeight: 600 }}>rolandaspranaitis@gmail.com</span>
        </span>
      </Box>
      <Button
        size="large"
        onClick={handleLogOut}
        variant="text"
        startIcon={<ExitToAppIcon />}
        sx={{ padding: '10px 20px 10px 20px', marginRight: -1 }}
      >
        Leave the library
      </Button>
    </div>
  );
};

export default Header;
