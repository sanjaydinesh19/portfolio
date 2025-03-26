import React, { useState, useEffect } from "react";

export default function Assignment5() {
  // State for Question 1 (Traffic Light)
  const [activeLight, setActiveLight] = useState(0);
  
  // State for Question 2 (Flames Effect)
  const [particles, setParticles] = useState([]);

  // State for Question 3 (Guessing Game)
  const [secretNumber, setSecretNumber] = useState(Math.floor(Math.random() * 100) + 1);
  const [chances, setChances] = useState(10);
  const [guess, setGuess] = useState("");
  const [result, setResult] = useState("");
  const [gameOver, setGameOver] = useState(false);

  // State for Question 4 (To-Do List)
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");

  // State for Question 5 (Random Shapes)
  const [shapes, setShapes] = useState([]);
  const [shapeType, setShapeType] = useState("circle");
  const [size, setSize] = useState(50);

  // State for Question 6 (Random Emoji)
  const [emoji, setEmoji] = useState("");

  // Traffic Light Effect
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveLight(prev => (prev >= 2 ? 0 : prev + 1));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  // Flames Effect
  useEffect(() => {
    // Create 150 particles with random properties
    const newParticles = Array.from({ length: 150 }).map((_, i) => ({
      id: i,
      n: i + 1,
      rnd: Math.random(),
      key: `particle-${i}-${Date.now()}` // Unique key for each particle
    }));
    setParticles(newParticles);

    // Refresh particles periodically to keep animation continuous
    const interval = setInterval(() => {
      setParticles(prev => 
        prev.map(p => ({ ...p, key: `particle-${p.id}-${Date.now()}` }))
      );
    }, 1500); // Match the animation duration

    return () => clearInterval(interval);
  }, []);


  return (
    <div style={{ padding: "20px", backgroundColor:"black",color:"white" }}>
      <h1 style={{ textAlign: "center", marginBottom: "30px" }}>Assignment 5</h1>

      {/* Question 1: Traffic Signal Lights */}
      <div style={{ marginBottom: "50px", borderBottom: "1px solid #ccc", paddingBottom: "30px" }}>
        <h2>Question 1: Traffic Signal Lights</h2>
        <div style={{ 
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "400px",
          background: "linear-gradient(#4cc191, #4188b1)",
          position: "relative"
        }}>
          
          <div style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "space-around",
            height: "250px",
            width: "80px",
            padding: "20px 0",
            borderRadius: "50px",
            backgroundColor: "#2c3e50",
            marginTop: "50px"
          }}>
            {[0, 1, 2].map((light) => (
              <div 
                key={light}
                style={{
                  height: "45px",
                  width: "45px",
                  borderRadius: "100%",
                  backgroundColor: light === activeLight ? 
                    (light === 0 ? "#ff3822" : 
                     light === 1 ? "#eeff03" : 
                     "#06ff59") : "#1d1d1d",
                  boxShadow: light === activeLight ? 
                    (light === 0 ? "0 0 60px 10px #ff3822" : 
                     light === 1 ? "0 0 60px 10px #eeff03" : 
                     "0 0 60px 10px #06ff59") : "none",
                  transition: "background-color 0.3s, box-shadow 0.3s"
                }}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Question 2: Flames Effect - Fixed */}
      <div style={{ marginBottom: "50px", borderBottom: "1px solid #ccc", paddingBottom: "30px" }}>
        <h2>Question 2: Flames Effect</h2>
        <div style={{ 
          height: "500px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(black, maroon)",
          position: "relative",
          overflow: "hidden"
        }}>
          <div style={{ 
            width: "15em",
            height: "20em",
            fontSize: "24px",
            position: "relative",
            "--particles": "150" 
          }}>
            {particles.map((particle) => (
              <div
                key={particle.key}
                style={{
                  position: "absolute",
                  width: "6em",
                  height: "6em",
                  background: "radial-gradient(orangered 20%, rgba(255, 69, 0, 0) 70%)",
                  borderRadius: "50%",
                  bottom: "0",
                  left: `calc(${(particle.n - 1) * 8 / 150 - 4}em)`,
                  mixBlendMode: "screen",
                  animation: "rise 1.5s ease-in infinite",
                  animationDelay: `${particle.rnd * 1.5}s`,
                  transform: `translateY(0) scale(1) translateX(${particle.rnd * 2 - 1}em)`,
                  opacity: "0.8",
                  willChange: "transform, opacity" // Optimize for animation
                }}
              />
            ))}
          </div>
          <style>
            {`
              @keyframes rise {
                from {
                  transform: translateY(0) scale(1) translateX(calc(var(--rnd) * 2em - 1em));
                  filter: opacity(0.8);
                }
                25% {
                  filter: opacity(1);
                }
                to {
                  transform: translateY(-15em) scale(0.6) translateX(calc(var(--rnd) * 4em - 2em));
                  filter: opacity(0);
                }
              }
            `}
          </style>
        </div>
      </div>

      {/* Question 3: Guessing Game */}
      <div style={{ marginBottom: "50px", borderBottom: "1px solid #ccc", paddingBottom: "30px" }}>
        <h2>Question 3: Guessing Game</h2>
        <div style={{ 
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "400px"
        }}>
          <div style={{ 
            textAlign: "center",
            backgroundColor: "#f4f4f4",
            color:"black",
            padding: "20px",
            borderRadius: "10px",
            boxShadow: "0 0 10px rgba(0,0,0,0.4)",
            width: "300px"
          }}>
            <h3 style={{ color: "#333", marginBottom: "10px" }}>Number Guessing Game</h3>
            <p>Enter a number between 1 and 100:</p>
            <input 
              type="number" 
              value={guess}
              onChange={(e) => setGuess(e.target.value)}
              min="1" 
              max="100"
              disabled={gameOver}
              style={{ 
                padding: "8px",
                margin: "10px 0",
                width: "100%"
              }}
            />
            <button 
              onClick={checkGuess}
              disabled={gameOver}
              style={{ 
                padding: "10px",
                marginTop: "10px",
                backgroundColor: "#3498db",
                color: "#fff",
                borderRadius: "5px",
                border: "none",
                cursor: "pointer",
                width: "100%"
              }}
            >
              Submit Guess
            </button>
            <p style={{ 
              color: result.includes("Congratulations") ? "green" : "#e74c3c",
              fontWeight: "bold",
              margin: "10px 0",
              minHeight: "50px"
            }}>
              {result}
            </p>
            <p>Chances Left: <span style={{ fontWeight: "bold" }}>{chances}</span></p>
            <button 
              onClick={replayGame}
              style={{ 
                padding: "10px",
                marginTop: "10px",
                backgroundColor: "#3498db",
                color: "#fff",
                borderRadius: "5px",
                border: "none",
                cursor: "pointer",
                width: "100%"
              }}
            >
              Replay
            </button>
          </div>
        </div>
      </div>

      {/* Question 4: To-Do List */}
      <div style={{ marginBottom: "50px", borderBottom: "1px solid #ccc", paddingBottom: "30px" }}>
        <h2>Question 4: To-Do List</h2>
        <div style={{ 
          width: "100%",
          minHeight: "300px",
          background: "linear-gradient(135deg, #153677, #4e085f)",
          padding: "10px",
          display: "flex",
          justifyContent: "center"
        }}>
          <div style={{ 
            width: "100%",
            maxWidth: "540px",
            background: "white",
            margin: "50px auto",
            padding: "40px 30px 70px",
            borderRadius: "10px"
          }}>
            <h3 style={{ 
              color: "#002765",
              display: "flex",
              alignItems: "center",
              marginBottom: "20px"
            }}>
              To-Do List
            </h3>
            <div style={{ 
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              background: "#edeef0",
              borderRadius: "30px",
              paddingLeft: "20px",
              marginBottom: "25px"
            }}>
              <input
                type="text"
                value={newTodo}
                onChange={(e) => setNewTodo(e.target.value)}
                placeholder="Add your text"
                style={{ 
                  flex: "1",
                  border: "none",
                  outline: "none",
                  background: "transparent",
                  padding: "10px"
                }}
              />
              <button
                onClick={addTask}
                style={{ 
                  border: "none",
                  outline: "none",
                  padding: "16px 50px",
                  background: "#ff5945",
                  color: "white",
                  fontSize: "16px",
                  cursor: "pointer",
                  borderRadius: "40px"
                }}
              >
                Add
              </button>
            </div>
            <ul style={{ listStyle: "none" }}>
              {todos.map((todo, index) => (
                <li 
                  key={index}
                  style={{ 
                    fontSize: "17px",
                    padding: "12px 8px 12px 50px",
                    userSelect: "none",
                    cursor: "pointer",
                    position: "relative",
                    textDecoration: todo.checked ? "line-through" : "none",
                    color: todo.checked ? "#555" : "#000"
                  }}
                  onClick={() => toggleTask(index)}
                >
                  {todo.text}
                  <span 
                    style={{ 
                      position: "absolute",
                      right: "0",
                      top: "5px",
                      width: "40px",
                      height: "40px",
                      fontSize: "22px",
                      color: "#555",
                      lineHeight: "40px",
                      textAlign: "center",
                      borderRadius: "50%"
                    }}
                    onClick={(e) => {
                      e.stopPropagation();
                      deleteTask(index);
                    }}
                  >
                    ×
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Question 5: Random Shapes */}
      <div style={{ marginBottom: "50px", borderBottom: "1px solid #ccc", paddingBottom: "30px" }}>
        <h2>Question 5: Random Shapes</h2>
        <div style={{ 
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "100vh",
          background: "linear-gradient(to right, #ed373d, #ef6f4c)"
        }}>
          <div style={{ 
            textAlign: "center",
            background: "rgb(221, 220, 220)",
            padding: "20px",
            borderRadius: "10px",
            boxShadow: "0 0 10px rgba(0, 0, 0, 0.2)",
            width: "400px"
          }}>
            <h3 style={{ marginBottom: "20px", color: "#202020" }}>Draw Shapes</h3>
            <div style={{ 
              display: "flex",
              flexDirection: "column",
              gap: "10px",
              alignItems: "center"
            }}>
              <label htmlFor="shape">Select Shape:</label>
              <select 
                id="shape"
                value={shapeType}
                onChange={(e) => setShapeType(e.target.value)}
                style={{ padding: "5px", width: "80%" }}
              >
                <option value="circle">Circle</option>
                <option value="square">Square</option>
                <option value="triangle">Triangle</option>
              </select>

              <label htmlFor="size">Size (px):</label>
              <input 
                type="number" 
                id="size"
                value={size}
                onChange={(e) => setSize(parseInt(e.target.value))}
                min="20" 
                max="200" 
                style={{ padding: "5px", width: "80%" }}
              />

              <button 
                onClick={drawShape}
                style={{ 
                  padding: "8px 15px",
                  backgroundColor: "#3ea5ea",
                  color: "white",
                  border: "none",
                  cursor: "pointer",
                  borderRadius: "5px",
                  width: "85%"
                }}
              >
                Draw
              </button>
              <button 
                onClick={clearCanvas}
                style={{ 
                  padding: "8px 15px",
                  backgroundColor: "#3ea5ea",
                  color: "white",
                  border: "none",
                  cursor: "pointer",
                  borderRadius: "5px",
                  width: "85%"
                }}
              >
                Clear
              </button>
            </div>
            <div 
              id="canvas"
              style={{ 
                marginTop: "20px",
                width: "350px",
                height: "300px",
                background: "#f4f4f4",
                border: "2px dashed #333",
                display: "flex",
                flexWrap: "wrap",
                alignItems: "center",
                justifyContent: "center",
                position: "relative"
              }}
            >
              {shapes.map((shape) => (
                <div
                  key={shape.id}
                  style={{
                    position: "absolute",
                    left: `${shape.x}px`,
                    top: `${shape.y}px`,
                    width: `${shape.size}px`,
                    height: `${shape.size}px`,
                    backgroundColor: shape.type === "circle" ? "red" : 
                                      shape.type === "square" ? "blue" : 
                                      shape.type === "triangle" ? "green" : "transparent",
                    borderRadius: shape.type === "circle" ? "50%" : "0",
                    border: shape.type === "triangle" ? `${shape.size}px solid transparent` : "none",
                    clipPath: shape.type === "triangle" ? "polygon(50% 0%, 0% 100%,100% 100%)" : "none",
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Question 6: Random Emoji Generator */}
      <div style={{ marginBottom: "50px" }}>
        <h2>Question 6: Random Emoji Generator</h2>
        <div style={{ 
          maxWidth: "900px",
          margin: "0 auto",
          backgroundColor: "#fff",
          padding: "3rem",
          borderRadius: "0.5rem",
          boxShadow: "rgba(100,100,111,0.2) 0px 7px 29px 0px",
          textAlign: "center"
        }}>
          <h3 style={{ marginBottom: "15px", color: "black" }}>Random Emoji Generator</h3>
          <p style={{ fontSize: "10rem", marginBottom: "1rem" }}>{emoji}</p>
          <button 
            onClick={getRandomEmoji}
            style={{ 
              fontSize: "1rem",
              padding: "0.5rem 1rem",
              borderRadius: "0.5rem",
              backgroundColor: "#000",
              color: "#fff",
              cursor: "pointer"
            }}
          >
            Generate
          </button>
        </div>
      </div>
    </div>
  );

  // Guessing Game functions
  function checkGuess() {
    const userGuess = parseInt(guess);
    if (isNaN(userGuess)) {
      setResult("Please enter a valid number");
      return;
    }

    setChances(chances - 1);

    if (userGuess === secretNumber) {
      setResult("Congratulations! You guessed the correct number!");
      setGameOver(true);
    } else if (chances <= 1) {
      setResult(`Game Over! The number was ${secretNumber}`);
      setGameOver(true);
    } else {
      const hint = userGuess > secretNumber ? "Lower" : "Higher";
      setResult(`Your guess is ${hint}. Chances left: ${chances - 1}`);
    }
  }

  function replayGame() {
    setSecretNumber(Math.floor(Math.random() * 100) + 1);
    setChances(10);
    setGuess("");
    setResult("");
    setGameOver(false);
  }

  // To-Do List functions
  function addTask() {
    if (newTodo.trim() === "") {
      alert("You must enter something");
      return;
    }
    setTodos([...todos, { text: newTodo, checked: false }]);
    setNewTodo("");
  }

  function toggleTask(index) {
    const updatedTodos = [...todos];
    updatedTodos[index].checked = !updatedTodos[index].checked;
    setTodos(updatedTodos);
  }

  function deleteTask(index) {
    const updatedTodos = todos.filter((_, i) => i !== index);
    setTodos(updatedTodos);
  }

  // Random Shapes functions
  function drawShape() {
    const newShape = {
      type: shapeType,
      size,
      x: Math.floor(Math.random() * (350 - size)),
      y: Math.floor(Math.random() * (300 - size)),
      id: Date.now()
    };
    setShapes([...shapes, newShape]);
  }

  function clearCanvas() {
    setShapes([]);
  }

  // Random Emoji function
  function getRandomEmoji() {
    const emojis = [
      "😀", "😂", "🥳", "😍", "🤔", "🙄", "😎", "🥳", "🥳", "😇", "😜",
      "😱", "🤖", "👻", "🎃", "🤡", "💀", "👽", "🦄", "🐱", "🐶", "🦊",
      "🐼", "🐵", "🐸", "🐢", "🐙", "🥳", "🥳", "🐉", "🔥", "⭐", "🌈",
      "⚡", "🎉", "🎶", "🚀", "🥳", "🏆", "🥇", "🍕", "🍔", "🍎", "🍉",
      "🍩", "🍪", "🍿", "☕", "🎸", "🎮", "🏀", "⚽"
    ];
    const randomEmoji = emojis[Math.floor(Math.random() * emojis.length)];
    setEmoji(randomEmoji);
  }
}