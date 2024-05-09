import styles from './Header.module.scss';
import Button from '@mui/material/Button';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import { useContext } from 'react';
import { UserContext } from '../../contexts/UserContext';

const Header = () => {
  const { handleLogOut } = useContext(UserContext);

  return (
    <div className={styles.container}>
      Search
      <Button
        size="large"
        onClick={handleLogOut}
        variant="text"
        startIcon={<ExitToAppIcon />}
        sx={{ padding: '10px 20px 10px 20px' }}
      >
        Leave the library
      </Button>
    </div>
  );
};

export default Header;
