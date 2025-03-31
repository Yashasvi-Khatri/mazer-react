import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

const Layout = ({ children }) => {
  return (
    <div className="neo-card slide-up">
      <Link to="/" className="btn-secondary">
        <ArrowLeft size={20} />
        Back to Home
      </Link>
      <main className="glass-card fade-in">
        {children}
      </main>
    </div>
  );
};

export default Layout; 