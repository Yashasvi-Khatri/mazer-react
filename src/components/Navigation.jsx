import React from 'react';
import { Link } from 'react-router-dom';
import { Music } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext.jsx';

const Navigation = () => {
  const { isAuthenticated } = useAuth();

  return (
    <nav className="glass-card">
      <div className="nav-content">
        <Link to="/" className="logo">
          <Music className="beat" />
          <span>Mazer</span>
        </Link>

        <div className="nav-links">
          {isAuthenticated ? (
            <div className="nav-authenticated">
              <Link to="/dashboard" className="btn-secondary">
                Dashboard
              </Link>
              <Link to="/app" className="btn-primary">
                Create Beat
              </Link>
            </div>
          ) : (
            <div className="auth-buttons">
              <Link to="/login" className="btn-secondary">
                Login
              </Link>
              <Link to="/signup" className="btn-primary">
                Sign Up
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
