import React from 'react';
import ReactDOM from 'react-dom/client'; // Add this import
import App from './App.jsx';
import './index.css';
import { BrowserRouter as Router } from 'react-router-dom';
import { UserProvider } from '../context/userContext.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* <UserProvider>
      <Router> */}
        <App />
      {/* </Router>
    </UserProvider> */}
  </React.StrictMode>
);