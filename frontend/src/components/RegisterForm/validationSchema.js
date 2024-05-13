import * as Yup from 'yup';

export const registerValidationSchema = Yup.object().shape({
  username: Yup.string().required('Username is required.').min(6, 'Username must be at least 6 characters.'),
  password: Yup.string().required('Password is required.').min(6, 'Password must be at least 6 characters.'),
  confirmPassword: Yup.string()
    .required('Password confirmation is required.')
    .test('passwords-match', 'Passwords must match.', function (value) {
      return this.parent.password === value;
    }),
});
