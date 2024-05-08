import NavTitle from './NavTitle';
import styles from './NavigationBar.module.scss';

const NavigationBar = () => {
  return (
    <nav className={styles.container}>
      <NavTitle>NAVIGATION</NavTitle>
    </nav>
  );
};

export default NavigationBar;
