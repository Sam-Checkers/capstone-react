import React, { createContext, useState, useContext, useEffect } from 'react';

const UserAuthContext = createContext();

export const useUserAuth = () => {
  return useContext(UserAuthContext);
};

export const UserAuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(
    localStorage.getItem('isAuthenticated') === 'true'
  );

  const login = () => {
    setIsAuthenticated(true);
    localStorage.setItem('isAuthenticated', 'true');
  };

  const logout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('isAuthenticated');
  };

  useEffect(() => {

  }, []);

  return (
    <UserAuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </UserAuthContext.Provider>
  );
};

export default UserAuthContext;