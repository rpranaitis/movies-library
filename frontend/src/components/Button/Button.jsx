import classNames from 'classnames';
import PropTypes from 'prop-types';
import styles from './Button.module.scss';

const Button = ({ className, children, ...props }) => {
  return (
    <button className={classNames(styles.button, className)} {...props}>
      {children}
    </button>
  );
};

Button.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node.isRequired,
};

export default Button;
