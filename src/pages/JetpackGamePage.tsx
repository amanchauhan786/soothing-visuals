import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, RotateCcw } from 'lucide-react';
import JetpackGame from '@/components/games/JetpackGame';

const JetpackGamePage: React.FC = () => {
  return (
    <div className="min-h-screen bg-background pt-20 pb-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-8 text-center">
          <Link 
            to="/" 
            className="inline-flex items-center px-4 py-2 text-primary hover:text-primary/80 transition-colors duration-300 mb-4"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Portfolio
          </Link>
          
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
            Jetpack Engineer
          </h1>
          
          <p className="text-xl text-muted-foreground mb-6 max-w-2xl mx-auto">
            Help our brave engineer navigate through obstacles using his trusty jetpack! 
            Tap or press Space to fly through the challenging course.
          </p>
          
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            <div className="bg-primary/10 border border-primary/20 rounded-lg px-4 py-2">
              <span className="text-sm font-medium text-primary">🚀 Tap to Fly</span>
            </div>
            <div className="bg-primary/10 border border-primary/20 rounded-lg px-4 py-2">
              <span className="text-sm font-medium text-primary">⚡ Avoid Obstacles</span>
            </div>
            <div className="bg-primary/10 border border-primary/20 rounded-lg px-4 py-2">
              <span className="text-sm font-medium text-primary">🏆 Beat High Score</span>
            </div>
          </div>
        </div>

        {/* Game Container */}
        <div className="max-w-md mx-auto">
          <div className="bg-gradient-to-br from-background via-primary/5 to-accent/5 p-6 rounded-2xl shadow-xl border border-primary/20">
            <JetpackGame />
          </div>
          
          {/* Game Instructions */}
          <div className="mt-6 bg-background/80 backdrop-blur-sm border border-primary/20 rounded-xl p-4">
            <h3 className="text-lg font-semibold text-primary mb-2">How to Play</h3>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>• Tap anywhere on the game or press Space to make the engineer fly</li>
              <li>• Navigate through the gaps between obstacles</li>
              <li>• Don't hit the ground, ceiling, or obstacles</li>
              <li>• Each obstacle you pass increases your score</li>
              <li>• Try to beat your high score!</li>
            </ul>
          </div>
        </div>

        {/* Additional Info */}
        <div className="text-center mt-12">
          <p className="text-muted-foreground mb-4">
            Built with HTML5 Canvas and smooth animations for the best gaming experience
          </p>
          <Link 
            to="/" 
            className="inline-flex items-center px-6 py-3 bg-primary text-primary-foreground rounded-xl shadow-lg hover:shadow-xl hover:shadow-primary/25 transition-all duration-300 hover:-translate-y-1"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Explore More Projects
          </Link>
        </div>
      </div>
    </div>
  );
};

export default JetpackGamePage;