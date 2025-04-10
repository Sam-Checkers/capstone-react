import React, { useState, useEffect } from 'react';
import { useUserAuth } from './UserAuthContext';
import './ApiComponent.css';
import RetractablePanel from './RetractablePanel';

const ApiComponent = () => {
  const { isAuthenticated, userToken, setUserToken } = useUserAuth();

  const [exercisesByCategory, setExercisesByCategory] = useState({});
  const [schedule, setSchedule] = useState([]);
  const [retractablePanelKey, setRetractablePanelKey] = useState(0);

  const addExerciseToSchedule = async (exerciseId, day) => {
    try {
      // Since your IDs are now strings by default (like "chest-001"),
      // this conversion is redundant but harmless
      const exerciseIdStr = String(exerciseId);
      
      console.log('Exercise ID:', exerciseIdStr);
      console.log('Adding exercise to schedule:', exerciseIdStr, day);
  
      const tokenFromStorage = localStorage.getItem('token');
      if (!tokenFromStorage) {
        console.error('User token not found in local storage. Unable to add exercise to schedule.');
        return;
      }
  
      const url = `https://capstone-api-main-7d0x.onrender.com/add_user_exercise/${exerciseIdStr}`;
      console.log('Request URL:', url);
  
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${tokenFromStorage}`,
        },
        body: JSON.stringify({
          day: day,
          exerciseIdStr: exerciseIdStr  // This is good, keeping it as a string
        }),
      });
  
      if (response.ok) {
        const data = await response.json();
        console.log(data.message);
        if (data.newToken) {
          const newToken = data.newToken;
          localStorage.setItem('token', newToken);
        }
        // Make sure you're using the string ID here too
        setSchedule(prevSchedule => [...prevSchedule, { exerciseId: exerciseIdStr, day }]);
        setRetractablePanelKey(prevKey => prevKey + 1);
      } else {
        const errorData = await response.json();
        console.error('Error response:', errorData);
      }
    } catch (error) {
      console.error('An error occurred:', error);
    }
  };
  useEffect(() => {
    console.log('Checking for user token in local storage');
    const tokenFromStorage = localStorage.getItem('token');
    if (tokenFromStorage) {
      console.log('User token from registration:', tokenFromStorage);
      setUserToken(tokenFromStorage);
    }
  
    if (tokenFromStorage && isAuthenticated) {
      console.log('User token found:', tokenFromStorage);
  
      const fetchExercises = async () => {
        try {
          const response = await fetch('https://capstone-api-main-7d0x.onrender.com/get_all_exercises');
          if (response.ok) {
            const exerciseData = await response.json();
            const groupedExercises = groupExercisesByCategory(exerciseData.exercises);
            
            // Update this array with your new string IDs
            const exerciseIdsWithJpeg = [
              'chest-001','chest-002','chest-003', 'back-001', 'back-002', 'back-003', 'back-004', 'back-005', 
              'core-001','core-002','core-003','core-004','core-005', 'arms-001','arms-002','arms-003', 'arms-004', 
              'legs-001','legs-002','legs-003','legs-004', 'cardio-001','cardio-002','cardio-003','cardio-004',
            ];
            
            for (const category in groupedExercises) {
              for (const exercise of groupedExercises[category]) {
                const imageName = exercise.name;
                // Use includes with string comparison
                const imageExtensions = exerciseIdsWithJpeg.includes(exercise.id) ? ['jpeg'] : ['jpg', 'jpeg'];
                let imageUrl = null;
                for (const extension of imageExtensions) {
                  const imageURL = `https://capstone-api-main-7d0x.onrender.com/get_image/${imageName}.${extension}`;
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
  }, [isAuthenticated, setUserToken]);
  
  const groupExercisesByCategory = (exercises) => {
    return exercises.reduce((grouped, exercise) => {
      if (!grouped[exercise.category]) {
        grouped[exercise.category] = [];
      }
      grouped[exercise.category].push(exercise);
      return grouped;
    }, {});
  };
  
  const updateSchedule = (exerciseId, day) => {
    // This is already good - no changes needed
    setSchedule([...schedule, { exerciseId, day }]);
  };

  return (
    <div>
      <div className="category-container">
        {Object.keys(exercisesByCategory).map((category) => {
          const categoryClass = category.toLowerCase();
          const categoryInCaps = category.toUpperCase();
          return (
            <div key={category} className={`category-wrapper ${categoryClass}-category`}>
              <div className={`grid-container ${categoryClass} custom-grid-container`}>
                <div className="title">
                </div>
                {exercisesByCategory[category].map((exercise) => (
                  <div key={exercise.id} className="grid-item">
                    {exercise.image && <img src={exercise.image} alt={exercise.name} />}
                    <p className='exercise-names' >{exercise.name}</p>
                    <p className='main-target' >Main Target: {exercise.main_target}</p>
                    {exercise.secondary_target !== 'N/A' && <p className='secondary-target' >Secondary Target: {exercise.secondary_target}</p>}
                    <div className="button-container">
                      {isAuthenticated && <button onClick={() => addExerciseToSchedule(exercise.id, 'Sunday')}>Add to Sunday</button>}
                      {isAuthenticated && <button onClick={() => addExerciseToSchedule(exercise.id, 'Monday')}>Add to Monday</button>}
                      {isAuthenticated && <button onClick={() => addExerciseToSchedule(exercise.id, 'Tuesday')}>Add to Tuesday</button>}
                      {isAuthenticated && <button onClick={() => addExerciseToSchedule(exercise.id, 'Wednesday')}>Add to Wednesday</button>}
                      {isAuthenticated && <button onClick={() => addExerciseToSchedule(exercise.id, 'Thursday')}>Add to Thursday</button>}
                      {isAuthenticated && <button onClick={() => addExerciseToSchedule(exercise.id, 'Friday')}>Add to Friday</button>}
                      {isAuthenticated && <button onClick={() => addExerciseToSchedule(exercise.id, 'Saturday')}>Add to Saturday</button>}
                    </div>
                  </div>
                ))}
                <div className={`additional-column ${categoryClass}-additional-column`}>
                  <h1>{categoryInCaps}</h1>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <RetractablePanel key={retractablePanelKey} schedule={schedule} />
    </div>
  );
};

export default ApiComponent;