import React, { useEffect, useState } from 'react';
import moment from 'moment';
import './Schedule.css';
const Schedule = ({ isPanel }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [token, setToken] = useState('');
  const [userId, setUserId] = useState(null);
  const [daysOfWeek, setDaysOfWeek] = useState([]);
  const [organizedExercises, setOrganizedExercises] = useState({});
  const getTokenFromLocalStorage = () => {
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      setToken(storedToken);
      setIsAuthenticated(true);
      console.log('Token:', storedToken);
    }
  };
  const fetchUserExercises = (userId, token) => {
    fetch(`https://capstone-api-81le.onrender.com/user_exercise/${userId}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        const organized = {};
        const fetchExerciseDetails = data.map(async exercise => {
          const { day, exercise_id } = exercise;
          if (!organized[day]) {
            organized[day] = [];
          }
          const exerciseResponse = await fetch(`https://capstone-api-81le.onrender.com/get_exercise/${exercise_id}`);
          const exerciseData = await exerciseResponse.json();
          const imageNameJpg = `${exerciseData.exercise.name}.jpg`;
          const imageNameJpeg = `${exerciseData.exercise.name}.jpeg`;
          let exerciseImageUrl = `https://capstone-api-81le.onrender.com/get_image/${imageNameJpg}`;
          const jpgResponse = await fetch(exerciseImageUrl);
          if (!jpgResponse.ok) {
            exerciseImageUrl = `https://capstone-api-81le.onrender.com/get_image/${imageNameJpeg}`;
          }
          organized[day].push({ id: exercise_id, name: exerciseData.exercise.name, image: exerciseImageUrl });
        });
        Promise.all(fetchExerciseDetails).then(() => {
          setOrganizedExercises(organized);
          console.log('Organized Exercises:', organized);
        });
      })
      .catch(error => {
        console.error('Error fetching user exercises:', error);
      });
  };
  useEffect(() => {
    getTokenFromLocalStorage();
    if (isAuthenticated) {
      const currentDate = moment();
      const startOfWeek = currentDate.clone().startOf('week');
      const days = [];
      for (let i = 0; i < 7; i++) {
        const day = startOfWeek.clone().add(i, 'days');
        days.push({
          dayOfWeek: day.format('dddd'),
          dayOfMonth: day.format('D'),
          month: day.format('MMMM')
        });
      }
      setDaysOfWeek(days);
      fetch(`https://capstone-api-81le.onrender.com/get_user_id/${token}`)
        .then(response => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json();
        })
        .then(data => {
          setUserId(data.user_id);
          console.log('User ID:', data.user_id);
          fetchUserExercises(data.user_id, token);
        })
        .catch(error => {
          console.error('Error fetching user id:', error);
        });
    }
  }, [isAuthenticated, token]);

  const handleRemoveExercise = (exerciseId, dayOfWeek) => {
    fetch(`https://capstone-api-81le.onrender.com/remove_user_exercise/${exerciseId}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ day: dayOfWeek })
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      console.log('Exercise removed successfully:', data);
      const updatedExercises = { ...organizedExercises };
      updatedExercises[dayOfWeek] = updatedExercises[dayOfWeek].filter(exercise => exercise.id !== exerciseId);
      setOrganizedExercises(updatedExercises);
    })
    .catch(error => {
      console.error('Error removing exercise:', error);
    });
  };


  return (
    <div>
      <h2>Schedule</h2>
      {isAuthenticated ? (
        <div className="calendar-grid">
          {daysOfWeek.map((day, index) => (
            <div key={index} className="calendar-day">
              <div className="day-header">
                <div>{day.dayOfWeek}</div>
                <div>{day.dayOfMonth}</div>
                <div>{day.month}</div>
              </div>
              <div className="exercises-list">
                {organizedExercises[day.dayOfWeek] && organizedExercises[day.dayOfWeek].map((exercise, index) => (
                  <div key={index} className={`exercise-item ${exercise.completed ? 'completed' : ''} ${isPanel ? 'smaller' : ''}`}>
                    <div className="exercise-details">
                      <div className="exercise-name">{exercise.name}</div>
                      <img src={exercise.image} alt={exercise.name} className="exercise-image" />
                    </div>
                    <div className='exercise-buttons'>
                      <button onClick={() => handleRemoveExercise(exercise.id, day.dayOfWeek)} className={`remove-button ${isPanel ? 'smaller' : ''}`}>
                        Remove
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p>Please log in to view the schedule.</p>
      )}
    </div>
  );
};

export default Schedule;