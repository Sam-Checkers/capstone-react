import React, { useState, useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import './ApiComponent.css';
import RetractablePanel from './RetractablePanel';
import Schedule from './Schedule';

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

          for (const category in groupedExercises) {
            for (const exercise of groupedExercises[category]) {
              const imageName = exercise.name;
              const imageExtensions = ['jpg', 'jpeg'];
              let imageUrl = null;
              for (const extension of imageExtensions) {
                const imageURL = `https://capstone-api-81le.onrender.com/get_image/${imageName}.${extension}`;
                const imageResponse = await fetch(imageURL);
                if (imageResponse.ok) {
                  imageUrl = imageURL;
                  break;
                }
              }
              exercise.image = imageUrl;
            }
          }

          setExercisesByCategory(groupedExercises);
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

  // Event handlers for drag and drop
  const handleDragStart = (event, exerciseId) => {
    event.dataTransfer.setData('text/plain', exerciseId);
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const handleDrop = (event, category) => {
    event.preventDefault();
    const exerciseId = event.dataTransfer.getData('text/plain');
    // Handle the drop action, e.g., move the exercise to the new category
    // You can update the state or make an API call to update the exercise category
  };

  return (
    <div>
      <h1>Exercise List</h1>
      {isAuthenticated ? (
        <div>
          <p>Welcome, {user.name}!</p>
          <button onClick={() => logout({ returnTo: window.location.origin })}>Log Out</button>
        </div>
      ) : null}
      <div>
        {Object.keys(exercisesByCategory).map((category) => (
          <div key={category}>
            <h2>{category}</h2>
            <div className="grid-container">
              {exercisesByCategory[category].map((exercise) => (
                <div
                  key={exercise.id}
                  className="grid-item"
                  draggable="true" // Make the grid item draggable
                  onDragStart={(event) => handleDragStart(event, exercise.id)} // Event handler for drag start
                  onDragOver={handleDragOver} // Event handler for drag over
                  onDrop={(event) => handleDrop(event, category)} // Event handler for drop
                >
                  {exercise.image && <img src={exercise.image} alt={exercise.name} />}
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