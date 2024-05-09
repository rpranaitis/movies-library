import PropTypes from 'prop-types';
import classNames from 'classnames';
import styles from './Subheader.module.scss';

const Subheader = ({ className, children, ...props }) => {
  return <div className={classNames(styles.container, className)}>{children}</div>;
};

Subheader.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
};

export default Subheader;
