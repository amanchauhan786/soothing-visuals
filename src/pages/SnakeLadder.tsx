import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Dice1, Dice2, Dice3, Dice4, Dice5, Dice6, Home, RotateCcw } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const diceIcons = [Dice1, Dice2, Dice3, Dice4, Dice5, Dice6];

// Snake and Ladder positions
const snakes = {
  16: 6, 47: 26, 49: 11, 56: 53, 62: 19, 64: 60, 87: 24, 93: 73, 95: 75, 98: 78
};

const ladders = {
  1: 38, 4: 14, 9: 21, 21: 42, 28: 84, 36: 44, 51: 67, 71: 91, 80: 100
};

const SnakeLadder: React.FC = () => {
  const [playerPosition, setPlayerPosition] = useState(0);
  const [diceValue, setDiceValue] = useState(1);
  const [isRolling, setIsRolling] = useState(false);
  const [gameStatus, setGameStatus] = useState<'playing' | 'won' | 'lost'>('playing');
  const [moves, setMoves] = useState(0);
  const navigate = useNavigate();
  const { toast } = useToast();

  const rollDice = useCallback(() => {
    if (isRolling || gameStatus !== 'playing') return;
    
    setIsRolling(true);
    setMoves(prev => prev + 1);
    
    // Animate dice rolling
    let rollCount = 0;
    const rollInterval = setInterval(() => {
      setDiceValue(Math.floor(Math.random() * 6) + 1);
      rollCount++;
      
      if (rollCount >= 10) {
        clearInterval(rollInterval);
        const finalDice = Math.floor(Math.random() * 6) + 1;
        setDiceValue(finalDice);
        
        // Move player
        const newPosition = Math.min(playerPosition + finalDice, 100);
        setPlayerPosition(newPosition);
        
        setIsRolling(false);
      }
    }, 100);
  }, [playerPosition, isRolling, gameStatus]);

  // Handle snakes and ladders
  useEffect(() => {
    if (playerPosition > 0 && !isRolling) {
      if (snakes[playerPosition]) {
        setTimeout(() => {
          setPlayerPosition(snakes[playerPosition]);
          toast({
            title: "Snake Bite! 🐍",
            description: `Slid down from ${playerPosition} to ${snakes[playerPosition]}`,
            variant: "destructive"
          });
        }, 500);
      } else if (ladders[playerPosition]) {
        setTimeout(() => {
          setPlayerPosition(ladders[playerPosition]);
          toast({
            title: "Ladder Climb! 🪜",
            description: `Climbed up from ${playerPosition} to ${ladders[playerPosition]}`,
          });
        }, 500);
      }
    }
  }, [playerPosition, isRolling, toast]);

  // Check win/lose conditions
  useEffect(() => {
    if (playerPosition === 100) {
      setGameStatus('won');
      toast({
        title: "Congratulations! 🎉",
        description: `You won in ${moves} moves!`,
      });
    } else if (moves >= 50) {
      setGameStatus('lost');
      toast({
        title: "Game Over! 😢",
        description: "Too many moves! Returning to home page in 3 seconds...",
        variant: "destructive"
      });
      setTimeout(() => {
        navigate('/');
      }, 3000);
    }
  }, [playerPosition, moves, navigate, toast]);

  const resetGame = () => {
    setPlayerPosition(0);
    setDiceValue(1);
    setMoves(0);
    setGameStatus('playing');
  };

  const goHome = () => {
    navigate('/');
  };

  const getCellContent = (cellNumber: number) => {
    const isPlayer = playerPosition === cellNumber;
    const hasSnake = snakes[cellNumber];
    const hasLadder = ladders[cellNumber];
    
    return (
      <div 
        className={`w-12 h-12 border-2 border-primary/20 flex items-center justify-center text-xs font-bold relative transition-all duration-300 ${
          isPlayer ? 'bg-gradient-to-br from-primary to-accent text-white shadow-lg scale-110' : 
          hasSnake ? 'bg-red-100 dark:bg-red-900/20' :
          hasLadder ? 'bg-green-100 dark:bg-green-900/20' :
          'bg-background hover:bg-secondary/50'
        }`}
      >
        {cellNumber}
        {hasSnake && <span className="absolute -top-1 -right-1 text-red-500">🐍</span>}
        {hasLadder && <span className="absolute -top-1 -right-1 text-green-500">🪜</span>}
        {isPlayer && <span className="absolute -bottom-2 text-lg">🎮</span>}
      </div>
    );
  };

  const DiceIcon = diceIcons[diceValue - 1];

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-accent/5 p-4">
      <div className="container mx-auto max-w-6xl">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Snake & Ladder Game
          </h1>
          <Button variant="outline" onClick={goHome} className="gap-2">
            <Home className="w-4 h-4" />
            Home
          </Button>
        </div>

        <div className="grid lg:grid-cols-4 gap-6">
          {/* Game Board */}
          <div className="lg:col-span-3">
            <Card className="p-6">
              <div className="grid grid-cols-10 gap-1 max-w-[520px] mx-auto">
                {Array.from({ length: 100 }, (_, i) => {
                  const row = Math.floor(i / 10);
                  const col = i % 10;
                  const cellNumber = row % 2 === 0 
                    ? (9 - row) * 10 + (col + 1)
                    : (9 - row) * 10 + (10 - col);
                  return getCellContent(cellNumber);
                })}
              </div>
            </Card>
          </div>

          {/* Game Controls */}
          <div className="space-y-4">
            <Card className="p-6">
              <h3 className="text-xl font-semibold mb-4">Game Status</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span>Position:</span>
                  <Badge variant="secondary" className="text-lg">{playerPosition}</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span>Moves:</span>
                  <Badge variant={moves > 40 ? "destructive" : "default"}>{moves}/50</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span>Status:</span>
                  <Badge variant={
                    gameStatus === 'won' ? 'default' : 
                    gameStatus === 'lost' ? 'destructive' : 
                    'secondary'
                  }>
                    {gameStatus === 'won' ? 'Won! 🎉' : 
                     gameStatus === 'lost' ? 'Lost 😢' : 
                     'Playing 🎮'}
                  </Badge>
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <h3 className="text-xl font-semibold mb-4">Dice</h3>
              <div className="text-center space-y-4">
                <div className="flex justify-center">
                  <div className={`p-4 border-2 border-primary/20 rounded-lg transition-all duration-300 ${
                    isRolling ? 'animate-bounce' : ''
                  }`}>
                    <DiceIcon className="w-12 h-12 text-primary" />
                  </div>
                </div>
                <Button 
                  onClick={rollDice}
                  disabled={isRolling || gameStatus !== 'playing'}
                  className="w-full"
                  size="lg"
                >
                  {isRolling ? 'Rolling...' : 'Roll Dice'}
                </Button>
                {gameStatus !== 'playing' && (
                  <Button 
                    onClick={resetGame}
                    variant="outline"
                    className="w-full gap-2"
                  >
                    <RotateCcw className="w-4 h-4" />
                    Play Again
                  </Button>
                )}
              </div>
            </Card>

            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-3">Rules</h3>
              <ul className="text-sm space-y-2 text-muted-foreground">
                <li>🎯 Reach position 100 to win</li>
                <li>🐍 Snakes slide you down</li>
                <li>🪜 Ladders climb you up</li>
                <li>⏰ Complete in 50 moves or less</li>
                <li>🎮 Roll dice to move forward</li>
              </ul>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SnakeLadder;