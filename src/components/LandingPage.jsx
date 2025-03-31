import React from 'react';
import { Link } from 'react-router-dom';
import { Music, Wand2, Radio, Share2 } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext.jsx';
import Navigation from './Navigation';

const LandingPage = () => {
  const { isAuthenticated } = useAuth();

  return (
    <div className="landing-page neo-card fade-in">
      <Navigation />

      {/* Hero Section */}
      <section className="hero glass-card fade-in">
        <div className="hero-content neo-card">
          <h1 className="pulse-slow">Create AI-Powered Beats</h1>
          <p>Transform your musical ideas into reality with our cutting-edge AI beat generation platform</p>
          <div className="cta-buttons glass-card">
            {isAuthenticated ? (
              <Link to="/dashboard" className="btn-primary slide-up">Go to Dashboard</Link>
            ) : (
              <Link to="/signup" className="btn-primary slide-up">Get Started for Free</Link>
            )}
            <a href="#about" className="btn-secondary">Learn More</a>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="features neo-card slide-up">
        <h2>How It Works</h2>
        <div className="feature-grid glass-card">
          <div className="feature-card neo-card">
            <div className="icon-wrapper beat">
              <Wand2 size={32} />
            </div>
            <h3>AI Beat Generation</h3>
            <p>Create unique beats using advanced AI algorithms trained on diverse music styles</p>
          </div>
          <div className="feature-card neo-card">
            <div className="icon-wrapper pulse-slow">
              <Radio size={32} />
            </div>
            <h3>Real-time Mixing</h3>
            <p>Mix and customize your beats in real-time with professional-grade tools</p>
          </div>
          <div className="feature-card neo-card">
            <div className="icon-wrapper beat">
              <Share2 size={32} />
            </div>
            <h3>Collaborative Session</h3>
            <p>Share and collaborate with other producers in real-time</p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta glass-card fade-in">
        <div className="cta-content neo-card">
          <h2 className="pulse-slow">Ready to create?</h2>
          <p>Join thousands of musicians who are already creating with Mazer</p>
          {isAuthenticated ? (
            <Link to="/app" className="btn-primary slide-up">Create Your First Beat</Link>
          ) : (
            <Link to="/signup" className="btn-primary slide-up">Sign Up Now</Link>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="footer neo-card">
        <div className="footer-content glass-card">
          <Link to="/" className="footer-logo">
            <Music className="beat" />
            <span>Mazer</span>
          </Link>
          <p className="copyright">&copy; {new Date().getFullYear()} Mazer. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage; 