import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext.jsx';
import { Link } from 'react-router-dom';
import { Music, Settings, User } from 'lucide-react';
import '../styles/Dashboard.css';

const Dashboard = () => {
  const { user } = useAuth();
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulating API call to fetch user data
    const fetchUserData = async () => {
      try {
        // In a real app, this would be a fetch call to your backend
        setLoading(true);
        
        // Simulate network delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Mock user data
        const mockData = {
          username: user?.username || 'Guest',
          email: user?.email || 'guest@example.com',
          createdAt: new Date().toISOString(),
          projects: [
            { id: 1, name: 'First Beat', createdAt: new Date().toISOString() },
            { id: 2, name: 'Party Mix', createdAt: new Date().toISOString() },
            { id: 3, name: 'Chill Vibes', createdAt: new Date().toISOString() }
          ]
        };
        
        setUserData(mockData);
      } catch (error) {
        console.error('Error fetching user data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [user]);

  if (loading) {
    return (
      <div className="dashboard-loading">
        <div className="spinner"></div>
        <p>Loading dashboard...</p>
      </div>
    );
  }

  return (
    <div className="dashboard-container">
      <div className="dashboard-header glass-card">
        <h1>Welcome, {userData?.username}!</h1>
        <p>Manage your projects and settings here</p>
      </div>

      <div className="dashboard-content">
        <div className="user-info-section glass-card">
          <div className="user-profile-large">
            <div className="avatar-placeholder">
              <User size={48} />
            </div>
            <div className="user-details">
              <h2>{userData?.username}</h2>
              <p>{userData?.email}</p>
              <p>Member since: {new Date(userData?.createdAt).toLocaleDateString()}</p>
            </div>
          </div>
        </div>

        <div className="projects-section glass-card">
          <div className="section-header">
            <h2>Your Projects</h2>
            <Link to="/app" className="btn-accent">
              <Music size={16} />
              Create New
            </Link>
          </div>
          
          <div className="projects-grid">
            {userData?.projects.map(project => (
              <div key={project.id} className="project-card neo-card">
                <h3>{project.name}</h3>
                <p>Created: {new Date(project.createdAt).toLocaleDateString()}</p>
                <div className="project-actions">
                  <Link to={`/app?project=${project.id}`} className="btn-secondary">
                    Open
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="settings-section glass-card">
          <div className="section-header">
            <h2>Settings</h2>
            <button className="btn-secondary">
              <Settings size={16} />
              Manage
            </button>
          </div>
          
          <div className="settings-options">
            <div className="setting-option">
              <h3>Theme</h3>
              <select className="setting-select">
                <option value="dark">Dark (Default)</option>
                <option value="light">Light</option>
                <option value="system">System</option>
              </select>
            </div>
            
            <div className="setting-option">
              <h3>Notifications</h3>
              <label className="switch">
                <input type="checkbox" checked />
                <span className="slider round"></span>
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
