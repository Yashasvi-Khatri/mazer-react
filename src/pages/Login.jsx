import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import AuthForm from '../components/AuthForm';
import { useAuth } from '../contexts/AuthContext.jsx';

const Login = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    // Initialize audio context after successful authentication
    if (isAuthenticated) {
      try {
        const AudioContext = window.AudioContext || window.webkitAudioContext;
        const audioContext = new AudioContext();
        sessionStorage.setItem('audioContextInitialized', 'true');

        if (audioContext.state === 'suspended') {
          audioContext.resume();
        }

        navigate('/dashboard');
      } catch (error) {
        console.error('Failed to initialize audio context:', error);
      }
    }
  }, [isAuthenticated, navigate]);

  return (
    <div className="auth-page neo-card">
      <Link to="/" className="btn-secondary back-button glass-card slide-up">
        <ArrowLeft size={20} />
        Back to Home
      </Link>
      <AuthForm type="login" />
    </div>
  );
};

export default Login; 