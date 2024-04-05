import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { UserAuthProvider, useUserAuth } from './UserAuthContext';
import NavBar from './NavBar';
import Profile from './Profile';
import ApiComponent from './ApiComponent';
import Schedule from './Schedule';
import LoginPage from './Login';
import ExerciseForm from './ExerciseForm';
import Register from './Register';

function App() {
  const { isAuthenticated } = useUserAuth();
  const currentPath = window.location.pathname;

  let componentToRender;

  if (!isAuthenticated) {
    if (currentPath === '/register') {
      componentToRender = <Register />;
    } else {
      componentToRender = <LoginPage />;
    }
  } else {
    if (currentPath === '/profile') {
      componentToRender = <Profile />;
    } else if (currentPath === '/') {
      componentToRender = <ApiComponent />;
    } else if (currentPath === '/schedule') {
      componentToRender = <Schedule />;
    } else if (currentPath === '/exerciseform') {
      componentToRender = <ExerciseForm />;
    }
  }

  return (
    <UserAuthProvider>
      <Router>
        <div>
          <NavBar />
          <div>{componentToRender}</div>
        </div>
      </Router>
    </UserAuthProvider>
  );
}

export default App;