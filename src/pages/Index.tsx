import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { 
  ArrowRight, 
  Music, 
  Wand2, 
  Radio, 
  Share2,
  Users
} from 'lucide-react';

const Index = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  
  return (
    <div className="min-h-screen flex flex-col">
      {/* Hero Header */}
      <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/80 backdrop-blur-md">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <Music className="h-6 w-6 text-primary" />
            <span className="text-xl font-semibold tracking-tight">Mazer</span>
          </div>
          
          <div className="flex items-center gap-4">
            {isAuthenticated ? (
              <Button 
                onClick={() => navigate('/dashboard')}
                className="animate-pulse-subtle"
              >
                Go to Dashboard
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            ) : (
              <>
                <Button 
                  variant="ghost" 
                  onClick={() => navigate('/login')}
                >
                  Log In
                </Button>
                <Button 
                  onClick={() => navigate('/signup')}
                  className="animate-pulse-subtle"
                >
                  Sign Up
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </>
            )}
          </div>
        </div>
      </header>
      
      {/* Hero Section */}
      <section className="flex-1 flex flex-col items-center justify-center px-4 py-20 md:py-32 text-center">
        <div className="max-w-3xl mx-auto space-y-6 animate-slide-up">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight">
            Create
            <span className="bg-gradient-to-r from-primary to-blue-500 bg-clip-text text-transparent px-2">
              AI-Powered
            </span>
            Beats
          </h1>
          
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Generate, mix, and collaborate on beats using state-of-the-art AI technology. Turn your musical ideas into reality in seconds.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <Button 
              size="lg" 
              onClick={() => navigate(isAuthenticated ? '/create' : '/signup')}
              className="animate-pulse-subtle"
            >
              {isAuthenticated ? 'Create a Beat' : 'Get Started for Free'}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              onClick={() => navigate('/about')}
            >
              Learn More
            </Button>
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section className="py-20 bg-muted/30">
        <div className="container">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl font-bold tracking-tight mb-4">How It Works</h2>
            <p className="text-muted-foreground">
              Generate beats with our AI, customize them to your liking, and collaborate with others in real-time.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: <Wand2 className="h-8 w-8 text-primary" />,
                title: 'AI Beat Generation',
                description: 'Describe the beat you want, and our AI will generate a custom beat pattern based on your prompt.'
              },
              {
                icon: <Radio className="h-8 w-8 text-primary" />,
                title: 'Real-time Mixing',
                description: 'Adjust tempo, volumes, and patterns in real-time with our intuitive interface.'
              },
              {
                icon: <Share2 className="h-8 w-8 text-primary" />,
                title: 'Collaborative Session',
                description: 'Share your beats with friends and collaborate on tracks together in real-time.'
              },
            ].map((feature, index) => (
              <div 
                key={index} 
                className="glass-morphism rounded-xl p-8 flex flex-col items-center text-center animate-fade-in" 
                style={{ animationDelay: `${index * 150}ms` }}
              >
                <div className="h-14 w-14 rounded-full bg-primary/10 flex items-center justify-center mb-6">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-b from-background to-muted/50">
        <div className="container max-w-4xl text-center">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-6">
            Ready to create your first beat?
          </h2>
          <p className="text-lg text-muted-foreground mb-8">
            Join thousands of music creators already using Mazer
          </p>
          <div className="flex justify-center gap-4">
            {isAuthenticated ? (
              <Button 
                onClick={() => navigate('/create')}
                className="animate-pulse-subtle glass-morphism"
                size="lg"
              >
                Create New Beat
                <Wand2 className="ml-2 h-4 w-4" />
              </Button>
            ) : (
              <>
                <Button 
                  variant="outline" 
                  onClick={() => navigate('/login')}
                  className="glass-morphism"
                  size="lg"
                >
                  Log In
                </Button>
                <Button 
                  onClick={() => navigate('/signup')}
                  className="animate-pulse-subtle glass-morphism"
                  size="lg"
                >
                  Sign Up
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </>
            )}
          </div>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="py-8 border-t border-border/40">
        <div className="container flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center gap-2 mb-4 md:mb-0">
            <Music className="h-5 w-5 text-primary" />
            <span className="font-semibold">Mazer</span>
          </div>
          
          <div className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} Mazer. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
