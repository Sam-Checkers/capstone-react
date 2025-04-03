import React, { useState } from 'react';
import './Register.css';

const Register = ({ onRegistrationSuccess }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleRegister = async () => {
    try {
      const response = await fetch('https://capstone-api-main-7d0x.onrender.com/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: email, password: password }),
      });
      const data = await response.json();

      if (response.ok) {
        console.log('User token:', data.access_token);
        setMessage('Registration successful');
        onRegistrationSuccess();
      } else {
        setMessage('Registration failed');
      }
    } catch (error) {
      console.error(error);
      setMessage('Registration failed');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleRegister();
    }
  };

  return (
    <div className="register-box">
      <div className="register-container">
        <h2>Register</h2>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          onKeyPress={handleKeyPress}
          className="input-field"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          onKeyPress={handleKeyPress}
          className="input-field"
        />
        <button onClick={handleRegister} className="login-button">Register</button>
        <p className="message">{message}</p>
      </div>
    </div>
  );
};

export default Register;