import React, { useState } from 'react';

const RegistrationPage = ({ onRegistrationSuccess }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleRegistration = () => {
    fetch('https://capstone-api-main-7d0x.onrender.com/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    })
      .then(response => {
        if (response.ok) {
          setMessage('Registration successful!');
          onRegistrationSuccess();
        } else {
          setMessage('Registration failed. Please try again.');
        }
      })
      .catch(error => {
        setMessage('Registration failed. Please try again.');
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