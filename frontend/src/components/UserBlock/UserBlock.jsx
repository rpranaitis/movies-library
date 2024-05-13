import styles from './UserBlock.module.scss';
import { useContext } from 'react';
import { UserContext } from '../../contexts/UserContext';

const UserBlock = () => {
  const { user } = useContext(UserContext);

  return (
    <div className={styles.container}>
      <span className={styles.username}>{user.username}</span>
      <span className={styles.secondText}>Movies Library</span>
    </div>
  );
};

export default UserBlock;
