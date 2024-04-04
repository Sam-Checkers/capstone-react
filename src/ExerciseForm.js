import React, { useState } from 'react';

const ExerciseForm = () => {
  const [exerciseId, setExerciseId] = useState('');
  const [day, setDay] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`https://capstone-api-81le.onrender.com/add_user_exercise/${exerciseId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `${token}`
        },
        body: JSON.stringify({ day })
      });

      if (response.ok) {
        console.log('Exercise added successfully');
      } else {
        console.error('Failed to add exercise');
      }
    } catch (error) {
      console.error('An error occurred:', error);
    }
  };

  return (
    <div>
      <h2>Add Exercise</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="exerciseId">Exercise ID:</label>
          <input
            type="number"
            id="exerciseId"
            value={exerciseId}
            onChange={(e) => setExerciseId(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="day">Day:</label>
          <input
            type="text"
            id="day"
            value={day}
            onChange={(e) => setDay(e.target.value)}
          />
        </div>
        <button type="submit">Add Exercise</button>
      </form>
    </div>
  );
};

export default ExerciseForm;