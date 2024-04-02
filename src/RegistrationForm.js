import React, { useState } from 'react';

const RegistrationPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleRegistration = () => {
    fetch('https://capstone-api-81le.onrender.com/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    })
      .then(response => {
        if (response.ok) {
          setMessage('Registration successful!');
          // Handle any further actions after successful registration
        } else {
          setMessage('Registration failed. Please try again.');
          // Handle any further actions after failed registration
        }
      })
      .catch(error => {
        setMessage('Registration failed. Please try again.');
        // Handle any further actions after failed registration
      });
  };

  return (
    <div>
      <h2>Register</h2>
      <form>
        <div>
          <label>Email:</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div>
          <label>Password:</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
        <button type="button" onClick={handleRegistration}>Register</button>
      </form>
      <p>{message}</p>
    </div>
  );
};

export default RegistrationPage;