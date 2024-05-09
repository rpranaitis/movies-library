import styles from './UserBlock.module.scss';
import { useContext } from 'react';
import { UserContext } from '../../contexts/UserContext';

const UserBlock = () => {
  const { user } = useContext(UserContext);

  return (
    <div className={styles.container}>
      <span className={styles.welcome}>Welcome,</span>
      <span className={styles.email}>{user.email}</span>
    </div>
  );
};

export default UserBlock;
