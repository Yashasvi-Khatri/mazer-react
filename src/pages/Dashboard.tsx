import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '@/components/Layout';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { useAuth } from '@/context/AuthContext';
import { api } from '@/lib/api';
import { PlusCircle, Music, Calendar, Loader2 } from 'lucide-react';
import { format } from 'date-fns';
import ErrorBoundary from '@/components/ErrorBoundary';
import type { BeatPattern } from '@/types/beat';

const Dashboard = () => {
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [beats, setBeats] = useState<BeatPattern[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    } else {
      fetchBeats();
    }
  }, [isAuthenticated, navigate]);

  const fetchBeats = async () => {
    try {
      setIsLoading(true);
      const userBeats = await api.getUserBeats();
      setBeats(userBeats || []);
    } catch (error) {
      console.error('Error fetching beats:', error);
      toast.error('Failed to load beats');
      setBeats([]);
    } finally {
      setIsLoading(false);
    }
  };

  if (!isAuthenticated) {
    return null;
  }

  return (
    <Layout>
      <ErrorBoundary>
        <div className="space-y-8 animate-fade-in">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
              <p className="text-muted-foreground mt-1">
                Welcome back, {user?.username}. Here are your beats.
              </p>
            </div>
            <Button onClick={() => navigate('/create')} size="lg" className="w-full md:w-auto">
              <PlusCircle className="mr-2 h-4 w-4" />
              Create New Beat
            </Button>
          </div>

          {isLoading ? (
            <div className="flex items-center justify-center h-64">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          ) : beats.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {beats.map((beat) => (
                <Card key={beat?.id} className="overflow-hidden hover:shadow-md transition-shadow duration-300 glass-morphism">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-xl font-semibold">{beat?.name || 'Untitled Beat'}</CardTitle>
                    <CardDescription className="flex items-center space-x-2">
                      <span>{beat?.genre || 'No genre'}</span>
                      <span>•</span>
                      <span>{beat?.bpm || 0} BPM</span>
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="pb-3">
                    <div className="grid grid-cols-4 gap-1 h-12">
                      {Array.from({ length: 16 }).map((_, index) => {
                        const isKick = beat?.patterns?.kick?.[index] ?? false;
                        const isSnare = beat?.patterns?.snare?.[index] ?? false;
                        const isHihat = beat?.patterns?.hihat?.[index] ?? false;
                        
                        return (
                          <div 
                            key={index}
                            className={`h-3 rounded-sm ${
                              isKick ? 'bg-beat-primary' : 
                              isSnare ? 'bg-beat-secondary' : 
                              isHihat ? 'bg-beat-accent' : 'bg-muted/20'
                            }`}
                          />
                        );
                      })}
                    </div>
                  </CardContent>
                  <CardFooter className="flex items-center justify-between pt-2">
                    <div className="flex items-center text-xs text-muted-foreground">
                      <Calendar className="h-3 w-3 mr-1" />
                      {format(new Date(beat.createdAt), 'MMM d, yyyy')}
                    </div>
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => navigate(`/edit/${beat.id}`)}
                    >
                      <Music className="h-4 w-4 mr-1" />
                      Open
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          ) : (
            <Card>
              <CardHeader>
                <CardTitle>No beats yet</CardTitle>
                <CardDescription>
                  Start by creating your first beat.
                </CardDescription>
              </CardHeader>
              <CardFooter>
                <Button onClick={() => navigate('/create')}>
                  <PlusCircle className="mr-2 h-4 w-4" />
                  Create New Beat
                </Button>
              </CardFooter>
            </Card>
          )}
        </div>
      </ErrorBoundary>
    </Layout>
  );
};

export default Dashboard;
