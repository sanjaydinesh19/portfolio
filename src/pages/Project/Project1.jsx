import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';

export default function Project1() {
  const canvasRef = useRef(null);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);
  const gameRef = useRef({
    bird: { x: 50, y: 200, width: 30, height: 30, velocity: 0, gravity: 0.3, jump: -8 },
    pipes: [],
    lastPipeTime: 0,
    animationId: null
  });

  // Game constants
  const GAP_HEIGHT = 175;
  const PIPE_WIDTH = 30;
  const PIPE_SPEED = 2;
  const PIPE_SPAWN_RATE = 2000; // ms

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const game = gameRef.current;

    // Draw game elements
    const drawBird = () => {
      ctx.fillStyle = '#FFD700';
      ctx.beginPath();
      ctx.arc(
        game.bird.x + game.bird.width / 2,
        game.bird.y + game.bird.height / 2,
        game.bird.width / 2,
        0,
        Math.PI * 2
      );
      ctx.fill();
    };

    const drawPipes = () => {
      ctx.fillStyle = '#2ECC71';
      game.pipes.forEach(pipe => {
        // Top pipe
        ctx.fillRect(pipe.x, 0, PIPE_WIDTH, pipe.topHeight);
        // Bottom pipe
        ctx.fillRect(
          pipe.x,
          pipe.topHeight + GAP_HEIGHT,
          PIPE_WIDTH,
          canvas.height - pipe.topHeight - GAP_HEIGHT
        );
      });
    };

    // Game logic
    const updateBird = () => {
      game.bird.velocity += game.bird.gravity;
      game.bird.y += game.bird.velocity;
    };

    const updatePipes = () => {
      const now = Date.now();
      if (now - game.lastPipeTime > PIPE_SPAWN_RATE) {
        const topHeight = Math.random() * (canvas.height - GAP_HEIGHT - 100) + 50;
        game.pipes.push({ x: canvas.width, topHeight });
        game.lastPipeTime = now;
      }

      game.pipes.forEach(pipe => {
        pipe.x -= PIPE_SPEED;
      });

      // Remove off-screen pipes and increase score
      if (game.pipes.length > 0 && game.pipes[0].x + PIPE_WIDTH < 0) {
        game.pipes.shift();
        setScore(prev => prev + 1);
      }
    };

    const checkCollisions = () => {
      const bird = game.bird;

      // Check floor/ceiling collision
      if (bird.y <= 0 || bird.y + bird.height >= canvas.height) {
        return true;
      }

      // Check pipe collisions
      for (const pipe of game.pipes) {
        if (
          bird.x + bird.width > pipe.x &&
          bird.x < pipe.x + PIPE_WIDTH &&
          (bird.y < pipe.topHeight || bird.y + bird.height > pipe.topHeight + GAP_HEIGHT)
        ) {
          return true;
        }
      }

      return false;
    };

    const drawGameOver = () => {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      ctx.fillStyle = '#FF5252';
      ctx.font = '36px Arial';
      ctx.textAlign = 'center';
      ctx.fillText('Game Over!', canvas.width / 2, canvas.height / 2 - 40);
      
      ctx.fillStyle = '#FFFFFF';
      ctx.font = '24px Arial';
      ctx.fillText(`Score: ${score}`, canvas.width / 2, canvas.height / 2);
      
      ctx.fillStyle = '#4FC3F7';
      ctx.font = '20px Arial';
      ctx.fillText('Press Space to Restart', canvas.width / 2, canvas.height / 2 + 50);
    };

    const drawStartScreen = () => {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      ctx.fillStyle = '#4FC3F7';
      ctx.font = '36px Arial';
      ctx.textAlign = 'center';
      ctx.fillText('Flappy Bird', canvas.width / 2, canvas.height / 2 - 40);
      
      ctx.fillStyle = '#FFFFFF';
      ctx.font = '24px Arial';
      ctx.fillText('Press Space to Start', canvas.width / 2, canvas.height / 2 + 20);
    };

    const gameLoop = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      if (!gameStarted) {
        drawStartScreen();
        game.animationId = requestAnimationFrame(gameLoop);
        return;
      }

      updateBird();
      updatePipes();
      drawBird();
      drawPipes();

      if (checkCollisions()) {
        setGameOver(true);
        cancelAnimationFrame(game.animationId);
        drawGameOver();
        return;
      }

      game.animationId = requestAnimationFrame(gameLoop);
    };

    const handleKeyDown = (e) => {
      if (e.code === 'Space') {
        if (!gameStarted) {
          setGameStarted(true);
          game.animationId = requestAnimationFrame(gameLoop);
        } else if (gameOver) {
          resetGame();
        } else {
          game.bird.velocity = game.bird.jump;
        }
      }
    };

    const resetGame = () => {
      game.bird = { x: 50, y: 200, width: 30, height: 30, velocity: 0, gravity: 0.5, jump: -10 };
      game.pipes = [];
      setScore(0);
      setGameOver(false);
      setGameStarted(true);
      game.animationId = requestAnimationFrame(gameLoop);
    };

    // Initialize game
    window.addEventListener('keydown', handleKeyDown);
    game.animationId = requestAnimationFrame(gameLoop);

    // Cleanup
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      cancelAnimationFrame(game.animationId);
    };
  }, [gameOver, gameStarted]);

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Flappy Bird Project</h1>
      
      <div style={styles.gameContainer}>
        <canvas
          ref={canvasRef}
          width={400}
          height={600}
          style={styles.canvas}
        />
        
        <div style={styles.scoreContainer}>
          <span style={styles.scoreLabel}>Score:</span>
          <span style={styles.scoreValue}>{score}</span>
        </div>
      </div>
      
      <div style={styles.instructions}>
        <p>Press SPACE to {gameStarted ? 'flap' : 'start'}</p>
        {gameOver && <p>Press SPACE to play again</p>}
      </div>
      
      <Link to="/projects" style={styles.backButton}>← Back to Projects</Link>
    </div>
  );
}

