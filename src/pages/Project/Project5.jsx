import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';

export default function Project5() {
  const canvasRef = useRef(null);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);
  const gameRef = useRef({
    player: { x: 0, y: 0, width: 60, height: 20 },
    bullets: [],
    enemies: [],
    enemySpeed: 2,
    bulletSpeed: 5,
    lastEnemyTime: 0,
    enemyInterval: 1000,
    animationId: null
  });

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const game = gameRef.current;

    // Initialize game
    const initGame = () => {
      game.player = { 
        x: canvas.width / 2 - 30, 
        y: canvas.height - 30, 
        width: 60, 
        height: 20 
      };
      game.bullets = [];
      game.enemies = [];
      game.enemySpeed = 2;
      game.enemyInterval = 1000;
      setScore(0);
      setGameOver(false);
    };

    // Draw game elements
    const drawPlayer = () => {
      ctx.fillStyle = '#4FC3F7';
      ctx.fillRect(game.player.x, game.player.y, game.player.width, game.player.height);
    };

    const drawBullets = () => {
      ctx.fillStyle = '#FFD700';
      game.bullets.forEach(bullet => {
        ctx.beginPath();
        ctx.arc(bullet.x, bullet.y, bullet.radius, 0, Math.PI * 2);
        ctx.fill();
      });
    };

    const drawEnemies = () => {
      ctx.fillStyle = '#FF5252';
      game.enemies.forEach(enemy => {
        ctx.fillRect(enemy.x, enemy.y, enemy.width, enemy.height);
      });
    };

    // Game logic
    const updatePlayer = () => {
      if (game.keys.left && game.player.x > 0) {
        game.player.x -= 5;
      }
      if (game.keys.right && game.player.x + game.player.width < canvas.width) {
        game.player.x += 5;
      }
    };

    const updateBullets = () => {
      for (let i = game.bullets.length - 1; i >= 0; i--) {
        game.bullets[i].y -= game.bulletSpeed;
        
        // Remove bullets that go off screen
        if (game.bullets[i].y < 0) {
          game.bullets.splice(i, 1);
        }
      }
    };

    const updateEnemies = () => {
      const now = Date.now();
      
      // Add new enemies
      if (now - game.lastEnemyTime > game.enemyInterval) {
        game.enemies.push({
          x: Math.random() * (canvas.width - 30),
          y: 0,
          width: 30,
          height: 30
        });
        game.lastEnemyTime = now;
      }
      
      // Move enemies and check collisions
      for (let i = game.enemies.length - 1; i >= 0; i--) {
        game.enemies[i].y += game.enemySpeed;
        
        // Check if enemy reached bottom
        if (game.enemies[i].y + game.enemies[i].height > canvas.height) {
          setGameOver(true);
          cancelAnimationFrame(game.animationId);
          return;
        }
        
        // Check bullet-enemy collisions
        for (let j = game.bullets.length - 1; j >= 0; j--) {
          if (
            game.bullets[j].x > game.enemies[i].x &&
            game.bullets[j].x < game.enemies[i].x + game.enemies[i].width &&
            game.bullets[j].y > game.enemies[i].y &&
            game.bullets[j].y < game.enemies[i].y + game.enemies[i].height
          ) {
            game.enemies.splice(i, 1);
            game.bullets.splice(j, 1);
            setScore(prev => prev + 1);
            break;
          }
        }
      }
    };

    const fireBullet = () => {
      game.bullets.push({
        x: game.player.x + game.player.width / 2,
        y: game.player.y,
        radius: 5
      });
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
      ctx.fillText('Space Shooter', canvas.width / 2, canvas.height / 2 - 30);
      
      ctx.fillStyle = '#FFFFFF';
      ctx.font = '16px Arial';
      ctx.fillText('Use ← → to move, SPACE to shoot', canvas.width / 2, canvas.height / 2 + 20);
    };

    const gameLoop = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      if (!gameStarted) {
        drawStartScreen();
        game.animationId = requestAnimationFrame(gameLoop);
        return;
      }

      drawPlayer();
      drawBullets();
      drawEnemies();
      
      updatePlayer();
      updateBullets();
      updateEnemies();

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
      if (e.code === 'Space') {
        if (!gameStarted) {
          initGame();
          setGameStarted(true);
          game.animationId = requestAnimationFrame(gameLoop);
        } else if (gameOver) {
          initGame();
          setGameStarted(true);
          game.animationId = requestAnimationFrame(gameLoop);
        } else {
          fireBullet();
        }
      }
    };

    const handleKeyUp = (e) => {
      if (e.key === 'ArrowLeft') game.keys.left = false;
      if (e.key === 'ArrowRight') game.keys.right = false;
    };

    // Initialize game
    game.keys = { left: false, right: false };
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
      <h1 style={styles.title}>Space Shooter</h1>
      
      <div style={styles.gameContainer}>
        <canvas
          ref={canvasRef}
          width={400}
          height={500}
          style={styles.canvas}
        />
      </div>
      
      <div style={styles.instructions}>
        {!gameStarted && <p>Press SPACE to start</p>}
        {gameStarted && !gameOver && <p>Score: {score}</p>}
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
    backgroundColor: '#000033',
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