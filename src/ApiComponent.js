import React, { useState, useEffect } from 'react';
import { useUserAuth } from './UserAuthContext';
import './ApiComponent.css';
import RetractablePanel from './RetractablePanel';

const ApiComponent = () => {
  const { isAuthenticated, userToken  } = useUserAuth();
  const [exercisesByCategory, setExercisesByCategory] = useState({});
  console.log('isAuthenticated:', isAuthenticated);
  console.log('userToken:', userToken);

  const addExerciseToSchedule = async (exerciseId, day) => {
    try {
      console.log('User Token:', userToken);
      const jwtToken = `${userToken}`;
      const response = await fetch(`https://capstone-api-81le.onrender.com/add_user_exercise/${exerciseId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': jwtToken,
        },
        body: JSON.stringify({ day: day }),
      });
  
      if (response.ok) {
        try {
          const data = await response.json();
          console.log(data.message);
        } catch (error) {
          console.error('Error parsing JSON:', error);
        }
      } else {
        try {
          const errorData = await response.json();
          console.error(errorData.error);
        } catch (error) {
          console.error('Error parsing error JSON:', error);
        }
      }
    } catch (error) {
      console.error('An error occurred:', error);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      console.log('User is logged in');

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
    }
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
      <div className="category-container">
        {Object.keys(exercisesByCategory).map((category) => {
          const categoryInCaps = category.toUpperCase();
          return (
            <div key={category} className="category-wrapper">
              <div className={`grid-container ${category.toLowerCase()}`}>
                <div className="category-header">
                  <h2 className='category-heading'>{categoryInCaps}</h2>
                </div>
                {exercisesByCategory[category].map((exercise) => (
                  <div key={exercise.id} className="grid-item">
                    {exercise.image && <img src={exercise.image} alt={exercise.name} />}
                    <p>Name: {exercise.name}</p>
                    <p>Main Target: {exercise.main_target}</p>
                    {exercise.secondary_target !== 'N/A' && <p>Secondary Target: {exercise.secondary_target}</p>}
                    {isAuthenticated && <button onClick={() => addExerciseToSchedule(exercise.id, 'Sunday')}>Add to Sunday</button>}
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
      <RetractablePanel />
    </div>
  );
};

export default ApiComponent;