import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';

export default function Project4() {
  const canvasRef = useRef(null);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);
  const gameRef = useRef({
    dino: { x: 50, y: 0, radius: 15, isJumping: false, velocity: 0 },
    cacti: [],
    speed: 5,
    gravity: 0.4,
    jumpForce: -10,
    groundHeight: 20,
    animationId: null
  });

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const game = gameRef.current;

    // Initialize game
    const initGame = () => {
      game.dino = { 
        x: 50, 
        y: canvas.height - game.groundHeight - 15, 
        radius: 15, 
        isJumping: false, 
        velocity: 0 
      };
      game.cacti = [];
      game.speed = 5;
      setScore(0);
      setGameOver(false);
    };

    // Draw game elements
    const drawDino = () => {
      ctx.fillStyle = '#333';
      ctx.beginPath();
      ctx.arc(game.dino.x, game.dino.y, game.dino.radius, 0, Math.PI * 2);
      ctx.fill();
    };

    const drawCacti = () => {
      ctx.fillStyle = '#2ECC71';
      game.cacti.forEach(cactus => {
        ctx.fillRect(cactus.x, cactus.y, cactus.width, cactus.height);
      });
    };

    const drawGround = () => {
      ctx.fillStyle = '#666';
      ctx.fillRect(0, canvas.height - game.groundHeight, canvas.width, game.groundHeight);
    };

    // Game logic
    const updateDino = () => {
      if (game.dino.isJumping) {
        game.dino.y += game.dino.velocity;
        game.dino.velocity += game.gravity;
        
        // Check if landed
        if (game.dino.y >= canvas.height - game.groundHeight - game.dino.radius) {
          game.dino.y = canvas.height - game.groundHeight - game.dino.radius;
          game.dino.isJumping = false;
          game.dino.velocity = 0;
        }
      }
    };

    const updateCacti = () => {
      // Add new cactus randomly
      if (Math.random() < 0.01 && game.cacti.length < 3) {
        const height = 30 + Math.random() * 20;
        game.cacti.push({
          x: canvas.width,
          y: canvas.height - game.groundHeight - height,
          width: 15,
          height: height
        });
      }
      
      // Move cacti
      game.cacti.forEach(cactus => {
        cactus.x -= game.speed;
      });
      
      // Remove off-screen cacti
      game.cacti = game.cacti.filter(cactus => cactus.x + cactus.width > 0);
      
      // Increase score
      setScore(prev => prev + 1);
    };

    const checkCollisions = () => {
      const dino = game.dino;
      
      for (const cactus of game.cacti) {
        if (
          dino.x + dino.radius > cactus.x &&
          dino.x - dino.radius < cactus.x + cactus.width &&
          dino.y + dino.radius > cactus.y
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
      ctx.font = '30px Arial';
      ctx.textAlign = 'center';
      ctx.fillText('Game Over', canvas.width / 2, canvas.height / 2 - 20);
      
      ctx.fillStyle = '#FFFFFF';
      ctx.font = '20px Arial';
      ctx.fillText(`Score: ${score}`, canvas.width / 2, canvas.height / 2 + 20);
      
      ctx.fillStyle = '#4FC3F7';
      ctx.font = '16px Arial';
      ctx.fillText('Press Space to Play Again', canvas.width / 2, canvas.height / 2 + 60);
    };

    const drawStartScreen = () => {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      ctx.fillStyle = '#4FC3F7';
      ctx.font = '30px Arial';
      ctx.textAlign = 'center';
      ctx.fillText('Ball Runner', canvas.width / 2, canvas.height / 2 - 30);
      
      ctx.fillStyle = '#FFFFFF';
      ctx.font = '16px Arial';
      ctx.fillText('Press Space to Jump', canvas.width / 2, canvas.height / 2 + 20);
    };

    const gameLoop = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      if (!gameStarted) {
        drawStartScreen();
        game.animationId = requestAnimationFrame(gameLoop);
        return;
      }

      drawGround();
      drawDino();
      drawCacti();
      
      updateDino();
      updateCacti();

      if (checkCollisions()) {
        setGameOver(true);
        cancelAnimationFrame(game.animationId);
        drawGameOver();
        return;
      }

      game.animationId = requestAnimationFrame(gameLoop);
    };

    // Keyboard event handler
    const handleKeyDown = (e) => {
      if (e.code === 'Space') {
        if (!gameStarted) {
          initGame();
          setGameStarted(true);
          game.animationId = requestAnimationFrame(gameLoop);
        } else if (gameOver) {
          initGame();
          setGameStarted(true);
          game.animationId = requestAnimationFrame(gameLoop);
        } else if (!game.dino.isJumping) {
          game.dino.isJumping = true;
          game.dino.velocity = game.jumpForce;
        }
      }
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
      <h1 style={styles.title}>T-Rex Runner</h1>
      
      <div style={styles.gameContainer}>
        <canvas
          ref={canvasRef}
          width={600}
          height={150}
          style={styles.canvas}
        />
      </div>
      
      <div style={styles.instructions}>
        {!gameStarted && <p>Press SPACE to start</p>}
        {gameStarted && !gameOver && <p>Press SPACE to jump</p>}
      </div>
      
      <Link to="/projects" style={styles.backButton}>← Back to Projects</Link>
    </div>
  );
}

// CSS styles
const styles = {
  container: {
    minHeight: '100vh',
    backgroundColor: '#121212',
    color: '#FFFFFF',
    padding: '2rem',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    fontFamily: 'Arial, sans-serif',
  },
  title: {
    fontSize: '2rem',
    marginBottom: '1rem',
    color: '#4FC3F7',
  },
  gameContainer: {
    border: '3px solid #4FC3F7',
    borderRadius: '5px',
    margin: '1rem 0',
  },
  canvas: {
    backgroundColor: '#f7f7f7',
  },
  instructions: {
    margin: '1rem 0',
    color: '#E0E0E0',
    fontSize: '1rem',
  },
  backButton: {
    padding: '10px 20px',
    backgroundColor: 'transparent',
    color: '#4FC3F7',
    textDecoration: 'none',
    borderRadius: '5px',
    border: '2px solid #4FC3F7',
    fontSize: '1rem',
    marginTop: '1rem',
    ':hover': {
      backgroundColor: '#4FC3F7',
      color: '#121212',
    },
  },
};