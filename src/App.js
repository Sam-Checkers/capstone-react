import React, { useState, useEffect } from 'react';
import RegistrationForm from './RegistrationForm';
import Profile from './Profile';
import ApiComponent from './ApiComponent';
import Schedule from './Schedule';

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

  return (
    <div>
      {currentPath === '/register' && !showProfile && <RegistrationForm onShowProfile={handleShowProfile} />}
      {currentPath === '/profile' && <Profile />}
      {currentPath === '/api' && <ApiComponent />}
      {currentPath === '/schedule' && <Schedule />}
    </div>
  );
}

export default App;