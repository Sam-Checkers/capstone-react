import React, { createContext, useContext, useState, useEffect } from 'react';

export const UserAuthContext = createContext();

export const useUserAuth = () => {
  const context = useContext(UserAuthContext);
  if (!context) {
    throw new Error('useUserAuth must be used within a UserAuthProvider');
  }
  return context;
};

export const UserAuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userToken, setUserToken] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsAuthenticated(true);
      setUserToken(token);
    }
  }, []);


  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token !== userToken) {
      setIsAuthenticated(!!token);
      setUserToken(token);
    }
  }, [userToken]);

  const login = (token) => {
    localStorage.setItem('token', token);
    setIsAuthenticated(true);
    setUserToken(token);
  };

  const logout = () => {
    localStorage.removeItem('token');
    setIsAuthenticated(false);
    setUserToken(null);
  };

  return (
    <UserAuthContext.Provider value={{ isAuthenticated, userToken, login, logout, setUserToken }}>
      {children}
    </UserAuthContext.Provider>
  );
};

export default UserAuthProvider;