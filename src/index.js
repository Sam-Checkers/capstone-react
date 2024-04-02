import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { UserAuthProvider } from './UserAuthContext';

ReactDOM.render(
  <React.StrictMode>
    <UserAuthProvider>
      <App />
    </UserAuthProvider>
  </React.StrictMode>,
  document.getElementById('root')
);