import React, { useState, useEffect } from 'react';
import './ApiComponent.css';
import RetractablePanel from './RetractablePanel';
import { useUserAuth } from './UserAuthContext';
const ApiComponent = () => {
  const [user, setUser] = useState()
  useEffect(() => {
    const loggedInUser = localStorage.getItem("user");
    if (loggedInUser) {
      const foundUser = JSON.parse(loggedInUser);
      setUser(foundUser);
    }
  }, []);
  const { isAuthenticated, logout, login } = useUserAuth();
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
  const handleAddUserExercise = async (exerciseId, day) => {
    try {
      const response = await fetch(`https://capstone-api-81le.onrender.com/add_user_exercise/${exerciseId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ day }),
      });
      if (response.ok) {
      } else {
      }
    } catch (error) {
    }
  };

  const handleLogout = async () => {
    try {
      const response = await fetch('https://capstone-api-81le.onrender.com/logout', {
        method: 'GET',
      });
      if (response.ok) {
        // Perform any necessary actions after successful logout
        console.log('Logout successful');
      } else {
        // Handle unsuccessful logout
        console.error('Failed to logout');
      }
    } catch (error) {
      // Handle errors during logout
      console.error('Error during logout:', error);
    }
  };

  return (
    <div>
      <h1>Exercise List</h1>
      <div>
        {Object.keys(exercisesByCategory).map((category) => (
          <div key={category}>
            <h2 className='category-heading'>{category}</h2>
            <div className={`grid-container ${category.toLowerCase()}`}>
              {exercisesByCategory[category].map((exercise) => (
                <div key={exercise.id} className="grid-item">
                  {exercise.image && <img src={exercise.image} alt={exercise.name} />}
                  <p>Name: {exercise.name}</p>
                  <p>Main Target: {exercise.main_target}</p>
                  {exercise.secondary_target !== 'N/A' && <p>Secondary Target: {exercise.secondary_target}</p>}
                  <div>
                    <button onClick={() => handleAddUserExercise(exercise.id, 'Sunday')}>Add to Sunday</button>
                  </div>
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