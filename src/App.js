import React, { useState, useEffect } from 'react';
import { Auth0Provider, useAuth0 } from '@auth0/auth0-react';
import ApiComponent from './ApiComponent.js';
import Profile from './Profile.js';

function App() {
  const { isAuthenticated } = useAuth0();
  const [view, setView] = useState('api');

  useEffect(() => {
    setView(isAuthenticated ? 'profile' : 'api');
  }, [isAuthenticated]);

  return (
    <Auth0Provider
      domain="dev-44w2oefzt0a2lc21.us.auth0.com"
      clientId="ysqE8bFO1asb2a3ST7SroLJbisXY2JUE"
      redirectUri={window.location.origin}
    >
      <div>
        <h1>My API App</h1>
        <button onClick={() => setView('profile')}>Profile</button>
        {view === 'api' && <ApiComponent />}
        {view === 'profile' && <Profile />}
      </div>
    </Auth0Provider>
  );
}

export default App;