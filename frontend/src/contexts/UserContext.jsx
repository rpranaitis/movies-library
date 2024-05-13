import PropTypes from 'prop-types';
import { createContext, useEffect, useState } from 'react';
import { checkUser } from '../api/auth';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../router/constants';

const UserContext = createContext({
  user: null,
  isLoggedIn: false,
  handleLogin: () => {},
  handleLogOut: () => {},
});

const UserProvider = ({ children }) => {
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const isLoggedIn = !!user;

  const handleLogin = (user, token) => {
    setUser(user);
    localStorage.setItem('authToken', token);
  };

  const handleLogOut = () => {
    setUser(null);
    localStorage.removeItem('authToken');
    navigate(ROUTES.HOME);
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
