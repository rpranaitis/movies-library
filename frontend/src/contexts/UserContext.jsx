import PropTypes from 'prop-types';
import { createContext, useState } from 'react';

const UserContext = createContext({
  user: {},
  isLoggedIn: false,
  handleLogin: () => {},
  handleLogOut: () => {},
});

const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const isLoggedIn = !!user; // null arba {...} => true arba false

  const handleLogin = (user) => {
    setUser(user);
  };

  const handleLogOut = () => {
    setUser(null);
  };

  return (
    <UserContext.Provider value={{ user, isLoggedIn, handleLogin, handleLogOut }}>{children}</UserContext.Provider>
  );
};

UserProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export { UserProvider, UserContext };
