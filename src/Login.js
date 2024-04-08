import React, { useState } from 'react';
import { useUserAuth } from './UserAuthContext';

const Login = () => {
  const { login } = useUserAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleLogin = async () => {
    try {
      // Make a POST request to the backend API to authenticate the user
      const response = await fetch('https://capstone-api-81le.onrender.com/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: email, password: password }),
      });
      const data = await response.json();
      
      // Display the token in the console
      console.log('User token:', data.access_token);
      
      // Call the login function with the received token if the login is successful
      login(data.access_token);
      
      setMessage('Login successful');
    } catch (error) {
      console.error(error);
      setMessage('Login failed');
    }
  };

  return (
    <div>
      <h2>Login</h2>
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
      <button onClick={handleLogin}>Login</button>
      <p>{message}</p>
    </div>
  );
};

export default Login;