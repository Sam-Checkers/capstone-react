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
    console.log('handleShowProfile called');
    setShowProfile(true);
  };

  useEffect(() => {
    const handlePathChange = () => {
      console.log('handlePathChange called');
      setCurrentPath(window.location.pathname);
    };

    window.addEventListener('popstate', handlePathChange);

    return () => {
      window.removeEventListener('popstate', handlePathChange);
    };
  }, [currentPath]);

  console.log('currentPath:', currentPath);
  console.log('showProfile:', showProfile);

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

  return <div>{componentToRender}</div>;
}

export default App;