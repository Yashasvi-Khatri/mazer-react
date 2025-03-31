import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff, ArrowRight, Loader2 } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext.jsx';

const AuthForm = ({ type }) => {
  const navigate = useNavigate();
  const { login, signup, error, useDemoAccount } = useAuth();
  const [formData, setFormData] = useState({
    email: '',
    username: type === 'signup' ? '' : undefined,
    password: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState({
    length: false,
    uppercase: false,
    lowercase: false,
    number: false,
    special: false,
  });

  useEffect(() => {
    // Check for remembered email
    const rememberedEmail = localStorage.getItem('rememberedEmail');
    if (rememberedEmail) {
      setFormData(prev => ({ ...prev, email: rememberedEmail }));
    }
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    if (type === 'checkbox') {
      if (name === 'rememberMe') {
        if (checked) {
          localStorage.setItem('rememberedEmail', formData.email);
        } else {
          localStorage.removeItem('rememberedEmail');
        }
      }
      return;
    }

    setFormData(prev => ({ ...prev, [name]: value }));

    if (name === 'password') {
      setPasswordStrength({
        length: value.length >= 8,
        uppercase: /[A-Z]/.test(value),
        lowercase: /[a-z]/.test(value),
        number: /[0-9]/.test(value),
        special: /[!@#$%^&*(),.?":{}|<>]/.test(value),
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      if (type === 'login') {
        await login(formData.email, formData.password);
      } else {
        await signup(formData.email, formData.username, formData.password);
      }
      navigate('/app');
    } catch (error) {
      console.error('Auth error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDemoLogin = async () => {
    setIsLoading(true);
    try {
      await useDemoAccount();
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="auth-form glass-card fade-in">
      <div className="form-container neo-card">
        <h1>{type === 'login' ? 'Welcome back' : 'Create an account'}</h1>
        <p className="description">
          {type === 'login' 
            ? 'Enter your credentials to access your account'
            : 'Fill in your details to get started'
          }
        </p>
        <form onSubmit={handleSubmit}>
          {type === 'signup' && (
            <div className="form-group">
              <label htmlFor="username">Username</label>
              <input
                type="text"
                id="username"
                name="username"
                value={formData.username}
                onChange={handleChange}
                required
                placeholder="Choose a username"
                disabled={isLoading}
                className="input-field"
              />
            </div>
          )}
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="Enter your email"
              disabled={isLoading}
              className={`input-field ${formData.email && !/\S+@\S+\.\S+/.test(formData.email) ? 'error' : ''}`}
            />
            {formData.email && !/\S+@\S+\.\S+/.test(formData.email) && (
              <p className="error-message">Please enter a valid email address</p>
            )}
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <div className="password-input">
              <input
                type={showPassword ? 'text' : 'password'}
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                placeholder="Enter your password"
                disabled={isLoading}
                className="input-field"
              />
              <button
                type="button"
                className="btn-secondary"
                onClick={() => setShowPassword(!showPassword)}
                disabled={isLoading}
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>
          {type === 'signup' && (
            <div className="password-requirements">
              <p>Password Requirements:</p>
              <ul>
                <li className={passwordStrength.length ? 'met' : ''}>
                  At least 8 characters
                </li>
                <li className={passwordStrength.uppercase ? 'met' : ''}>
                  One uppercase letter
                </li>
                <li className={passwordStrength.lowercase ? 'met' : ''}>
                  One lowercase letter
                </li>
                <li className={passwordStrength.number ? 'met' : ''}>
                  One number
                </li>
                <li className={passwordStrength.special ? 'met' : ''}>
                  One special character
                </li>
              </ul>
            </div>
          )}
          {type === 'login' && (
            <div className="form-group checkbox">
              <label>
                <input
                  type="checkbox"
                  name="rememberMe"
                  onChange={handleChange}
                  checked={!!localStorage.getItem('rememberedEmail')}
                  disabled={isLoading}
                />
                Remember me
              </label>
            </div>
          )}
          {error && <div className="error-message">{error}</div>}
          <button 
            type="submit" 
            className="btn-primary submit-button"
            disabled={isLoading || (formData.email && !/\S+@\S+\.\S+/.test(formData.email))}
          >
            {isLoading ? (
              <>
                <Loader2 size={20} className="beat" />
                {type === 'login' ? 'Logging in...' : 'Signing up...'}
              </>
            ) : (
              <>
                {type === 'login' ? 'Log In' : 'Sign Up'}
                <ArrowRight size={20} />
              </>
            )}
          </button>
        </form>
        {type === 'login' && (
          <button
            type="button"
            className="demo-button"
            onClick={handleDemoLogin}
            disabled={isLoading}
          >
            {isLoading ? (
              <span className="loading-spinner"></span>
            ) : (
              'Use Demo Account'
            )}
          </button>
        )}
        <p className="auth-switch">
          {type === 'login' ? "Don't have an account? " : "Already have an account? "}
          <Link to={type === 'login' ? '/signup' : '/login'}>
            {type === 'login' ? 'Sign up' : 'Sign in'}
          </Link>
        </p>
      </div>
    </div>
  );
};

export default AuthForm; 