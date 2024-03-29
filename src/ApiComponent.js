import React, { useState, useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import './ApiComponent.css'; // Import the CSS file for styling
import RetractablePanel from './RetractablePanel';
import Schedule from './Schedule'; // Import the Schedule component

const ApiComponent = () => {
  const { loginWithRedirect, logout, isAuthenticated, user } = useAuth0();
  const [exercisesByCategory, setExercisesByCategory] = useState({});

  useEffect(() => {
    const fetchExercises = async () => {
      try {
        const response = await fetch('https://capstone-api-81le.onrender.com/get_all_exercises');
        if (response.ok) {
          const exerciseData = await response.json();
          const groupedExercises = groupExercisesByCategory(exerciseData.exercises);

          // Fetch and set images for each exercise
          for (const category in groupedExercises) {
            for (const exercise of groupedExercises[category]) {
              const imageName = exercise.name; // Assuming exercise name matches image name
              const imageExtensions = ['jpg', 'jpeg']; // Array of accepted extensions
              let imageUrl = null;
              for (const extension of imageExtensions) {
                const imageURL = `https://capstone-api-81le.onrender.com/get_image/${imageName}.${extension}`;
                const imageResponse = await fetch(imageURL);
                if (imageResponse.ok) {
                  imageUrl = imageURL;
                  break; // Use the first valid image URL
                }
              }
              exercise.image = imageUrl; // Add image URL to exercise object
            }
          }

          setExercisesByCategory(groupedExercises); // Set state after setting images
        } else {
          console.error('Failed to fetch exercises');
        }
      } catch (error) {
        console.error('Error fetching exercises:', error);
      }
    };

    fetchExercises();
  }, [isAuthenticated]);

  const groupExercisesByCategory = (exercises) => {
    return exercises.reduce((grouped, exercise) => {
      if (!grouped[exercise.category]) {
        grouped[exercise.category] = [];
      }
      grouped[exercise.category].push(exercise);
      return grouped;
    }, {});
  };

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
      <div>
        {Object.keys(exercisesByCategory).map((category) => (
          <div key={category}>
            <h2>{category}</h2>
            <div className="grid-container">
              {exercisesByCategory[category].map((exercise) => (
                <div key={exercise.id} className="grid-item">
                  {exercise.image && <img src={exercise.image} alt={exercise.name} />} {/* Display exercise image if URL is available */}
                  <p>Name: {exercise.name}</p>
                  <p>Main Target: {exercise.main_target}</p>
                  {exercise.secondary_target !== 'N/A' && <p>Secondary Target: {exercise.secondary_target}</p>}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
      <RetractablePanel />
    </div>
  );
};

export default ApiComponent;