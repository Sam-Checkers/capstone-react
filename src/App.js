import React, { useState, useEffect } from 'react';
import RegistrationForm from './RegistrationForm';
import Profile from './Profile';
import ApiComponent from './ApiComponent';
import Schedule from './Schedule';
import Login from './Login';

function App() {
  const [showProfile, setShowProfile] = useState(false);
  const [currentPath, setCurrentPath] = useState(window.location.pathname);

  const handleShowProfile = () => {
    setShowProfile(true);
  };

  const handleLoginRedirect = () => {
    setCurrentPath('/login');
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

  return (
    <div>
      <button onClick={handleLoginRedirect}>Login</button>
      <div>{componentToRender}</div>
    </div>
  );
}

export default App;