// CSS-in-JS styles
const styles = {
  container: {
    minHeight: '100vh',
    backgroundColor: '#121212',
    color: '#FFFFFF',
    padding: '2rem',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    fontFamily: '"Segoe UI", Tahoma, Geneva, Verdana, sans-serif',
  },
  title: {
    fontSize: '2.5rem',
    marginBottom: '1.5rem',
    color: '#4FC3F7',
    textShadow: '0 0 10px rgba(79, 195, 247, 0.3)',
  },
  gameContainer: {
    position: 'relative',
    margin: '2rem 0',
  },
  canvas: {
    border: '4px solid #4FC3F7',
    borderRadius: '8px',
    backgroundColor: '#87CEEB',
    boxShadow: '0 0 20px rgba(79, 195, 247, 0.2)',
  },
  scoreContainer: {
    position: 'absolute',
    top: '20px',
    left: '20px',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    padding: '10px 15px',
    borderRadius: '5px',
    color: '#FFFFFF',
    fontSize: '1.2rem',
    display: 'flex',
    gap: '10px',
  },
  scoreLabel: {
    fontWeight: 'bold',
  },
  scoreValue: {
    color: '#FFD700',
  },
  instructions: {
    margin: '1rem 0',
    color: '#E0E0E0',
    fontSize: '1.1rem',
    textAlign: 'center',
  },
  backButton: {
    display: 'inline-block',
    padding: '12px 24px',
    backgroundColor: 'transparent',
    color: '#4FC3F7',
    textDecoration: 'none',
    borderRadius: '8px',
    border: '2px solid #4FC3F7',
    transition: 'all 0.3s ease',
    fontSize: '1.1rem',
    fontWeight: '600',
    marginTop: '1.5rem',
    cursor: 'pointer',
  },
};