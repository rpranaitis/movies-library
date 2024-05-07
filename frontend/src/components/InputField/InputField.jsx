import classNames from 'classnames';
import PropTypes from 'prop-types';
import styles from './InputField.module.scss';
import { Field } from 'formik';

const InputField = ({ className, children, ...props }) => {
  return (
    <div className={styles.fieldWrapper}>
      {children && <div className={styles.icon}>{children}</div>}
      <Field style={children ? { paddingLeft: 33 } : {}} className={classNames(styles.input, className)} {...props} />
    </div>
  );
};

InputField.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
};

export default InputField;
