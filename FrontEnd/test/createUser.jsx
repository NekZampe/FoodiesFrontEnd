import React from 'react';
import axios from 'axios';

const CreateUser = () => {
  const createUser = async () => {
    try {
      const user = {
        email: 'example@example.com',
        userName: 'exampleuser',
        name: 'John Doe',
        password: 'password123',
        confirmPassword: 'password123'
      };

      const response = await axios.post('https://localhost:5001/api/user/Register', user, {
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true
      });

      console.log('User created:', response.data);
    } catch (error) {
      console.error('Error creating user:', error.response?.data || error.message);
    }
  };

  return (
    <div>
      <button onClick={createUser}>Create User</button>
    </div>
  );
};

export default CreateUser;
