import PropTypes from 'prop-types';
import { createContext, useEffect, useState } from 'react';
import { checkUser } from '../api/auth';

const UserContext = createContext({
  user: null,
  isLoggedIn: false,
  handleLogin: () => {},
  handleLogOut: () => {},
});

const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const isLoggedIn = !!user;

  const handleLogin = (user, token) => {
    setUser(user);
    localStorage.setItem('token', token);
  };

  const handleLogOut = () => {
    setUser(null);
    localStorage.removeItem('token');
  };

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await checkUser();
        setUser(response);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUser();
  }, []);

  if (isLoading) {
    return;
  }

  return (
    <UserContext.Provider value={{ user, isLoggedIn, handleLogin, handleLogOut }}>{children}</UserContext.Provider>
  );
};

UserProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export { UserProvider, UserContext };
