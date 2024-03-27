import React from 'react';
import { Auth0Provider } from '@auth0/auth0-react';
import ApiComponent from './ApiComponent.js';
import Profile from './Profile.js';

function App() {
  const currentPath = window.location.pathname;

  return (
    <Auth0Provider
      domain="dev-44w2oefzt0a2lc21.us.auth0.com"
      clientId="ysqE8bFO1asb2a3ST7SroLJbisXY2JUE"
      redirectUri={window.location.origin}
    >
      <div>
        <h1>My API App</h1>
        {currentPath === '/profile' ? <Profile /> : <ApiComponent />}
      </div>
    </Auth0Provider>
  );
}

export default App;