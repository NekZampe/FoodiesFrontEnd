import React, { useState } from 'react';
import Header from '../components/Header';
import LoginForm from '../components/LoginForm';
import RegisterForm from '../components/RegisterForm';

const LoginPage = () => {
  const [showLogin, setShowLogin] = useState(true);

  const toggleForm = () => {
    setShowLogin(!showLogin);
  };

  return (
    <div className="bg-[url('https://images.pexels.com/photos/70497/pexels-photo-70497.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1')] bg-cover bg-center min-h-screen">
      <Header />
      <div className="flex flex-col items-center justify-center min-h-screen space-y-4">
        {showLogin ? <LoginForm /> : <RegisterForm />}
        <button
          onClick={toggleForm}
          className="mt-4 py-2 px-4 bg-red-400 text-black rounded-md hover:bg-red-600 transition duration-300"
        >
          {showLogin ? 'Create Account' : 'Sign In'}
        </button>
      </div>
    </div>
  );
};

export default LoginPage;
