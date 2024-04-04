import React, { useState, useEffect } from 'react';
import { UserAuthProvider } from './UserAuthContext';  // Import the UserAuthProvider
import RegistrationForm from './RegistrationForm';
import Profile from './Profile';
import ApiComponent from './ApiComponent';
import Schedule from './Schedule';
import Login from './Login';
import ExerciseForm from './ExerciseForm';

function App() {
  const [currentPath, setCurrentPath] = useState(window.location.pathname);

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

  if (currentPath === '/register') {
    componentToRender = <RegistrationForm />;
  } else if (currentPath === '/profile') {
    componentToRender = <Profile />;
  } else if (currentPath === '/') {
    componentToRender = <ApiComponent />;
  } else if (currentPath === '/schedule') {
    componentToRender = <Schedule />;
  } else if (currentPath === '/login') {
    componentToRender = <Login />;
  } else if (currentPath === '/exerciseform') {
    componentToRender = <ExerciseForm />;
  }

  return (
    <UserAuthProvider>  {/* Wrap your components with the UserAuthProvider */}
      <div>
        <div>{componentToRender}</div>
      </div>
    </UserAuthProvider>
  );
}

export default App;