import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';

const Profile = ({ exercise }) => {
  const { user, isAuthenticated } = useAuth0();

  if (!isAuthenticated) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>User Profile</h2>
      <img src={user.picture} alt={user.name} />
      <p>Name: {user.name}</p>
      <p>Email: {user.email}</p>
      {exercise && (
        <div>
          <h3>Selected Exercise</h3>
          <p>Name: {exercise.name}</p>
          <p>Main Target: {exercise.main_target}</p>
        </div>
      )}
    </div>
  );
};

export default Profile;