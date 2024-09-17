import React, { useState } from 'react';
import axios from 'axios';
import '../src/index.css'; 
import { useNavigate } from 'react-router-dom';
import { useUserContext } from '../context/userContext.jsx'; // Ensure the correct path and import

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate(); 
  const { login } = useUserContext(); // Get the login function from context

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Submitting data:', { email, password });
    try {
      const response = await axios.post('https://localhost:5001/api/User/login/', {
        email,
        password,
      }, {
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true 
      });

      const { token } = response.data;
      console.log("token from backend\n", token);

      console.log("Attempting Login");
      
      login(token); 

      console.log("Login Function Successful");
      navigate('/mainpage'); 
    } catch (err) {
      setError(err.response?.data?.message || 'An error occurred'); 
      setMessage(''); 
    }
  };

  return (
    <div className="max-w-full w-96 mx-auto p-10 border border-gray-300 rounded-lg bg-white">
      <h2 className="text-xl font-bold mb-4 text-center">Login</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-medium mb-2">Email</label>
          <input 
            type="email" 
            id="email" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="password" className="block text-sm font-medium mb-2">Password</label>
          <input 
            type="password" 
            id="password" 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <button 
          type="submit" 
          className="w-full py-2 bg-red-500 text-white rounded-md hover:bg-red-700 transition duration-300"
        >
          Enter
        </button>
        {error && <p className="text-red-500 mt-2">{error}</p>} 
        {message && <p className="text-green-500 mt-2">{message}</p>}
      </form>
      <p className="w-full text-center pt-5 text-blue-500">Forgot Password?</p>
    </div>
  );
};

export default LoginForm;
