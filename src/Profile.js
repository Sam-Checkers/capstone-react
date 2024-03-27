import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';

const Profile = () => {
  const { user, logout } = useAuth0();

  if (!user) {
    return <div>Loading...</div>; // Add a loading state while user data is being fetched
  }

  return (
    <div>
      <h1>User Profile</h1>
      {user.email && <p>{user.email}</p>}
      <button onClick={() => logout({ returnTo: window.location.origin })}>Log Out</button>
    </div>
  );
};

export default Profile;