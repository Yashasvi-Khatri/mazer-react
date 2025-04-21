import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import MazerEmailField from './MazerEmailField.tsx';
import MazerUsernameField from './MazerUsernameField.js';
import MazerPasswordField from './MazerPasswordField.tsx';
import MazerAuthSubmitButton from './MazerAuthSubmitButton.tsx';

const MazerSignupForm = () => {
  const { signup, isLoading } = useAuth();
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    email: '',
    username: '',
    password: '',
  });
  
  const [validationErrors, setValidationErrors] = useState({
    email: '',
    username: '',
    password: '',
  });
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear validation error when user types
    if (validationErrors[name]) {
      setValidationErrors(prev => ({ ...prev, [name]: '' }));
    }
  };
  
  const validate = () => {
    const errors = {
      email: '',
      username: '',
      password: '',
    };
    
    // Email validation
    if (!formData.email) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = 'Email is invalid';
    }
    
    // Username validation
    if (!formData.username) {
      errors.username = 'Username is required';
    }
    
    // Password validation
    if (!formData.password) {
      errors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      errors.password = 'Password must be at least 6 characters';
    }
    
    setValidationErrors(errors);
    
    return !Object.values(errors).some(error => error);
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validate()) return;
    
    await signup(formData.email, formData.username, formData.password);
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="space-y-4">
        <MazerEmailField 
          value={formData.email}
          onChange={handleChange}
          error={validationErrors.email}
        />
        
        <MazerUsernameField 
          value={formData.username}
          onChange={handleChange}
          error={validationErrors.username}
        />
        
        <MazerPasswordField 
          value={formData.password}
          onChange={handleChange}
          error={validationErrors.password}
        />
        
        <MazerAuthSubmitButton isLoading={isLoading} label="Sign Up" />
      </form>
      
      <div className="flex justify-center mt-4">
        <p className="text-sm text-gray-400">
          Already have an account?{' '}
          <Button 
            variant="link" 
            className="p-0 h-auto text-white" 
            onClick={() => navigate('/login')}
          >
            Log in
          </Button>
        </p>
      </div>
    </>
  );
};

export default MazerSignupForm;
