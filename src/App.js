import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { UserAuthProvider, useUserAuth } from './UserAuthContext';
import NavBar from './NavBar';
import ApiComponent from './ApiComponent';
import Schedule from './Schedule';
import LoginPage from './Login';
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
    if (currentPath === '/') {
      componentToRender = <ApiComponent />;
    } else if (currentPath === '/schedule') {
      componentToRender = <Schedule />;
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