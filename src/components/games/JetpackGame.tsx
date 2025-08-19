import React, { useEffect, useRef, useState, useCallback } from 'react';
import { Play, RotateCcw, Trophy } from 'lucide-react';

interface GameObject {
  x: number;
  y: number;
  width: number;
  height: number;
}

interface Obstacle extends GameObject {
  passed: boolean;
  type: 'test' | 'blueprint' | 'computer' | 'code' | 'circuit';
}

const JetpackGame: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const gameLoopRef = useRef<number>();
  const [gameState, setGameState] = useState<'menu' | 'playing' | 'gameOver'>('menu');
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(() => {
    const saved = localStorage.getItem('jetpack-high-score');
    return saved ? parseInt(saved, 10) : 0;
  });

  // Game objects
  const engineerRef = useRef<GameObject>({ x: 80, y: 200, width: 40, height: 40 });
  const velocityRef = useRef(0);
  const obstaclesRef = useRef<Obstacle[]>([]);
  const particlesRef = useRef<Array<{ x: number; y: number; vx: number; vy: number; life: number }>>([]);
  const gameSpeedRef = useRef(1.0);
  const frameCountRef = useRef(0);

  const GRAVITY = 0.3;
  const JUMP_FORCE = -7;
  const BASE_OBSTACLE_SPEED = 1.5;
  const OBSTACLE_GAP = 180;  // Increased from 140 to 180
  const CANVAS_WIDTH = 400;
  const CANVAS_HEIGHT = 300;

  // Initialize canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    canvas.width = CANVAS_WIDTH;
    canvas.height = CANVAS_HEIGHT;
  }, []);

  // Game mechanics
  const jump = useCallback(() => {
    if (gameState === 'playing') {
      velocityRef.current = JUMP_FORCE;
      // Add jetpack particles
      for (let i = 0; i < 5; i++) {
        particlesRef.current.push({
          x: engineerRef.current.x + 10,
          y: engineerRef.current.y + 30,
          vx: Math.random() * -3 - 1,
          vy: Math.random() * 2 - 1,
          life: 30
        });
      }
    }
  }, [gameState]);

  const startGame = useCallback(() => {
    engineerRef.current = { x: 80, y: 200, width: 40, height: 40 };
    velocityRef.current = 0;
    obstaclesRef.current = [];
    particlesRef.current = [];
    gameSpeedRef.current = 1.0;
    frameCountRef.current = 0;
    setScore(0);
    setGameState('playing');
  }, []);

  const resetGame = useCallback(() => {
    setGameState('menu');
  }, []);

  // Input handling
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.code === 'Space' || e.code === 'ArrowUp') {
        e.preventDefault();
        jump();
      }
    };

    const handleClick = () => {
      jump();
    };

    window.addEventListener('keydown', handleKeyPress);
    const canvas = canvasRef.current;
    if (canvas) {
      canvas.addEventListener('click', handleClick);
    }

    return () => {
      window.removeEventListener('keydown', handleKeyPress);
      if (canvas) {
        canvas.removeEventListener('click', handleClick);
      }
    };
  }, [jump]);

  // Collision detection
  const checkCollision = (rect1: GameObject, rect2: GameObject): boolean => {
    return rect1.x < rect2.x + rect2.width &&
           rect1.x + rect1.width > rect2.x &&
           rect1.y < rect2.y + rect2.height &&
           rect1.y + rect1.height > rect2.y;
  };

  // Game loop
  useEffect(() => {
    if (gameState !== 'playing') return;

    const gameLoop = () => {
      const canvas = canvasRef.current;
      const ctx = canvas?.getContext('2d');
      if (!canvas || !ctx) return;

      // Clear canvas with gradient
      const gradient = ctx.createLinearGradient(0, 0, 0, CANVAS_HEIGHT);
      gradient.addColorStop(0, '#87CEEB');
      gradient.addColorStop(1, '#98FB98');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

      // Update game speed (gradually increase)
      frameCountRef.current++;
      if (frameCountRef.current % 300 === 0) { // Every 5 seconds at 60fps
        gameSpeedRef.current = Math.min(gameSpeedRef.current + 0.1, 2.5);
      }

      // Update engineer physics
      velocityRef.current += GRAVITY;
      engineerRef.current.y += velocityRef.current;

      // Boundary check
      if (engineerRef.current.y < 0) {
        engineerRef.current.y = 0;
        velocityRef.current = 0;
      }
      if (engineerRef.current.y + engineerRef.current.height > CANVAS_HEIGHT) {
        setGameState('gameOver');
        if (score > highScore) {
          setHighScore(score);
          localStorage.setItem('jetpack-high-score', score.toString());
        }
        return;
      }

      // Spawn obstacles with better spacing
      if (obstaclesRef.current.length === 0 || 
          obstaclesRef.current[obstaclesRef.current.length - 1].x < CANVAS_WIDTH - 300) {
        const gapY = Math.random() * (CANVAS_HEIGHT - OBSTACLE_GAP - 80) + 40;
        const obstacleTypes: Array<'test' | 'blueprint' | 'computer' | 'code' | 'circuit'> = 
          ['test', 'blueprint', 'computer', 'code', 'circuit'];
        const randomType = obstacleTypes[Math.floor(Math.random() * obstacleTypes.length)];
        
        obstaclesRef.current.push({
          x: CANVAS_WIDTH,
          y: 0,
          width: 50,
          height: gapY,
          passed: false,
          type: randomType
        });
        obstaclesRef.current.push({
          x: CANVAS_WIDTH,
          y: gapY + OBSTACLE_GAP,
          width: 50,
          height: CANVAS_HEIGHT - (gapY + OBSTACLE_GAP),
          passed: false,
          type: randomType
        });
      }

      // Update obstacles with variable speed
      const currentSpeed = BASE_OBSTACLE_SPEED * gameSpeedRef.current;
      obstaclesRef.current = obstaclesRef.current.filter(obstacle => {
        obstacle.x -= currentSpeed;
        
        // Check collision
        if (checkCollision(engineerRef.current, obstacle)) {
          setGameState('gameOver');
          if (score > highScore) {
            setHighScore(score);
            localStorage.setItem('jetpack-high-score', score.toString());
          }
          return true;
        }

        // Score point
        if (!obstacle.passed && obstacle.x + obstacle.width < engineerRef.current.x) {
          obstacle.passed = true;
          setScore(prev => prev + 1);
        }

        return obstacle.x + obstacle.width > 0;
      });

      // Update particles
      particlesRef.current = particlesRef.current.filter(particle => {
        particle.x += particle.vx;
        particle.y += particle.vy;
        particle.life--;
        return particle.life > 0;
      });

      // Draw background elements
      ctx.fillStyle = '#FFFFFF';
      for (let i = 0; i < 5; i++) {
        ctx.beginPath();
        ctx.arc(50 + i * 80, 50 + Math.sin(Date.now() * 0.001 + i) * 10, 15, 0, Math.PI * 2);
        ctx.fill();
      }

      // Draw engineering-themed obstacles
      obstaclesRef.current.forEach(obstacle => {
        const drawEngineringObstacle = (x: number, y: number, width: number, height: number, type: string) => {
          switch(type) {
            case 'test':
              // Test paper with lines and "F" grade
              ctx.fillStyle = '#FFFFFF';
              ctx.fillRect(x, y, width, height);
              ctx.strokeStyle = '#000000';
              ctx.lineWidth = 1;
              ctx.strokeRect(x, y, width, height);
              
              // Draw lines on paper
              ctx.strokeStyle = '#CCCCCC';
              for (let i = y + 10; i < y + height - 10; i += 8) {
                ctx.beginPath();
                ctx.moveTo(x + 5, i);
                ctx.lineTo(x + width - 5, i);
                ctx.stroke();
              }
              
              // Draw "F" grade in red
              ctx.fillStyle = '#FF0000';
              ctx.font = 'bold 20px Arial';
              ctx.fillText('F', x + width/2 - 6, y + height/2 + 6);
              break;
              
            case 'blueprint':
              // Engineering blueprint
              ctx.fillStyle = '#0066CC';
              ctx.fillRect(x, y, width, height);
              ctx.strokeStyle = '#FFFFFF';
              ctx.lineWidth = 1;
              
              // Draw grid pattern
              for (let i = x; i < x + width; i += 10) {
                ctx.beginPath();
                ctx.moveTo(i, y);
                ctx.lineTo(i, y + height);
                ctx.stroke();
              }
              for (let i = y; i < y + height; i += 10) {
                ctx.beginPath();
                ctx.moveTo(x, i);
                ctx.lineTo(x + width, i);
                ctx.stroke();
              }
              
              // Draw circuit symbols
              ctx.strokeStyle = '#FFFFFF';
              ctx.lineWidth = 2;
              ctx.strokeRect(x + 10, y + height/2 - 5, 15, 10);
              ctx.strokeRect(x + 25, y + height/2 - 5, 15, 10);
              break;
              
            case 'computer':
              // Computer screen
              ctx.fillStyle = '#2F2F2F';
              ctx.fillRect(x, y, width, height);
              ctx.strokeStyle = '#000000';
              ctx.lineWidth = 2;
              ctx.strokeRect(x, y, width, height);
              
              // Screen glow
              ctx.fillStyle = '#00FF00';
              ctx.fillRect(x + 5, y + 5, width - 10, height - 10);
              
              // Terminal text
              ctx.fillStyle = '#000000';
              ctx.font = '8px monospace';
              ctx.fillText('>', x + 8, y + 15);
              ctx.fillText('ERROR', x + 8, y + 25);
              break;
              
            case 'code':
              // Code document
              ctx.fillStyle = '#1E1E1E';
              ctx.fillRect(x, y, width, height);
              ctx.strokeStyle = '#555555';
              ctx.lineWidth = 1;
              ctx.strokeRect(x, y, width, height);
              
              // Code syntax highlighting
              ctx.fillStyle = '#569CD6';
              ctx.font = '8px monospace';
              ctx.fillText('if', x + 5, y + 15);
              ctx.fillStyle = '#CE9178';
              ctx.fillText('(bug)', x + 5, y + 25);
              ctx.fillStyle = '#D4D4D4';
              ctx.fillText('{fix}', x + 5, y + 35);
              break;
              
            case 'circuit':
              // Circuit board
              ctx.fillStyle = '#006600';
              ctx.fillRect(x, y, width, height);
              
              // Circuit traces
              ctx.strokeStyle = '#CCCCCC';
              ctx.lineWidth = 2;
              for (let i = 0; i < 3; i++) {
                ctx.beginPath();
                ctx.moveTo(x, y + (i + 1) * height/4);
                ctx.lineTo(x + width, y + (i + 1) * height/4);
                ctx.stroke();
              }
              
              // Components
              ctx.fillStyle = '#000000';
              ctx.fillRect(x + 10, y + height/2 - 3, 8, 6);
              ctx.fillRect(x + 25, y + height/2 - 3, 8, 6);
              break;
          }
        };
        
        drawEngineringObstacle(obstacle.x, obstacle.y, obstacle.width, obstacle.height, obstacle.type);
      });

      // Draw particles
      ctx.fillStyle = '#FFA500';
      particlesRef.current.forEach(particle => {
        ctx.globalAlpha = particle.life / 30;
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, 3, 0, Math.PI * 2);
        ctx.fill();
      });
      ctx.globalAlpha = 1;

      // Draw engineer
      const engineer = engineerRef.current;
      
      // Engineer body (blue jumpsuit)
      ctx.fillStyle = '#4169E1';
      ctx.fillRect(engineer.x + 8, engineer.y + 15, 24, 20);
      
      // Jetpack
      ctx.fillStyle = '#2F4F4F';
      ctx.fillRect(engineer.x + 32, engineer.y + 12, 8, 16);
      
      // Head
      ctx.fillStyle = '#FFDBAC';
      ctx.beginPath();
      ctx.arc(engineer.x + 20, engineer.y + 8, 8, 0, Math.PI * 2);
      ctx.fill();
      
      // Helmet
      ctx.fillStyle = '#FFD700';
      ctx.beginPath();
      ctx.arc(engineer.x + 20, engineer.y + 8, 10, Math.PI, 0);
      ctx.fill();
      
      // Eyes
      ctx.fillStyle = '#000';
      ctx.fillRect(engineer.x + 17, engineer.y + 6, 2, 2);
      ctx.fillRect(engineer.x + 21, engineer.y + 6, 2, 2);
      
      // Arms
      ctx.fillStyle = '#FFDBAC';
      ctx.fillRect(engineer.x + 4, engineer.y + 16, 6, 3);
      ctx.fillRect(engineer.x + 30, engineer.y + 16, 6, 3);
      
      // Legs
      ctx.fillStyle = '#4169E1';
      ctx.fillRect(engineer.x + 12, engineer.y + 32, 6, 8);
      ctx.fillRect(engineer.x + 22, engineer.y + 32, 6, 8);

      gameLoopRef.current = requestAnimationFrame(gameLoop);
    };

    gameLoopRef.current = requestAnimationFrame(gameLoop);

    return () => {
      if (gameLoopRef.current) {
        cancelAnimationFrame(gameLoopRef.current);
      }
    };
  }, [gameState, score, highScore]);

  return (
    <div className="relative">
      <canvas
        ref={canvasRef}
        className="border-2 border-primary/20 rounded-lg shadow-lg bg-gradient-to-b from-blue-200 to-green-200 cursor-pointer touch-none"
        style={{ 
          width: '100%', 
          maxWidth: '400px', 
          height: 'auto',
          aspectRatio: `${CANVAS_WIDTH}/${CANVAS_HEIGHT}`,
          touchAction: 'none'
        }}
        onTouchStart={(e) => {
          e.preventDefault();
          jump();
        }}
      />
      
      {/* Game UI Overlay */}
      {gameState !== 'playing' && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/50 rounded-lg">
          <div className="text-center bg-background/95 backdrop-blur-sm p-6 rounded-xl border border-primary/20 shadow-xl">
            {gameState === 'menu' ? (
              <>
                <h3 className="text-xl font-bold mb-2 text-primary">Jetpack Engineer</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Tap or press Space to fly!
                </p>
                <button
                  onClick={startGame}
                  className="inline-flex items-center px-4 py-2 bg-primary text-primary-foreground rounded-lg shadow hover:shadow-lg transition-all duration-300 hover:scale-105"
                >
                  <Play className="w-4 h-4 mr-2" />
                  Start Game
                </button>
              </>
            ) : (
              <>
                <h3 className="text-xl font-bold mb-2 text-destructive">Game Over!</h3>
                <div className="space-y-2 mb-4">
                  <p className="text-sm">Score: <span className="font-bold text-primary">{score}</span></p>
                  <p className="text-sm flex items-center justify-center">
                    <Trophy className="w-4 h-4 mr-1 text-yellow-500" />
                    Best: <span className="font-bold text-yellow-600 ml-1">{highScore}</span>
                  </p>
                </div>
                <button
                  onClick={resetGame}
                  className="inline-flex items-center px-4 py-2 bg-primary text-primary-foreground rounded-lg shadow hover:shadow-lg transition-all duration-300 hover:scale-105"
                >
                  <RotateCcw className="w-4 h-4 mr-2" />
                  Play Again
                </button>
              </>
            )}
          </div>
        </div>
      )}
      
      {/* Score display during gameplay */}
      {gameState === 'playing' && (
        <div className="absolute top-4 left-4 bg-background/90 backdrop-blur-sm px-3 py-1 rounded-lg border border-primary/20 shadow">
          <span className="text-sm font-bold text-primary">Score: {score}</span>
          <div className="text-xs text-muted-foreground mt-1">
            Speed: {gameSpeedRef.current.toFixed(1)}x
          </div>
        </div>
      )}
    </div>
  );
};

export default JetpackGame;