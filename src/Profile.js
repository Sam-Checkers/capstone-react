import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import Schedule from './Schedule';

const Profile = () => {
  const { user, logout } = useAuth0();

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>User Profile</h1>
      {user.email && <p>{user.email}</p>}
      <button onClick={() => logout({ returnTo: window.location.origin })}>Log Out</button>
      <Schedule />
    </div>
  );
};

export default Profile;