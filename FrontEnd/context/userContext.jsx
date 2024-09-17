import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const UserContext = createContext();

export const useUserContext = () => useContext(UserContext);

export const UserProvider = ({ children }) => {
  const [token, setToken] = useState(() => {
    // Retrieve the token as a string without parsing it
    return localStorage.getItem('token') || null;
  });

  useEffect(() => {
    if (token) {
      if (token.length > 10000) { // Example check for token size
        console.warn('Token is too large. Consider reducing its size.');
      } else {
        localStorage.setItem('token', token); // Store token directly
      }
    } else {
      localStorage.removeItem('token');
    }
  }, [token]);

  const login = async (jwt) => {
    try {
      const response = await axios.post(
        `https://localhost:5001/api/Auth/${jwt}`,
        {},
        {
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          withCredentials: true
        }
      );

      const { claims } = response.data; 

      console.log('User Data:', claims);
      setToken(jwt); 
      console.log("Stored Token:", jwt);
    } catch (error) {
      console.error("Error during login:", error);
    }
  };

  const clearJWT = () => {
    localStorage.removeItem('token');
  };

  const logout = () => {
    clearJWT();
    setToken(null);
    alert("Logging out. Thank you.");
  };

  return (
    <UserContext.Provider value={{ token, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};
