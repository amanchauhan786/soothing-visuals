import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Home, RotateCcw, ArrowUp, ArrowDown, ArrowLeft, ArrowRight, Pause, Play } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const GRID_SIZE = 20;
const INITIAL_SNAKE = [{ x: 10, y: 10 }];
const INITIAL_FOOD = { x: 15, y: 15 };
const INITIAL_DIRECTION = { x: 0, y: -1 };

type Position = { x: number; y: number };
type Direction = { x: number; y: number };

const SnakeGame: React.FC = () => {
  const [snake, setSnake] = useState<Position[]>(INITIAL_SNAKE);
  const [food, setFood] = useState<Position>(INITIAL_FOOD);
  const [direction, setDirection] = useState<Direction>(INITIAL_DIRECTION);
  const [gameRunning, setGameRunning] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(() => {
    return parseInt(localStorage.getItem('snakeHighScore') || '0');
  });
  const [isPaused, setIsPaused] = useState(false);
  const gameLoopRef = useRef<NodeJS.Timeout>();
  const navigate = useNavigate();
  const { toast } = useToast();

  // Generate random food position
  const generateFood = useCallback((currentSnake: Position[]): Position => {
    let newFood: Position;
    do {
      newFood = {
        x: Math.floor(Math.random() * GRID_SIZE),
        y: Math.floor(Math.random() * GRID_SIZE),
      };
    } while (currentSnake.some(segment => segment.x === newFood.x && segment.y === newFood.y));
    return newFood;
  }, []);

  // Move snake
  const moveSnake = useCallback(() => {
    if (!gameRunning || isPaused || gameOver) return;

    setSnake(currentSnake => {
      const newSnake = [...currentSnake];
      const head = { ...newSnake[0] };
      
      head.x += direction.x;
      head.y += direction.y;

      // Check wall collision
      if (head.x < 0 || head.x >= GRID_SIZE || head.y < 0 || head.y >= GRID_SIZE) {
        setGameOver(true);
        setGameRunning(false);
        toast({
          title: "Game Over! 🐍",
          description: `You hit the wall! Final score: ${score}`,
          variant: "destructive"
        });
        setTimeout(() => navigate('/'), 3000);
        return currentSnake;
      }

      // Check self collision
      if (newSnake.some(segment => segment.x === head.x && segment.y === head.y)) {
        setGameOver(true);
        setGameRunning(false);
        toast({
          title: "Game Over! 🐍",
          description: `Snake ate itself! Final score: ${score}`,
          variant: "destructive"
        });
        setTimeout(() => navigate('/'), 3000);
        return currentSnake;
      }

      newSnake.unshift(head);

      // Check food collision
      if (head.x === food.x && head.y === food.y) {
        setScore(prev => {
          const newScore = prev + 10;
          if (newScore > highScore) {
            setHighScore(newScore);
            localStorage.setItem('snakeHighScore', newScore.toString());
            toast({
              title: "New High Score! 🏆",
              description: `Amazing! New record: ${newScore}`,
            });
          }
          return newScore;
        });
        setFood(generateFood(newSnake));
        toast({
          title: "Yummy! 🍎",
          description: "+10 points",
        });
      } else {
        newSnake.pop();
      }

      return newSnake;
    });
  }, [direction, food, gameRunning, isPaused, gameOver, score, highScore, navigate, toast, generateFood]);

  // Game loop
  useEffect(() => {
    if (gameRunning && !isPaused && !gameOver) {
      gameLoopRef.current = setInterval(moveSnake, 150);
    } else {
      if (gameLoopRef.current) {
        clearInterval(gameLoopRef.current);
      }
    }

    return () => {
      if (gameLoopRef.current) {
        clearInterval(gameLoopRef.current);
      }
    };
  }, [moveSnake, gameRunning, isPaused, gameOver]);

  // Handle keyboard input
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (!gameRunning || gameOver) return;

      switch (e.key) {
        case 'ArrowUp':
          e.preventDefault();
          if (direction.y === 0) setDirection({ x: 0, y: -1 });
          break;
        case 'ArrowDown':
          e.preventDefault();
          if (direction.y === 0) setDirection({ x: 0, y: 1 });
          break;
        case 'ArrowLeft':
          e.preventDefault();
          if (direction.x === 0) setDirection({ x: -1, y: 0 });
          break;
        case 'ArrowRight':
          e.preventDefault();
          if (direction.x === 0) setDirection({ x: 1, y: 0 });
          break;
        case ' ':
          e.preventDefault();
          setIsPaused(prev => !prev);
          break;
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [direction, gameRunning, gameOver]);

  const startGame = () => {
    setSnake(INITIAL_SNAKE);
    setFood(INITIAL_FOOD);
    setDirection(INITIAL_DIRECTION);
    setScore(0);
    setGameRunning(true);
    setGameOver(false);
    setIsPaused(false);
  };

  const pauseGame = () => {
    setIsPaused(prev => !prev);
  };

  const resetGame = () => {
    setSnake(INITIAL_SNAKE);
    setFood(INITIAL_FOOD);
    setDirection(INITIAL_DIRECTION);
    setScore(0);
    setGameRunning(false);
    setGameOver(false);
    setIsPaused(false);
  };

  const goHome = () => {
    navigate('/');
  };

  const changeDirection = (newDirection: Direction) => {
    if (!gameRunning || gameOver) return;
    
    // Prevent reversing into itself
    if (direction.x === 0 && newDirection.x === 0) return;
    if (direction.y === 0 && newDirection.y === 0) return;
    
    setDirection(newDirection);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-500/5 via-background to-emerald-500/5 p-4">
      <div className="container mx-auto max-w-6xl">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-green-500 to-emerald-600 bg-clip-text text-transparent">
            Snake Game 🐍
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
              <div className="relative">
                <div 
                  className="grid border-4 border-green-500/20 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/10 dark:to-emerald-900/10 rounded-lg overflow-hidden mx-auto"
                  style={{
                    gridTemplateColumns: `repeat(${GRID_SIZE}, 1fr)`,
                    width: '500px',
                    height: '500px'
                  }}
                >
                  {Array.from({ length: GRID_SIZE * GRID_SIZE }, (_, i) => {
                    const x = i % GRID_SIZE;
                    const y = Math.floor(i / GRID_SIZE);
                    const isSnakeHead = snake[0]?.x === x && snake[0]?.y === y;
                    const isSnakeBody = snake.slice(1).some(segment => segment.x === x && segment.y === y);
                    const isFood = food.x === x && food.y === y;

                    return (
                      <div
                        key={i}
                        className={`border border-green-100/20 transition-all duration-150 ${
                          isSnakeHead 
                            ? 'bg-gradient-to-br from-green-600 to-emerald-700 shadow-lg scale-105' 
                            : isSnakeBody 
                            ? 'bg-gradient-to-br from-green-500 to-emerald-600' 
                            : isFood 
                            ? 'bg-gradient-to-br from-red-500 to-pink-600 animate-pulse shadow-lg' 
                            : ''
                        }`}
                      >
                        {isFood && (
                          <div className="w-full h-full flex items-center justify-center text-white font-bold text-xs">
                            🍎
                          </div>
                        )}
                        {isSnakeHead && (
                          <div className="w-full h-full flex items-center justify-center text-white font-bold">
                            👁️
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>

                {/* Game Over Overlay */}
                {gameOver && (
                  <div className="absolute inset-0 bg-black/50 backdrop-blur-sm rounded-lg flex items-center justify-center">
                    <div className="text-center text-white">
                      <h2 className="text-3xl font-bold mb-2">Game Over! 🐍</h2>
                      <p className="text-lg mb-4">Returning to home page...</p>
                      <div className="animate-spin w-8 h-8 border-4 border-white border-t-transparent rounded-full mx-auto"></div>
                    </div>
                  </div>
                )}

                {/* Pause Overlay */}
                {isPaused && gameRunning && (
                  <div className="absolute inset-0 bg-black/30 backdrop-blur-sm rounded-lg flex items-center justify-center">
                    <div className="text-center text-white">
                      <h2 className="text-3xl font-bold mb-2">Paused ⏸️</h2>
                      <p className="text-lg">Press Space or Play button to continue</p>
                    </div>
                  </div>
                )}
              </div>
            </Card>
          </div>

          {/* Game Controls */}
          <div className="space-y-4">
            <Card className="p-6">
              <h3 className="text-xl font-semibold mb-4">Score</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span>Current:</span>
                  <Badge variant="default" className="text-lg bg-green-500">{score}</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span>High Score:</span>
                  <Badge variant="secondary" className="text-lg">{highScore}</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span>Length:</span>
                  <Badge variant="outline">{snake.length}</Badge>
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <h3 className="text-xl font-semibold mb-4">Controls</h3>
              <div className="space-y-4">
                {!gameRunning ? (
                  <Button onClick={startGame} className="w-full bg-green-500 hover:bg-green-600" size="lg">
                    Start Game
                  </Button>
                ) : (
                  <Button 
                    onClick={pauseGame} 
                    className="w-full gap-2" 
                    size="lg"
                    variant={isPaused ? "default" : "outline"}
                  >
                    {isPaused ? <Play className="w-4 h-4" /> : <Pause className="w-4 h-4" />}
                    {isPaused ? 'Resume' : 'Pause'}
                  </Button>
                )}
                
                <Button onClick={resetGame} variant="outline" className="w-full gap-2">
                  <RotateCcw className="w-4 h-4" />
                  Reset
                </Button>
              </div>
            </Card>

            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-3">Direction</h3>
              <div className="grid grid-cols-3 gap-2">
                <div></div>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => changeDirection({ x: 0, y: -1 })}
                  disabled={!gameRunning || gameOver}
                >
                  <ArrowUp className="w-4 h-4" />
                </Button>
                <div></div>
                
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => changeDirection({ x: -1, y: 0 })}
                  disabled={!gameRunning || gameOver}
                >
                  <ArrowLeft className="w-4 h-4" />
                </Button>
                <div></div>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => changeDirection({ x: 1, y: 0 })}
                  disabled={!gameRunning || gameOver}
                >
                  <ArrowRight className="w-4 h-4" />
                </Button>
                
                <div></div>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => changeDirection({ x: 0, y: 1 })}
                  disabled={!gameRunning || gameOver}
                >
                  <ArrowDown className="w-4 h-4" />
                </Button>
                <div></div>
              </div>
            </Card>

            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-3">How to Play</h3>
              <ul className="text-sm space-y-2 text-muted-foreground">
                <li>🎯 Eat the red apples to grow</li>
                <li>🐍 Don't hit walls or yourself</li>
                <li>⌨️ Use arrow keys to move</li>
                <li>⏸️ Press Space to pause</li>
                <li>🏆 Beat your high score!</li>
              </ul>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SnakeGame;