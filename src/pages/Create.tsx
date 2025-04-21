
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '@/components/Layout';
import BeatGenerator from '@/components/BeatGenerator';
import BeatVisualizer from '@/components/BeatVisualizer';
import MixerControls from '@/components/MixerControls';
import { toast } from 'sonner';
import { useAuth } from '@/context/AuthContext';
import { api } from '@/lib/api';

const Create = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [currentBeat, setCurrentBeat] = useState(null);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
      toast.error('Please log in to create beats');
    }
  }, [isAuthenticated, navigate]);

  const handleBeatGenerated = (beat) => {
    setCurrentBeat(beat);
  };

  const handleSaveBeat = async (beat) => {
    try {
      const savedBeat = await api.saveBeat(beat);
      setCurrentBeat(savedBeat);
      return savedBeat;
    } catch (error) {
      console.error('Error saving beat:', error);
      throw error;
    }
  };

  if (!isAuthenticated) {
    return null;
  }

  return (
    <Layout fullWidth>
      <div className="max-w-screen-xl mx-auto py-8 px-4 space-y-8 animate-fade-in">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Create Beat</h1>
          <p className="text-muted-foreground mt-1">
            Generate and customize your beat using AI
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1">
            <BeatGenerator onBeatGenerated={handleBeatGenerated} />
            
            {currentBeat && (
              <div className="mt-6">
                <MixerControls 
                  beat={currentBeat} 
                  onSave={handleSaveBeat} 
                />
              </div>
            )}
          </div>
          
          <div className="lg:col-span-2">
            {currentBeat ? (
              <BeatVisualizer 
                beat={currentBeat} 
                onSave={() => handleSaveBeat(currentBeat)}
              />
            ) : (
              <div className="h-full flex items-center justify-center glass-morphism rounded-xl p-8 text-center">
                <div className="max-w-md">
                  <h3 className="text-xl font-semibold mb-2">No Beat Selected</h3>
                  <p className="text-muted-foreground">
                    Generate a new beat using the form on the left, or explore your existing beats.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Create;
