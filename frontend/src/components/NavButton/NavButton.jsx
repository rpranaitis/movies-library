import classNames from 'classnames';
import PropTypes from 'prop-types';
import styles from './NavButton.module.scss';

const NavButton = ({ className, children, active, icon: Icon, ...props }) => {
  return (
    <button className={classNames(styles.button, { [styles.active]: active }, className)} {...props}>
      {Icon && <Icon />}
      <span className={styles.name}>{children}</span>
    </button>
  );
};

NavButton.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node.isRequired,
  active: PropTypes.bool,
  icon: PropTypes.elementType,
};

export default NavButton;
