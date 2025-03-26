import React, { useState, useEffect, useRef } from 'react';

const SnakeGame = () => {
    const UNIT = 25;
    const WIDTH = 500;
    const HEIGHT = 500;

    const [snake, setSnake] = useState([
        { x: UNIT * 3, y: 0 },
        { x: UNIT * 2, y: 0 },
        { x: UNIT, y: 0 },
        { x: 0, y: 0 }
    ]);
    const [food, setFood] = useState({ x: 0, y: 0 });
    const [direction, setDirection] = useState({ x: UNIT, y: 0 });
    const [score, setScore] = useState(0);
    const [gameActive, setGameActive] = useState(true);
    const [paused, setPaused] = useState(false);
    const [started, setStarted] = useState(false);
    const [gameOver, setGameOver] = useState(false);
    const gameBoardRef = useRef(null);

    // Initialize game and draw initial state
    useEffect(() => {
        const canvas = gameBoardRef.current;
        const ctx = canvas.getContext('2d');
        
        // Initial setup
        ctx.fillStyle = '#212121';
        ctx.fillRect(0, 0, WIDTH, HEIGHT);
        createFood();
    }, []);

    // Game loop
    useEffect(() => {
        if (!started || paused || !gameActive) return;

        const canvas = gameBoardRef.current;
        const ctx = canvas.getContext('2d');

        const gameLoop = setInterval(() => {
            // Clear canvas
            ctx.fillStyle = '#212121';
            ctx.fillRect(0, 0, WIDTH, HEIGHT);

            // Draw food
            ctx.fillStyle = 'yellow';
            ctx.fillRect(food.x, food.y, UNIT, UNIT);

            // Draw snake
            ctx.fillStyle = 'aqua';
            ctx.strokeStyle = '#212121';
            snake.forEach(segment => {
                ctx.fillRect(segment.x, segment.y, UNIT, UNIT);
                ctx.strokeRect(segment.x, segment.y, UNIT, UNIT);
            });

            // Move snake
            moveSnake();
        }, 200);

        return () => clearInterval(gameLoop);
    }, [snake, started, paused, gameActive, food]);

    // Create food at random position
    const createFood = () => {
        const newFood = {
            x: Math.floor(Math.random() * (WIDTH / UNIT)) * UNIT,
            y: Math.floor(Math.random() * (HEIGHT / UNIT)) * UNIT
        };
        
        // Make sure food doesn't appear on snake
        const isOnSnake = snake.some(segment => 
            segment.x === newFood.x && segment.y === newFood.y
        );
        
        if (isOnSnake) {
            createFood(); // Try again
        } else {
            setFood(newFood);
        }
    };

    // Move snake in current direction
    const moveSnake = () => {
        setSnake(prevSnake => {
            const newSnake = [...prevSnake];
            const head = { 
                x: newSnake[0].x + direction.x, 
                y: newSnake[0].y + direction.y 
            };

            // Check if snake ate food
            if (head.x === food.x && head.y === food.y) {
                setScore(prev => prev + 1);
                createFood();
            } else {
                newSnake.pop(); // Remove tail if no food eaten
            }

            newSnake.unshift(head); // Add new head
            
            // Check for collisions
            checkGameOver(head, newSnake);
            
            return newSnake;
        });
    };

    // Check for game over conditions
    const checkGameOver = (head, snake) => {
        // Wall collision
        if (head.x < 0 || head.x >= WIDTH || head.y < 0 || head.y >= HEIGHT) {
            setGameActive(false);
            setGameOver(true);
            return;
        }

        // Self collision (skip head)
        for (let i = 1; i < snake.length; i++) {
            if (head.x === snake[i].x && head.y === snake[i].y) {
                setGameActive(false);
                setGameOver(true);
                return;
            }
        }
    };

    // Handle keyboard controls
    const handleKeyPress = (event) => {
        if (!started) {
            setStarted(true);
            return;
        }

        // Space bar to pause/unpause
        if (event.keyCode === 32) {
            setPaused(prev => !prev);
            return;
        }

        // Arrow keys to change direction
        const LEFT = 37, UP = 38, RIGHT = 39, DOWN = 40;

        switch (event.keyCode) {
            case LEFT:
                if (direction.x === 0) setDirection({ x: -UNIT, y: 0 });
                break;
            case RIGHT:
                if (direction.x === 0) setDirection({ x: UNIT, y: 0 });
                break;
            case UP:
                if (direction.y === 0) setDirection({ x: 0, y: -UNIT });
                break;
            case DOWN:
                if (direction.y === 0) setDirection({ x: 0, y: UNIT });
                break;
            default:
                break;
        }
    };

    // Set up and clean up keyboard event listener
    useEffect(() => {
        window.addEventListener('keydown', handleKeyPress);
        return () => window.removeEventListener('keydown', handleKeyPress);
    }, [direction, started]);

    // Restart game
    const startGame = () => {
        setSnake([
            { x: UNIT * 3, y: 0 },
            { x: UNIT * 2, y: 0 },
            { x: UNIT, y: 0 },
            { x: 0, y: 0 }
        ]);
        setDirection({ x: UNIT, y: 0 });
        setScore(0);
        setGameActive(true);
        setGameOver(false);
        setPaused(false);
        setStarted(false);
        createFood();
    };

    return (
        <div style={{ 
            textAlign: 'center', 
            backgroundColor: 'black',
            color:"white", 
            padding: '20px',
            fontFamily: "'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif",
            minHeight: "100vh"
        }}>
            <h2 style={{ color: 'darkgreen' }}>Snake Game</h2>
            <div style={{ marginBottom: '1em' }}>Press space to pause or continue</div>
            
            <div style={{ position: 'relative', height: "500px" }}>
                <canvas 
                    ref={gameBoardRef} 
                    width={WIDTH} 
                    height={HEIGHT} 
                    style={{ border: '3px solid', backgroundColor: '#212121' }} 
                />
                
                {!started && (
                    <button 
                        onClick={() => setStarted(true)}
                        style={{
                            position: 'absolute',
                            top: '50%',
                            left: '50%',
                            transform: 'translate(-50%, -50%)',
                            padding: '10px 20px',
                            backgroundColor: '#4CAF50',
                            color: 'white',
                            border: 'none',
                            borderRadius: '5px',
                            cursor: 'pointer',
                            fontSize: '1.2em'
                        }}
                    >
                        Start Game
                    </button>
                )}
                
                {gameOver && (
                    <div style={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        textAlign: 'center'
                    }}>
                        <div style={{
                            fontSize: '50px',
                            fontWeight: 'bold',
                            color: 'white',
                            textShadow: '2px 2px 4px black',
                            marginBottom: '20px'
                        }}>
                            Game Over!
                        </div>
                        <button 
                            onClick={startGame}
                            style={{
                                padding: '10px 20px',
                                backgroundColor: '#4CAF50',
                                color: 'white',
                                border: 'none',
                                borderRadius: '5px',
                                cursor: 'pointer',
                                fontSize: '1.2em'
                            }}
                        >
                            Play Again
                        </button>
                    </div>
                )}
            </div>
            
            <div style={{ marginTop: '1em', fontSize: '2em' }}>
                Score: {score}
            </div>
        </div>
    );
};

export default SnakeGame;