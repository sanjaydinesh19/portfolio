import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';

export default function Project2() {
  const canvasRef = useRef(null);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);
  const gameRef = useRef({
    ball: { x: 0, y: 0, radius: 10, dx: 0, dy: 0 },
    paddle: { x: 0, width: 100, height: 15 },
    keys: { left: false, right: false },
    speed: 4,
    animationId: null
  });

  // Game constants
  const BALL_SPEED = 3;
  const PADDLE_SPEED = 8;

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const game = gameRef.current;

    // Initialize game
    const initGame = () => {
      // Center the ball
      game.ball.x = canvas.width / 2;
      game.ball.y = canvas.height / 2;
      
      // Random initial direction
      const angle = Math.random() * Math.PI / 2 + Math.PI / 4; // 45-135 degrees
      game.ball.dx = BALL_SPEED * Math.cos(angle) * (Math.random() > 0.5 ? 1 : -1);
      game.ball.dy = BALL_SPEED * Math.sin(angle);
      
      // Center the paddle
      game.paddle.x = (canvas.width - game.paddle.width) / 2;
      game.paddle.y = canvas.height - game.paddle.height - 10;
    };

    // Draw game elements
    const drawBall = () => {
      ctx.fillStyle = '#FFD700';
      ctx.beginPath();
      ctx.arc(game.ball.x, game.ball.y, game.ball.radius, 0, Math.PI * 2);
      ctx.fill();
    };

    const drawPaddle = () => {
      ctx.fillStyle = '#4FC3F7';
      ctx.fillRect(
        game.paddle.x, 
        game.paddle.y, 
        game.paddle.width, 
        game.paddle.height
      );
    };

    // Game logic
    const updateBall = () => {
      game.ball.x += game.ball.dx;
      game.ball.y += game.ball.dy;

      // Wall collision (left/right)
      if (game.ball.x - game.ball.radius < 0 || game.ball.x + game.ball.radius > canvas.width) {
        game.ball.dx = -game.ball.dx;
      }

      // Top collision
      if (game.ball.y - game.ball.radius < 0) {
        game.ball.dy = -game.ball.dy;
      }

      // Paddle collision
      if (
        game.ball.y + game.ball.radius > game.paddle.y &&
        game.ball.x > game.paddle.x &&
        game.ball.x < game.paddle.x + game.paddle.width
      ) {
        // Calculate bounce angle based on where ball hits paddle
        const hitPosition = (game.ball.x - (game.paddle.x + game.paddle.width / 2)) / (game.paddle.width / 2);
        const angle = hitPosition * Math.PI / 3; // Max 60 degrees
        
        game.ball.dx = BALL_SPEED * Math.sin(angle);
        game.ball.dy = -BALL_SPEED * Math.cos(angle);
        
        setScore(prev => prev + 1);
      }

      // Bottom collision (game over)
      if (game.ball.y + game.ball.radius > canvas.height) {
        setGameOver(true);
        cancelAnimationFrame(game.animationId);
      }
    };

    const updatePaddle = () => {
      if (game.keys.left && game.paddle.x > 0) {
        game.paddle.x -= PADDLE_SPEED;
      }
      if (game.keys.right && game.paddle.x + game.paddle.width < canvas.width) {
        game.paddle.x += PADDLE_SPEED;
      }
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
      ctx.fillText('Single Player Pong', canvas.width / 2, canvas.height / 2 - 60);
      
      ctx.fillStyle = '#FFFFFF';
      ctx.font = '20px Arial';
      ctx.fillText('Use ← → arrows to move paddle', canvas.width / 2, canvas.height / 2);
      
      ctx.fillStyle = '#FFD700';
      ctx.font = '24px Arial';
      ctx.fillText('Press Space to Start', canvas.width / 2, canvas.height / 2 + 60);
    };

    const gameLoop = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      if (!gameStarted) {
        drawStartScreen();
        game.animationId = requestAnimationFrame(gameLoop);
        return;
      }

      updateBall();
      updatePaddle();
      drawBall();
      drawPaddle();

      if (gameOver) {
        drawGameOver();
        return;
      }

      game.animationId = requestAnimationFrame(gameLoop);
    };

    // Keyboard event handlers
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowLeft') game.keys.left = true;
      if (e.key === 'ArrowRight') game.keys.right = true;
      if (e.code === 'Space' && (gameOver || !gameStarted)) {
        initGame();
        setScore(0);
        setGameOver(false);
        setGameStarted(true);
        game.animationId = requestAnimationFrame(gameLoop);
      }
    };

    const handleKeyUp = (e) => {
      if (e.key === 'ArrowLeft') game.keys.left = false;
      if (e.key === 'ArrowRight') game.keys.right = false;
    };

    // Initialize game
    initGame();
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    game.animationId = requestAnimationFrame(gameLoop);

    // Cleanup
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
      cancelAnimationFrame(game.animationId);
    };
  }, [gameOver, gameStarted]);

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Single Player Pong</h1>
      
      <div style={styles.gameContainer}>
        <canvas
          ref={canvasRef}
          width={600}
          height={400}
          style={styles.canvas}
        />
        
        <div style={styles.scoreContainer}>
          <span style={styles.scoreLabel}>Score:</span>
          <span style={styles.scoreValue}>{score}</span>
        </div>
      </div>
      
      <div style={styles.instructions}>
        {!gameStarted && <p>Press SPACE to start</p>}
        {gameStarted && !gameOver && <p>Use ← → arrow keys to move paddle</p>}
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
    backgroundColor: '#000033',
    boxShadow: '0 0 20px rgba(79, 195, 247, 0.2)',
  },
  scoreContainer: {
    position: 'absolute',
    top: '20px',
    right: '20px',
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
    ':hover': {
      backgroundColor: '#4FC3F7',
      color: '#121212',
    },
  },
};