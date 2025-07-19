import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Home, RotateCcw, Pause, Play, Wifi, Shield, Zap, Activity } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const GAME_WIDTH = 800;
const GAME_HEIGHT = 400;
const PLAYER_SIZE = 30;
const OBSTACLE_WIDTH = 40;
const POWERUP_SIZE = 25;

type Position = { x: number; y: number };
type Obstacle = { x: number; y: number; width: number; height: number; type: 'congestion' | 'firewall' | 'throttle' };
type PowerUp = { x: number; y: number; type: 'edge' | 'bandwidth' | 'shield' };
type BackgroundApp = { name: string; bandwidth: number; active: boolean };

const NetworkRunnerGame: React.FC = () => {
  const [playerY, setPlayerY] = useState(GAME_HEIGHT / 2);
  const [gameSpeed, setGameSpeed] = useState(2);
  const [obstacles, setObstacles] = useState<Obstacle[]>([]);
  const [powerUps, setPowerUps] = useState<PowerUp[]>([]);
  const [lagMeter, setLagMeter] = useState(0);
  const [score, setScore] = useState(0);
  const [distance, setDistance] = useState(0);
  const [gameRunning, setGameRunning] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [highScore, setHighScore] = useState(() => {
    return parseInt(localStorage.getItem('networkRunnerHighScore') || '0');
  });
  const [shieldActive, setShieldActive] = useState(false);
  const [shieldTime, setShieldTime] = useState(0);
  const [backgroundApps, setBackgroundApps] = useState<BackgroundApp[]>([
    { name: 'Video Stream', bandwidth: 15, active: false },
    { name: 'File Download', bandwidth: 25, active: false },
    { name: 'OS Update', bandwidth: 20, active: false },
    { name: 'Cloud Sync', bandwidth: 10, active: false }
  ]);
  const [currentLatency, setCurrentLatency] = useState(12);
  const [throughput, setThroughput] = useState(95);
  
  const gameLoopRef = useRef<NodeJS.Timeout>();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const navigate = useNavigate();
  const { toast } = useToast();

  // Generate obstacles
  const generateObstacle = useCallback((): Obstacle => {
    const types: ('congestion' | 'firewall' | 'throttle')[] = ['congestion', 'firewall', 'throttle'];
    const type = types[Math.floor(Math.random() * types.length)];
    const height = type === 'firewall' ? 120 : 60 + Math.random() * 80;
    
    return {
      x: GAME_WIDTH,
      y: Math.random() * (GAME_HEIGHT - height),
      width: OBSTACLE_WIDTH,
      height,
      type
    };
  }, []);

  // Generate power-ups
  const generatePowerUp = useCallback((): PowerUp => {
    const types: ('edge' | 'bandwidth' | 'shield')[] = ['edge', 'bandwidth', 'shield'];
    const type = types[Math.floor(Math.random() * types.length)];
    
    return {
      x: GAME_WIDTH,
      y: Math.random() * (GAME_HEIGHT - POWERUP_SIZE),
      type
    };
  }, []);

  // Game update loop
  const updateGame = useCallback(() => {
    if (!gameRunning || isPaused || gameOver) return;

    // Move obstacles and power-ups
    setObstacles(prev => prev.map(obs => ({ ...obs, x: obs.x - gameSpeed })).filter(obs => obs.x > -OBSTACLE_WIDTH));
    setPowerUps(prev => prev.map(pu => ({ ...pu, x: pu.x - gameSpeed })).filter(pu => pu.x > -POWERUP_SIZE));

    // Add new obstacles (less frequently)
    if (Math.random() < 0.008) {
      setObstacles(prev => [...prev, generateObstacle()]);
    }

    // Add new power-ups (less frequently)
    if (Math.random() < 0.004) {
      setPowerUps(prev => [...prev, generatePowerUp()]);
    }

    // Update distance and score
    setDistance(prev => prev + gameSpeed);
    setScore(prev => prev + 1);

    // Increase game speed over time (slower progression)
    setGameSpeed(prev => Math.min(prev + 0.001, 4));

    // Update background apps randomly (less frequently)
    if (Math.random() < 0.01) {
      setBackgroundApps(prev => 
        prev.map(app => ({
          ...app,
          active: Math.random() < 0.2
        }))
      );
    }

    // Calculate lag from background apps (reduced impact)
    const activeBandwidth = backgroundApps.filter(app => app.active).reduce((sum, app) => sum + app.bandwidth, 0);
    const baseLagIncrease = 0.1; // Much slower base increase
    const bandwidthLagIncrease = activeBandwidth * 0.02; // Reduced bandwidth impact
    const randomLagIncrease = Math.random() * 0.3; // Reduced random spikes
    const totalLagIncrease = baseLagIncrease + bandwidthLagIncrease + randomLagIncrease;
    
    // Increase lag meter (much slower)
    if (!shieldActive) {
      setLagMeter(prev => {
        const newLag = Math.min(prev + totalLagIncrease, 100);
        if (newLag >= 100) {
          setGameOver(true);
          setGameRunning(false);
          // Delay toast to avoid render-phase setState
          setTimeout(() => {
            toast({
              title: "Connection Timeout! 📡",
              description: `Packet lost! Distance: ${Math.floor(distance/10)}m`,
              variant: "destructive"
            });
          }, 0);
          setTimeout(() => navigate('/'), 3000);
        }
        return newLag;
      });
    }

    // Update shield timer
    if (shieldActive) {
      setShieldTime(prev => {
        if (prev <= 0) {
          setShieldActive(false);
          return 0;
        }
        return prev - 1;
      });
    }

    // Update network stats
    setCurrentLatency(12 + Math.random() * 8 + (lagMeter * 0.3));
    setThroughput(Math.max(30, 100 - (lagMeter * 0.7) - (activeBandwidth * 0.5)));
  }, [gameRunning, isPaused, gameOver, gameSpeed, distance, backgroundApps, shieldActive, lagMeter, navigate, toast, generateObstacle, generatePowerUp]);

  // Game loop
  useEffect(() => {
    if (gameRunning && !isPaused && !gameOver) {
      gameLoopRef.current = setInterval(updateGame, 100); // Slower game loop for better performance
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
  }, [updateGame, gameRunning, isPaused, gameOver]);

  // Handle keyboard input and touch controls
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (!gameRunning || gameOver) return;

      switch (e.key) {
        case 'ArrowUp':
          e.preventDefault();
          setPlayerY(prev => Math.max(0, prev - 30));
          break;
        case 'ArrowDown':
          e.preventDefault();
          setPlayerY(prev => Math.min(GAME_HEIGHT - PLAYER_SIZE, prev + 30));
          break;
        case ' ':
          e.preventDefault();
          setIsPaused(prev => !prev);
          break;
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [gameRunning, gameOver]);

  // Collision detection with ref to avoid render-phase setState
  const collisionCheckRef = useRef<NodeJS.Timeout>();
  
  useEffect(() => {
    if (!gameRunning || gameOver || shieldActive) {
      if (collisionCheckRef.current) {
        clearInterval(collisionCheckRef.current);
      }
      return;
    }

    // Run collision detection separately from render
    collisionCheckRef.current = setInterval(() => {
      if (!gameRunning || gameOver || shieldActive) return;

      const playerRect = { x: 50, y: playerY, width: PLAYER_SIZE, height: PLAYER_SIZE };

      // Check obstacle collisions
      setObstacles(prev => {
        let collisionDetected = false;
        const newObstacles = prev.filter(obstacle => {
          const collision = (
            playerRect.x < obstacle.x + obstacle.width &&
            playerRect.x + playerRect.width > obstacle.x &&
            playerRect.y < obstacle.y + obstacle.height &&
            playerRect.y + playerRect.height > obstacle.y
          );
          
          if (collision && !collisionDetected) {
            collisionDetected = true;
            setLagMeter(current => Math.min(current + 15, 100)); // Reduced impact
            setTimeout(() => {
              toast({
                title: "Network Congestion! 🚧",
                description: "+15 latency spike",
                variant: "destructive"
              });
            }, 0);
            return false; // Remove this obstacle
          }
          return true;
        });
        return newObstacles;
      });

      // Check power-up collisions
      setPowerUps(prev => {
        let powerUpCollected = false;
        const newPowerUps = prev.filter(powerUp => {
          const collision = (
            playerRect.x < powerUp.x + POWERUP_SIZE &&
            playerRect.x + playerRect.width > powerUp.x &&
            playerRect.y < powerUp.y + POWERUP_SIZE &&
            playerRect.y + playerRect.height > powerUp.y
          );
          
          if (collision && !powerUpCollected) {
            powerUpCollected = true;
            
            switch (powerUp.type) {
              case 'edge':
                setScore(current => current + 50);
                setGameSpeed(current => Math.min(current + 0.5, 4));
                setTimeout(() => {
                  toast({ 
                    title: "Edge Node Boost! ⚡", 
                    description: "+50 points & speed boost!" 
                  });
                }, 0);
                break;
              case 'bandwidth':
                setLagMeter(current => Math.max(0, current - 25));
                setTimeout(() => {
                  toast({ 
                    title: "Bandwidth Pack! 📊", 
                    description: "-25 latency" 
                  });
                }, 0);
                break;
              case 'shield':
                setShieldActive(true);
                setShieldTime(250); // 5 seconds at 50fps
                setTimeout(() => {
                  toast({ 
                    title: "Latency Shield! 🛡️", 
                    description: "5 seconds immunity!" 
                  });
                }, 0);
                break;
            }
            return false; // Remove this power-up
          }
          return true;
        });
        return newPowerUps;
      });
    }, 100); // Check collisions every 100ms

    return () => {
      if (collisionCheckRef.current) {
        clearInterval(collisionCheckRef.current);
      }
    };
  }, [gameRunning, gameOver, shieldActive, playerY, toast]);

  const startGame = () => {
    setPlayerY(GAME_HEIGHT / 2);
    setGameSpeed(2);
    setObstacles([]);
    setPowerUps([]);
    setLagMeter(0);
    setScore(0);
    setDistance(0);
    setGameRunning(true);
    setGameOver(false);
    setIsPaused(false);
    setShieldActive(false);
    setShieldTime(0);
    setCurrentLatency(12);
    setThroughput(95);
    setBackgroundApps(prev => prev.map(app => ({ ...app, active: false })));
  };

  const pauseGame = () => {
    setIsPaused(prev => !prev);
  };

  const resetGame = () => {
    setPlayerY(GAME_HEIGHT / 2);
    setGameSpeed(2);
    setObstacles([]);
    setPowerUps([]);
    setLagMeter(0);
    setScore(0);
    setDistance(0);
    setGameRunning(false);
    setGameOver(false);
    setIsPaused(false);
    setShieldActive(false);
    setShieldTime(0);
  };

  const goHome = () => {
    navigate('/');
  };

  const movePlayer = (direction: 'up' | 'down') => {
    if (!gameRunning || gameOver) return;
    
    if (direction === 'up') {
      setPlayerY(prev => Math.max(0, prev - 40));
    } else {
      setPlayerY(prev => Math.min(GAME_HEIGHT - PLAYER_SIZE, prev + 40));
    }
  };

  const toggleApp = (index: number) => {
    setBackgroundApps(prev => 
      prev.map((app, i) => i === index ? { ...app, active: !app.active } : app)
    );
  };

  // Update high score
  useEffect(() => {
    if (score > highScore) {
      setHighScore(score);
      localStorage.setItem('networkRunnerHighScore', score.toString());
    }
  }, [score, highScore]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500/5 via-background to-cyan-500/5 p-2 md:p-4">
      <div className="container mx-auto max-w-7xl">
        <div className="flex items-center justify-between mb-4 md:mb-6">
          <h1 className="text-2xl md:text-4xl font-bold bg-gradient-to-r from-blue-500 to-cyan-600 bg-clip-text text-transparent">
            Network Packet Runner 📡
          </h1>
          <Button variant="outline" onClick={goHome} className="gap-2">
            <Home className="w-4 h-4" />
            Home
          </Button>
        </div>

        <div className="grid lg:grid-cols-4 gap-4 md:gap-6">
          {/* Game Area */}
          <div className="lg:col-span-3">
            <Card className="p-2 md:p-6">
              <div className="relative">
                {/* Game Canvas */}
                <div 
                  className="relative bg-gradient-to-r from-slate-900 via-blue-900 to-slate-900 rounded-lg overflow-hidden mx-auto border-2 border-blue-500/20"
                  style={{ width: '100%', maxWidth: `${GAME_WIDTH}px`, height: `${GAME_HEIGHT}px` }}
                >
                  {/* Background Network Pattern */}
                  <div className="absolute inset-0 opacity-20">
                    <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-blue-500/10 to-transparent animate-pulse"></div>
                    {Array.from({ length: 8 }, (_, i) => (
                      <div 
                        key={i}
                        className="absolute w-full h-0.5 bg-gradient-to-r from-transparent via-cyan-400/30 to-transparent"
                        style={{ top: `${(i + 1) * 12.5}%` }}
                      />
                    ))}
                  </div>

                  {/* Player Packet */}
                  <div
                    className={`absolute transition-all duration-100 ${shieldActive ? 'animate-pulse' : ''}`}
                    style={{
                      left: '50px',
                      top: `${playerY}px`,
                      width: `${PLAYER_SIZE}px`,
                      height: `${PLAYER_SIZE}px`,
                    }}
                  >
                    <div className={`w-full h-full rounded-full bg-gradient-to-br from-green-400 to-emerald-500 shadow-lg flex items-center justify-center text-white font-bold ${shieldActive ? 'ring-4 ring-blue-400/50' : ''}`}>
                      📦
                    </div>
                  </div>

                  {/* Obstacles */}
                  {obstacles.map((obstacle, index) => (
                    <div
                      key={index}
                      className={`absolute ${
                        obstacle.type === 'congestion' 
                          ? 'bg-gradient-to-br from-orange-500 to-red-600' 
                          : obstacle.type === 'firewall'
                          ? 'bg-gradient-to-br from-red-600 to-red-800'
                          : 'bg-gradient-to-br from-yellow-500 to-orange-600'
                      } rounded-md shadow-lg flex items-center justify-center text-white text-xs font-bold`}
                      style={{
                        left: `${obstacle.x}px`,
                        top: `${obstacle.y}px`,
                        width: `${obstacle.width}px`,
                        height: `${obstacle.height}px`,
                      }}
                    >
                      {obstacle.type === 'congestion' ? '🚧' : 
                       obstacle.type === 'firewall' ? '🔥' : '⚠️'}
                    </div>
                  ))}

                  {/* Power-ups */}
                  {powerUps.map((powerUp, index) => (
                    <div
                      key={index}
                      className={`absolute animate-pulse ${
                        powerUp.type === 'edge' 
                          ? 'bg-gradient-to-br from-purple-500 to-violet-600' 
                          : powerUp.type === 'bandwidth'
                          ? 'bg-gradient-to-br from-blue-500 to-cyan-600'
                          : 'bg-gradient-to-br from-yellow-400 to-amber-500'
                      } rounded-full shadow-lg flex items-center justify-center text-white font-bold`}
                      style={{
                        left: `${powerUp.x}px`,
                        top: `${powerUp.y}px`,
                        width: `${POWERUP_SIZE}px`,
                        height: `${POWERUP_SIZE}px`,
                      }}
                    >
                      {powerUp.type === 'edge' ? '⚡' : 
                       powerUp.type === 'bandwidth' ? '📊' : '🛡️'}
                    </div>
                  ))}

                  {/* Lag Meter */}
                  <div className="absolute top-4 right-4 w-48 bg-black/50 rounded-lg p-3">
                    <div className="text-white text-xs mb-2">Latency Buffer</div>
                    <div className="w-full bg-gray-700 rounded-full h-3">
                      <div 
                        className={`h-3 rounded-full transition-all duration-300 ${
                          lagMeter < 30 ? 'bg-green-500' :
                          lagMeter < 70 ? 'bg-yellow-500' : 'bg-red-500'
                        }`}
                        style={{ width: `${lagMeter}%` }}
                      />
                    </div>
                    <div className="text-white text-xs mt-1">{lagMeter.toFixed(0)}% Full</div>
                  </div>

                  {/* Game Over Overlay */}
                  {gameOver && (
                    <div className="absolute inset-0 bg-black/70 backdrop-blur-sm rounded-lg flex items-center justify-center">
                      <div className="text-center text-white">
                        <h2 className="text-2xl md:text-3xl font-bold mb-2">Connection Timeout! 📡</h2>
                        <p className="text-sm md:text-lg mb-4">Returning to home page...</p>
                        <div className="animate-spin w-8 h-8 border-4 border-white border-t-transparent rounded-full mx-auto"></div>
                      </div>
                    </div>
                  )}

                  {/* Pause Overlay */}
                  {isPaused && gameRunning && (
                    <div className="absolute inset-0 bg-black/50 backdrop-blur-sm rounded-lg flex items-center justify-center">
                      <div className="text-center text-white">
                        <h2 className="text-2xl md:text-3xl font-bold mb-2">Game Paused ⏸️</h2>
                        <p className="text-sm md:text-lg">Press Space or Play button to continue</p>
                      </div>
                    </div>
                  )}
                </div>

                {/* Mobile Controls */}
                <div className="flex md:hidden justify-center gap-4 mt-4">
                  <Button
                    variant="outline"
                    size="lg"
                    onTouchStart={() => movePlayer('up')}
                    onClick={() => movePlayer('up')}
                    disabled={!gameRunning || gameOver}
                    className="text-2xl"
                  >
                    ⬆️
                  </Button>
                  <Button
                    variant="outline"
                    size="lg"
                    onTouchStart={() => movePlayer('down')}
                    onClick={() => movePlayer('down')}
                    disabled={!gameRunning || gameOver}
                    className="text-2xl"
                  >
                    ⬇️
                  </Button>
                </div>
              </div>
            </Card>
          </div>

          {/* Game Stats & Controls */}
          <div className="space-y-4">
            <Card className="p-4 md:p-6">
              <h3 className="text-lg md:text-xl font-semibold mb-4">Network Stats</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm">Score:</span>
                  <Badge variant="default" className="bg-blue-500">{score}</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Distance:</span>
                  <Badge variant="outline">{Math.floor(distance/10)}m</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">High Score:</span>
                  <Badge variant="secondary">{highScore}</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Latency:</span>
                  <Badge variant="outline">{currentLatency.toFixed(0)}ms</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Throughput:</span>
                  <Badge variant="outline">{throughput.toFixed(0)}%</Badge>
                </div>
              </div>
            </Card>

            <Card className="p-4 md:p-6">
              <h3 className="text-lg md:text-xl font-semibold mb-4">Controls</h3>
              <div className="space-y-3">
                {!gameRunning ? (
                  <Button onClick={startGame} className="w-full bg-blue-500 hover:bg-blue-600" size="lg">
                    Start Network
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

            <Card className="p-4 md:p-6">
              <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                <Activity className="w-4 h-4" />
                Background Apps
              </h3>
              <div className="space-y-2">
                {backgroundApps.map((app, index) => (
                  <div key={index} className="flex items-center justify-between text-sm">
                    <span className={app.active ? 'text-orange-500' : 'text-muted-foreground'}>
                      {app.name}
                    </span>
                    <div className="flex items-center gap-2">
                      <Badge variant={app.active ? 'destructive' : 'outline'} className="text-xs">
                        {app.bandwidth}MB/s
                      </Badge>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => toggleApp(index)}
                        className="h-6 w-6 p-0"
                      >
                        {app.active ? '🔴' : '⚫'}
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            <Card className="p-4 md:p-6">
              <h3 className="text-lg font-semibold mb-3">Power-ups</h3>
              <div className="space-y-2 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <span>⚡</span>
                  <span>Edge Boost: +50 points</span>
                </div>
                <div className="flex items-center gap-2">
                  <span>📊</span>
                  <span>Bandwidth Pack: -30 latency</span>
                </div>
                <div className="flex items-center gap-2">
                  <span>🛡️</span>
                  <span>Shield: 5s immunity</span>
                </div>
              </div>
            </Card>

            <Card className="p-4 md:p-6">
              <h3 className="text-lg font-semibold mb-3">How to Play</h3>
              <ul className="text-sm space-y-1 text-muted-foreground">
                <li>📦 Navigate your data packet</li>
                <li>🚧 Avoid network congestion</li>
                <li>⚡ Collect power-ups</li>
                <li>⌨️ Use arrow keys or touch controls</li>
                <li>📊 Keep latency buffer below 100%</li>
              </ul>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NetworkRunnerGame;