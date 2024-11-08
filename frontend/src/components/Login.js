import React, { useState } from 'react';
import axios from 'axios';

function Login() {
  const [isStreamer, setIsStreamer] = useState(true);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    const endpoint = isStreamer ? '/api/auth/login' : '/api/auth/login/moderator';
    try {
      const response = await axios.post(endpoint, { username, password });
      console.log('Login successful:', response.data);
    } catch (error) {
      console.error('Login error:', error.response.data);
    }
  };

  const handleRegister = async () => {
    if (!isStreamer) return;
    try {
      const response = await axios.post('/api/auth/register', { username, password });
      console.log('Registration successful:', response.data);
    } catch (error) {
      console.error('Registration error:', error.response.data);
    }
  };

  return (
    <div className="p-4">
      <div className="mb-4">
        <button onClick={() => setIsStreamer(true)} className={`p-2 mr-2 ${isStreamer ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}>Login Streamer</button>
        <button onClick={() => setIsStreamer(false)} className={`p-2 ${!isStreamer ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}>Login Moderador</button>
      </div>
      <div className="mb-4">
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="border p-2 mr-2"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border p-2 mr-2"
        />
        <button onClick={handleLogin} className="bg-blue-500 text-white p-2 mr-2">Login</button>
        {isStreamer && <button onClick={handleRegister} className="bg-green-500 text-white p-2">Register</button>}
      </div>
    </div>
  );
}

export default Login;