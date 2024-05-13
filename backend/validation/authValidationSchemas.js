const yup = require('yup');

const registerSchema = yup.object().shape({
  username: yup.string().required('Username is required.'),
  password: yup.string().required('Password is required.').min(6, 'Password must be at least 6 characters.'),
  confirmPassword: yup
    .string()
    .required('Password confirmation is required.')
    .test('passwords-match', 'Passwords does not match.', function (value) {
      return this.parent.password === value;
    }),
});

const loginSchema = yup.object().shape({
  username: yup.string().required('Username is required.'),
  password: yup.string().required('Password is required.'),
});

module.exports = {
  registerSchema,
  loginSchema,
};
