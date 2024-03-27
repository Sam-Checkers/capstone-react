import React, { useState, useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';

const ApiComponent = () => {
  const { loginWithRedirect, logout, isAuthenticated, user } = useAuth0();
  const [exercises, setExercises] = useState([]);

  useEffect(() => {
    const fetchExercises = async () => {
      try {
        const response = await fetch('https://capstone-api-81le.onrender.com/get_all_exercises');
        if (response.ok) {
          const exerciseData = await response.json();
          console.log('Fetched exercises:', exerciseData);
          setExercises(exerciseData.exercises);
          console.log('Updated exercises state:', exercises);
        } else {
          console.error('Failed to fetch exercises');
        }
      } catch (error) {
        console.error('Error fetching exercises:', error);
      }
    };

    fetchExercises();
  }, [isAuthenticated]);

  return (
    <div>
      <h1>Exercise List</h1>
      {isAuthenticated ? (
        <div>
          <p>Welcome, {user.name}!</p>
          <button onClick={() => logout({ returnTo: window.location.origin })}>Log Out</button>
        </div>
      ) : (
        <button onClick={() => loginWithRedirect()}>Log In</button>
      )}
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Category</th>
            <th>Name</th>
            <th>Main Target</th>
            <th>Secondary Target</th>
          </tr>
        </thead>
        <tbody>
          {exercises.map((exercise) => (
            <tr key={exercise.id}>
              <td>{exercise.id}</td>
              <td>{exercise.category}</td>
              <td>{exercise.name}</td>
              <td>{exercise.main_target}</td>
              <td>{exercise.secondary_target}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ApiComponent;