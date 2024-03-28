import React, { useState } from 'react';
import RegistrationForm from './RegistrationForm';
import Profile from './Profile';
import ApiComponent from './ApiComponent';

function App() {
  const [showProfile, setShowProfile] = useState(false);

  const handleShowProfile = () => {
    setShowProfile(true);
  };

  return (
    <div>
      <h1>User Registration</h1>
      {!showProfile && <RegistrationForm onShowProfile={handleShowProfile} />}
      {showProfile && <Profile />}
    </div>
  );
}

export default App;