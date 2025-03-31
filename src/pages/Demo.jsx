import React from 'react';
import { useAuth } from '../contexts/AuthContext.jsx';
import { useNavigate } from 'react-router-dom';

const Demo = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="demo-page">
      <div className="demo-container">
        <h1>Welcome to Mazer</h1>
        <div className="user-info">
          <h2>Welcome, {user?.username || 'User'}!</h2>
          <p>You are logged in as: {user?.email}</p>
        </div>
        <div className="demo-content">
          <h3>Demo Features</h3>
          <ul>
            <li>Authentication System</li>
            <li>Protected Routes</li>
            <li>User Session Management</li>
            <li>Responsive Design</li>
          </ul>
        </div>
        <button className="logout-button" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </div>
  );
};

export default Demo; 