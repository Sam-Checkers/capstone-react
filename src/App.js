import React, { useState, useEffect } from 'react';
import RegistrationForm from './RegistrationForm';
import Profile from './Profile';
import ApiComponent from './ApiComponent';
import Schedule from './Schedule';
import Login from './Login';

function App() {
  const [showProfile, setShowProfile] = useState(false);
  const [currentPath, setCurrentPath] = useState(window.location.pathname);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleShowProfile = () => {
    setShowProfile(true);
  };

  const handleLoginRedirect = () => {
    setCurrentPath('/login');
  };

  const handleLogout = () => {
    fetch('https://capstone-api-81le.onrender.com/logout')
      .then(response => {
        if (response.ok) {
          setIsLoggedIn(false);
          setCurrentPath('/');
        }
      })
      .catch(error => {
        console.error('Error logging out:', error);
      });
  };

  useEffect(() => {
    const handlePathChange = () => {
      setCurrentPath(window.location.pathname);
    };

    window.addEventListener('popstate', handlePathChange);

    return () => {
      window.removeEventListener('popstate', handlePathChange);
    };
  }, [currentPath]);

  let componentToRender;

  if (currentPath === '/register' && !showProfile) {
    componentToRender = <RegistrationForm onShowProfile={handleShowProfile} />;
  } else if (currentPath === '/profile') {
    componentToRender = <Profile />;
  } else if (currentPath === '/') {
    componentToRender = <ApiComponent />;
  } else if (currentPath === '/schedule') {
    componentToRender = <Schedule />;
  } else if (currentPath === '/login') {
    componentToRender = <Login />;
  }

  let buttonToRender;

  if (currentPath === '/login') {
    buttonToRender = <button onClick={handleLoginRedirect}>Login</button>;
  } else if (isLoggedIn) {
    buttonToRender = <button onClick={handleLogout}>Logout</button>;
  }

  return (
    <div>
      {buttonToRender}
      <div>{componentToRender}</div>
    </div>
  );
}

export default App;