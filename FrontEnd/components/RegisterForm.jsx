import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const RegisterForm = ({ onSuccess }) => { 
  const [email, setEmail] = useState('');
  const [userName, setUserName] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    try {
      
      await axios.post('https://localhost:5001/api/User/register/', {
        email,
        userName,
        name,
        password,
        confirmPassword
      }, {
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true 
      });

     
      alert('Registration successful! Please log in.');
      setError('');
      
      
      setTimeout(() => onSuccess(), 1000); 
    } catch (err) {
      setError(err.response?.data?.message || 'An error occurred');
      setMessage('');
    }
  };

  return (
    <div className="max-w-full w-96 mx-auto p-10 border border-gray-300 rounded-lg bg-white">
      <h2 className="text-xl font-bold mb-4 text-center">Register</h2>
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
          <label htmlFor="userName" className="block text-sm font-medium mb-2">Username</label>
          <input 
            type="text" 
            id="userName" 
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="name" className="block text-sm font-medium mb-2">Name</label>
          <input 
            type="text" 
            id="name" 
            value={name}
            onChange={(e) => setName(e.target.value)}
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
        <div className="mb-4">
          <label htmlFor="confirm-password" className="block text-sm font-medium mb-2">Confirm Password</label>
          <input 
            type="password" 
            id="confirm-password" 
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <button 
          type="submit" 
          className="w-full py-2 bg-red-500 text-white rounded-md hover:bg-red-700 transition duration-300"
        >
          Register
        </button>
        {error && <p className="text-red-500 mt-2">{error}</p>}
        {message && <p className="text-green-500 mt-2">{message}</p>}
      </form>
    </div>
  );
};

export default RegisterForm;
