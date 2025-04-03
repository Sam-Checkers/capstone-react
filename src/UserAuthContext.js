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
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsAuthenticated(true);
      setUserToken(token);
      fetchUserId(token);
    }
  }, []);

  const fetchUserId = (token) => {
    fetch(`https://capstone-api-main-7d0x.onrender.com/get_user_id/${token}`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        setUserId(data.user_id);
      })
      .catch(error => {
        console.error('Error fetching user id:', error);
      });
  };

  const login = (token) => {
    localStorage.setItem('token', token);
    setIsAuthenticated(true);
    setUserToken(token);
    fetchUserId(token);
  };

  const logout = () => {
    localStorage.removeItem('token');
    setIsAuthenticated(false);
    setUserToken(null);
    setUserId(null);
  };

  return (
    <UserAuthContext.Provider value={{ isAuthenticated, userToken, userId, login, logout, setUserToken }}>
      {children}
    </UserAuthContext.Provider>
  );
};

export default UserAuthProvider;