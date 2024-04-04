import React, { createContext, useContext, useState, useEffect } from 'react';

const UserAuthContext = createContext();

export const useUserAuth = () => {
  return useContext(UserAuthContext);
};

export const UserAuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [userToken, setUserToken] = useState(null); // Define userToken state
  
    useEffect(() => {
      const token = localStorage.getItem('token');
      if (token) {
        setIsAuthenticated(true);
        setUserToken(token); // Set userToken from local storage
      }
    }, []);
  
    const login = (token) => {
      localStorage.setItem('token', token);
      setIsAuthenticated(true);
      setUserToken(token); // Set userToken upon login
    };
  
    const logout = () => {
      localStorage.removeItem('token');
      setIsAuthenticated(false);
      setUserToken(null); // Clear userToken upon logout
    };
  
    return (
      <UserAuthContext.Provider value={{ isAuthenticated, userToken, login, logout }}>
        {children}
      </UserAuthContext.Provider>
    );
  };