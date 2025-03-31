import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Link } from 'react-router-dom';
import { Music, Settings, LogOut, LayoutDashboard, Volume2, Play, Pause, Square, Circle } from 'lucide-react';

const MazerApp = () => {
  const { user, logout } = useAuth();
  const [isPlaying, setIsPlaying] = useState(false);
  const [selectedInstruments, setSelectedInstruments] = useState(['Piano', 'Drums', 'Bass']);
  const [patternMix, setPatternMix] = useState({
    Piano: [1, 0, 1, 0, 1, 0, 1, 0],
    Drums: [1, 1, 0, 1, 0, 1, 1, 0],
    Bass: [1, 0, 0, 1, 0, 0, 1, 0],
  });

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
    // Add logic here to trigger audio playback based on isPlaying and patternMix
    // Without sound, this will only change the isPlaying state.
  };

  const handleInstrumentToggle = (instrument) => {
    setSelectedInstruments((prev) =>
      prev.includes(instrument)
        ? prev.filter((item) => item !== instrument)
        : [...prev, instrument]
    );
  };

  const handlePatternChange = (instrument, index) => {
    setPatternMix((prev) => ({
      ...prev,
      [instrument]: prev[instrument].map((val, i) => (i === index ? (val === 0 ? 1 : 0) : val)),
    }));
  };

  return (
    <div className="mazer-app">
      <nav className="app-nav glass-card">
        <div className="nav-content">
          <div className="nav-left">
            <Music className="beat" size={24} />
            <span className="logo-text">Mazer</span>
          </div>
          <div className="nav-right">
            <Link to="/dashboard" className="icon-button" title="Dashboard">
              <LayoutDashboard size={20} />
            </Link>
            <button className="icon-button" title="Settings">
              <Settings size={20} />
            </button>
            <button className="icon-button" title="Logout" onClick={logout}>
              <LogOut size={20} />
            </button>
            <div className="user-profile">
              <span className="username">{user?.username}</span>
            </div>
          </div>
        </div>
      </nav>

      <main className="app-main">
        <div className="workspace">
          <div className="workspace-header glass-card">
            <h1>Create Your Beat</h1>
            <p>Use AI to generate unique beats and customize them to your style</p>
          </div>

          <div className="controls-section glass-card">
            <button className="btn-primary" onClick={togglePlay}>
              {isPlaying ? <Pause size={20} /> : <Play size={20} />}
              {isPlaying ? 'Pause' : 'Play'}
            </button>
          </div>

          <div className="tracks-section glass-card">
            <h2>Your Tracks</h2>
            <div className="tracks-grid">
              {[1, 2, 3].map((track) => (
                <div key={track} className="track-card neo-card">
                  <div className="track-info">
                    <h3>Track {track}</h3>
                    <p>Created just now</p>
                  </div>
                  <div className="track-controls">
                    <button className="icon-button">
                      <Volume2 size={16} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="instruments-section glass-card">
            <h2>Instruments</h2>
            <div className="instruments-grid">
              {['Piano', 'Drums', 'Bass', 'Synth'].map((instrument) => (
                <button
                  key={instrument}
                  className={`instrument-button ${selectedInstruments.includes(instrument) ? 'selected' : ''}`}
                  onClick={() => handleInstrumentToggle(instrument)}
                >
                  {instrument}
                </button>
              ))}
            </div>
          </div>

          <div className="pattern-mixer glass-card">
            <h2>Pattern Mixer</h2>
            {selectedInstruments.map((instrument) => (
              <div key={instrument} className="pattern-track">
                <h3>{instrument}</h3>
                <div className="pattern-steps">
                  {patternMix[instrument]?.map((step, index) => (
                    <button
                      key={index}
                      className={`pattern-step ${step === 1 ? 'active' : ''}`}
                      onClick={() => handlePatternChange(instrument, index)}
                    >
                      {step === 1 ? <Square size={16} /> : <Circle size={16} />}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default MazerApp;