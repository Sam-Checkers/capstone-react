import React, { useState } from 'react';
import { useUserAuth } from './UserAuthContext';
import './Login.css';

const Login = () => {
  const { login } = useUserAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleLogin = async () => {
    try {
      const response = await fetch('https://capstone-api-main-7d0x.onrender.com/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: email, password: password }),
      });
      if (response.ok) {
        const data = await response.json();
        console.log('User token:', data.access_token);
        login(data.access_token);
        setMessage('Login successful');
        window.location.href = '/';
      } else {
        setMessage('Login failed');
      }
    } catch (error) {
      console.error(error);
      setMessage('Login failed');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleLogin();
  };

  return (
    <div className="login-box">
      <div className="login-container">
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit">Login</button>
        </form>
        <p>{message}</p>
      </div>
    </div>
  );
};

export default Login;