import styles from './Error.module.scss';
import { MdOutlineWarning } from 'react-icons/md';

const Error = ({ children }) => {
  return (
    <div className={styles.errorMessage}>
      <MdOutlineWarning />
      {children}
    </div>
  );
};

export default Error;
