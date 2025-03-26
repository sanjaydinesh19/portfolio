import React, { useState, useEffect, useRef } from "react";
import Image1 from "../../assets/image1.jpeg";
import Image2 from "../../assets/image2.jpg";
import Image3 from "../../assets/image3.jpeg";
import Image4 from "../../assets/image4.jpeg";
export default function Assignment6() {
  // State for Question 1 (Digital Clock)
  const [currentTime, setCurrentTime] = useState(new Date());

  // State for Question 3 (Flashlight Text)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  // State for Question 5 (Vertical Image Slider)
  const [currentSlide, setCurrentSlide] = useState(0);
  const images = {
    Image1, Image2,Image3,Image4
  };


  // State for Question 7 (Webcam)
  const [stream, setStream] = useState(null);
  const [screenshot, setScreenshot] = useState(null);
  const [recording, setRecording] = useState(false);
  const [mediaRecorder, setMediaRecorder] = useState(null);
  const [recordedChunks, setRecordedChunks] = useState([]);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  // State for Question 8 (Mobile Flashlight)
  const [flashlightOn, setFlashlightOn] = useState(false);
  const [flashlightSupported, setFlashlightSupported] = useState(false);

  // Digital Clock Effect
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);
  // Webcam functions
  const startWebcam = async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({ video: true });
      setStream(mediaStream);
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
      }
    } catch (err) {
      console.error("Error accessing webcam:", err);
    }
  };

  const stopWebcam = () => {
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
      setStream(null);
    }
  };

  const takeScreenshot = () => {
    if (videoRef.current && canvasRef.current) {
      const context = canvasRef.current.getContext('2d');
      canvasRef.current.width = videoRef.current.videoWidth;
      canvasRef.current.height = videoRef.current.videoHeight;
      context.drawImage(videoRef.current, 0, 0);
      setScreenshot(canvasRef.current.toDataURL('image/png'));
    }
  };

  const startRecording = () => {
    if (!stream) return;
    
    const recorder = new MediaRecorder(stream);
    const chunks = [];
    
    recorder.ondataavailable = (e) => {
      chunks.push(e.data);
    };
    
    recorder.onstop = () => {
      const blob = new Blob(chunks, { type: 'video/webm' });
      setRecordedChunks(blob);
    };
    
    recorder.start();
    setRecording(true);
    setMediaRecorder(recorder);
  };

  const stopRecording = () => {
    if (mediaRecorder) {
      mediaRecorder.stop();
      setRecording(false);
    }
  };

  const downloadRecording = () => {
    if (recordedChunks) {
      const url = URL.createObjectURL(recordedChunks);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'recording.webm';
      a.click();
    }
  };

  // Flashlight functions
  const toggleFlashlight = async () => {
    if (!flashlightOn) {
      try {
        const mediaStream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: "environment" }
        });
        const track = mediaStream.getVideoTracks()[0];
        
        if ('torch' in track.getCapabilities()) {
          await track.applyConstraints({ advanced: [{ torch: true }] });
          setFlashlightOn(true);
          setFlashlightSupported(true);
          setStream(mediaStream); // Store stream to turn off later
        } else {
          alert("Your device doesn't support flashlight control");
          setFlashlightSupported(false);
        }
      } catch (err) {
        console.error("Error accessing flashlight:", err);
      }
    } else {
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
        setStream(null);
        setFlashlightOn(false);
      }
    }
  };

// Image Slider functions
const imageKeys = Object.keys(images); // ['Image1', 'Image2', 'Image3', 'Image4']
const imageCount = imageKeys.length;

useEffect(() => {
  const timer = setInterval(() => {
    setCurrentSlide(prev => (prev + 1) % imageCount);
  }, 3000);
  return () => clearInterval(timer);
}, [imageCount]);

const nextSlide = () => {
  setCurrentSlide(prev => (prev + 1) % imageCount);
};

const prevSlide = () => {
  setCurrentSlide(prev => (prev - 1 + imageCount) % imageCount);
};

  // Flashlight Text mouse movement
  const handleMouseMove = (e) => {
    const container = e.currentTarget;
    const rect = container.getBoundingClientRect();
    setMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    });
  };

  return (
    <div style={{ padding: "20px", backgroundColor:"black",color: "white" }}>
      <h1 style={{ textAlign: "center", marginBottom: "30px" }}>Assignment 6</h1>

      {/* Question 1: Digital Clock */}
      <div style={{ marginBottom: "50px", borderBottom: "1px solid #ccc", paddingBottom: "30px" }}>
        <h2>Question 1: Digital Clock</h2>
        <div style={{ 
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "200px",
          background: "linear-gradient(135deg, red, blue)",
          position: "relative"
        }}>
          <div style={{
            width: "800px",
            height: "180px",
            background: "rgba(235,0,255,0.1)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backdropFilter: "blur(40px)"
          }}>
            <span style={{ 
              fontSize: "80px",
              width: "110px",
              display: "inline-block",
              textAlign: "center"
            }}>
              {currentTime.getHours().toString().padStart(2, '0')}
            </span>
            <span style={{ fontSize: "80px" }}>:</span>
            <span style={{ 
              fontSize: "80px",
              width: "110px",
              display: "inline-block",
              textAlign: "center"
            }}>
              {currentTime.getMinutes().toString().padStart(2, '0')}
            </span>
            <span style={{ fontSize: "80px" }}>:</span>
            <span style={{ 
              fontSize: "80px",
              width: "110px",
              display: "inline-block",
              textAlign: "center"
            }}>
              {currentTime.getSeconds().toString().padStart(2, '0')}
            </span>
          </div>
        </div>
      </div>

      {/* Question 2: Analog Clock */}
      <div style={{ marginBottom: "50px", borderBottom: "1px solid #ccc", paddingBottom: "30px" }}>
        <h2>Question 2: Analog Clock</h2>
        <div style={{ 
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "600px",
          background: "linear-gradient(45deg, rgb(128, 0, 0), rgb(245, 140, 2))",
          position: "relative"
        }}>
          <div style={{
            width: "500px",
            height: "500px",
            border: "20px solid black",
            borderRadius: "50%",
            position: "relative"
          }}>
            {/* Clock numbers */}
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map(num => (
              <div key={num} style={{
                position: "absolute",
                fontSize: "30px",
                fontWeight: "bold",
                ...getClockNumberPosition(num)
              }}>
                {num}
              </div>
            ))}

            {/* Clock center point */}
            <div style={{
              width: "20px",
              height: "20px",
              backgroundColor: "black",
              borderRadius: "50%",
              position: "absolute",
              top: "240px",
              left: "240px",
              zIndex: 10
            }}></div>

            {/* Hour hand */}
            <div style={{
              width: "300px",
              height: "300px",
              position: "absolute",
              top: "100px",
              left: "100px",
              borderRadius: "50%",
              transform: `rotate(${currentTime.getHours() % 12 * 30 + currentTime.getMinutes() * 0.5}deg)`
            }}>
              <div style={{
                width: "4px",
                height: "150px",
                backgroundColor: "black",
                position: "absolute",
                left: "148px"
              }}></div>
            </div>

            {/* Minute hand */}
            <div style={{
              width: "400px",
              height: "400px",
              position: "absolute",
              top: "50px",
              left: "50px",
              borderRadius: "50%",
              transform: `rotate(${currentTime.getMinutes() * 6}deg)`
            }}>
              <div style={{
                width: "4px",
                height: "200px",
                backgroundColor: "black",
                position: "absolute",
                left: "198px"
              }}></div>
            </div>

            {/* Second hand */}
            <div style={{
              width: "350px",
              height: "350px",
              position: "absolute",
              top: "75px",
              left: "75px",
              borderRadius: "50%",
              transform: `rotate(${currentTime.getSeconds() * 6}deg)`
            }}>
              <div style={{
                width: "2px",
                height: "175px",
                backgroundColor: "#000105",
                position: "absolute",
                left: "174px"
              }}></div>
            </div>
          </div>
        </div>
      </div>

      {/* Question 3: Flashlight Text */}
      <div style={{ marginBottom: "50px", borderBottom: "1px solid #ccc", paddingBottom: "30px" }}>
        <h2>Question 3: Flashlight Text</h2>
        <div 
          style={{ 
            position: "relative",
            maxWidth: "620px",
            margin: "0 auto",
            textAlign: "center",
            minHeight: "300px",
            backgroundColor: "black",
            overflow: "hidden"
          }}
          onMouseMove={handleMouseMove}
        >
          <div style={{
            position: "absolute",
            inset: 0,
            backgroundColor: "black"
          }}></div>
          
          <div style={{
            position: "absolute",
            background: "white",
            width: "1600px",
            height: "1600px",
            borderRadius: "50%",
            top: `${mousePosition.y - 800}px`,
            left: `${mousePosition.x - 800}px`,
            boxShadow: "inset 0 0 600px 600px black"
          }}></div>
          
          <div style={{ position: "relative", zIndex: 1, padding: "20px", color: "white" }}>
            <h1>What is lorem ipsum?</h1>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Blanditiis, similique? Fugit necessitatibus nemo possimus odit explicabo eaque tenetur? Distinctio quisquam eveniet magnam quia aut natus? Delectus eligendi iure fugiat.</p>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Blanditiis, similique? Fugit necessitatibus nemo possimus odit explicabo eaque tenetur? Distinctio quisquam eveniet magnam quia aut natus? Delectus eligendi iure fugiat.</p>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Blanditiis, similique? Fugit necessitatibus nemo possimus odit explicabo eaque tenetur? Distinctio quisquam eveniet magnam quia aut natus? Delectus eligendi iure fugiat.</p>
          </div>
        </div>
      </div>

      {/* Question 4: Minion Eyes */}
      <div style={{ marginBottom: "50px", borderBottom: "1px solid #ccc", paddingBottom: "30px" }}>
        <h2>Question 4: Minion Eyes</h2>
        <div style={{ 
          width: "100%",
          height: "400px",
          backgroundColor: "#F5d60e",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          position: "relative"
        }}>
          <div style={{
            position: "absolute",
            width: "100%",
            height: "4em",
            backgroundColor: "#231f1e",
            transform: "translate(-50%, -50%)",
            top: "50%",
            left: "50%",
            zIndex: 0
          }}></div>
          
          <div style={{
            display: "flex",
            position: "relative"
          }}>
            <div style={{
              position: "absolute",
              width: "26em",
              height: "6em",
              backgroundColor: "#a8a7ac",
              margin: "auto",
              left: 0,
              right: 0,
              top: 0,
              bottom: 0,
              zIndex: 0
            }}></div>
            
            {[1, 2].map((eye, index) => (
              <MinionEye key={index} />
            ))}
          </div>
        </div>
      </div>

      {/* Question 5: Vertical Image Slider */}
      <div style={{ marginBottom: "50px", borderBottom: "1px solid #ccc", paddingBottom: "30px" }}>
  <h2>Question 5: Vertical Image Slider</h2>
  <div style={{ 
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    minHeight: "500px"
  }}>
    <div style={{
      position: "relative",
      width: "300px",
      height: "400px",
      overflow: "hidden",
      borderRadius: "10px",
      boxShadow: "0 0 10px rgba(0, 0, 0, 0.2)"
    }}>
      <button 
        onClick={prevSlide}
        style={{
          position: "absolute",
          left: "50%",
          transform: "translateX(-50%)",
          top: "10px",
          backgroundColor: "rgba(0, 0, 0, 0.7)",
          color: "white",
          border: "none",
          padding: "10px 15px",
          cursor: "pointer",
          fontSize: "18px",
          borderRadius: "5px",
          zIndex: 2
        }}
      >
        ↑
      </button>
      
      <div style={{
        width: "100%",
        height: "100%",
        overflow: "hidden"
      }}>
        <div style={{
          display: "flex",
          flexDirection: "column",
          transition: "transform 0.5s ease-in-out",
          transform: `translateY(-${currentSlide * 400}px)`
        }}>
          {imageKeys.map((key, index) => (
            <img 
              key={key}
              src={images[key]}
              alt={`Slide ${index + 1}`}
              style={{
                width: "100%",
                height: "400px",
                objectFit: "cover"
              }}
            />
          ))}
        </div>
      </div>
      
      <button 
        onClick={nextSlide}
        style={{
          position: "absolute",
          left: "50%",
          transform: "translateX(-50%)",
          bottom: "10px",
          backgroundColor: "rgba(0, 0, 0, 0.7)",
          color: "white",
          border: "none",
          padding: "10px 15px",
          cursor: "pointer",
          fontSize: "18px",
          borderRadius: "5px",
          zIndex: 2
        }}
      >
        ↓
      </button>
    </div>
  </div>
</div>

      {/* Question 7: Webcam */}
      <div style={{ marginBottom: "50px", borderBottom: "1px solid #ccc", paddingBottom: "30px" }}>
        <h2>Question 7: Webcam Controller</h2>
        <div style={{ 
          maxWidth: "800px",
          margin: "0 auto",
          padding: "20px",
          backgroundColor: "#f0f0f0"
        }}>
          <h1 style={{ textAlign: "center", color: "#333" }}>Webcam Controller</h1>
          
          <video 
            ref={videoRef}
            id="webcam" 
            autoPlay 
            playsInline
            style={{
              width: "100%",
              borderRadius: "8px",
              border: "2px solid #333",
              marginBottom: "20px",
              backgroundColor: "#333"
            }}
          ></video>
          
          <canvas 
            ref={canvasRef}
            id="canvas" 
            style={{ display: "none" }}
          ></canvas>
          
          {screenshot && (
            <img 
              src={screenshot} 
              alt="Screenshot" 
              style={{
                maxWidth: "100%",
                borderRadius: "8px",
                border: "2px solid #333",
                margin: "20px 0"
              }}
            />
          )}
          
          <div style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "10px",
            marginBottom: "20px"
          }}>
            <button 
              onClick={startWebcam}
              disabled={!!stream}
              style={{
                padding: "10px 15px",
                border: "none",
                borderRadius: "5px",
                backgroundColor: "#4CAF50",
                color: "white",
                fontWeight: "bold",
                cursor: "pointer"
              }}
            >
              Start Webcam
            </button>
            
            <button 
              onClick={stopWebcam}
              disabled={!stream}
              style={{
                padding: "10px 15px",
                border: "none",
                borderRadius: "5px",
                backgroundColor: "#f44336",
                color: "white",
                fontWeight: "bold",
                cursor: "pointer"
              }}
            >
              Stop Webcam
            </button>
            
            <button 
              onClick={takeScreenshot}
              disabled={!stream}
              style={{
                padding: "10px 15px",
                border: "none",
                borderRadius: "5px",
                backgroundColor: "#2196F3",
                color: "white",
                fontWeight: "bold",
                cursor: "pointer"
              }}
            >
              Take Screenshot
            </button>
            
            <button 
              onClick={startRecording}
              disabled={!stream || recording}
              style={{
                padding: "10px 15px",
                border: "none",
                borderRadius: "5px",
                backgroundColor: "#ff9800",
                color: "white",
                fontWeight: "bold",
                cursor: "pointer"
              }}
            >
              Start Recording
            </button>
            
            <button 
              onClick={stopRecording}
              disabled={!recording}
              style={{
                padding: "10px 15px",
                border: "none",
                borderRadius: "5px",
                backgroundColor: "#f44336",
                color: "white",
                fontWeight: "bold",
                cursor: "pointer"
              }}
            >
              Stop Recording
            </button>
            
            {recordedChunks.size > 0 && (
              <a 
                onClick={downloadRecording}
                style={{
                  display: "inline-block",
                  padding: "10px 15px",
                  backgroundColor: "#673AB7",
                  color: "white",
                  textDecoration: "none",
                  borderRadius: "5px",
                  fontWeight: "bold",
                  cursor: "pointer"
                }}
              >
                Download Recording
              </a>
            )}
          </div>
        </div>
      </div>

      {/* Question 8: Mobile Flashlight */}
      <div style={{ marginBottom: "50px" }}>
        <h2>Question 8: Mobile Flashlight</h2>
        <div style={{ 
          fontFamily: "'Arial', sans-serif",
          backgroundColor: "#121212",
          color: "white",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          height: "100vh",
          margin: 0,
          padding: "20px"
        }}>
          <div style={{ textAlign: "center", maxWidth: "600px" }}>
            <h1 style={{ 
              marginBottom: "30px",
              fontSize: "2.5rem",
              textShadow: "0 0 10px rgba(255, 255, 255, 0.5)"
            }}>
              Mobile Flashlight
            </h1>
            
            <p style={{ marginBottom: "40px", fontSize: "1.2rem", opacity: "0.8" }}>
              Use your device's camera flash as a flashlight
            </p>
            
            <div style={{ fontSize: "80px", marginBottom: "30px" }}>🔦</div>
            
            <button 
              onClick={toggleFlashlight}
              style={{
                backgroundColor: flashlightOn ? "#ffd700" : "#ffcc00",
                color: "#121212",
                border: "none",
                padding: "15px 30px",
                borderRadius: "50px",
                fontSize: "1.5rem",
                fontWeight: "bold",
                cursor: "pointer",
                boxShadow: flashlightOn ? "0 0 30px rgba(255, 215, 0, 0.7)" : "0 0 20px rgba(255, 204, 0, 0.5)",
                transition: "all 0.3s ease"
              }}
            >
              {flashlightOn ? "Turn Off Flashlight" : "Turn On Flashlight"}
            </button>
            
            <div style={{ marginTop: "40px", fontSize: "0.9rem", opacity: "0.6" }}>
              <p>Note: This requires camera permission and works only on compatible mobile devices.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  // Helper function for analog clock numbers position
  function getClockNumberPosition(num) {
    const angle = (num * 30) * (Math.PI / 180);
    const radius = 200;
    const x = 250 + radius * Math.sin(angle) - 15;
    const y = 250 - radius * Math.cos(angle) - 15;
    
    return { top: `${y}px`, left: `${x}px` };
  }
}

// Minion Eye component
function MinionEye() {
  const eyeRef = useRef(null);
  
  useEffect(() => {
    const handleMouseMove = (e) => {
      if (eyeRef.current) {
        const eye = eyeRef.current;
        const eyeRect = eye.getBoundingClientRect();
        const eyeX = eyeRect.left + eye.clientWidth / 2;
        const eyeY = eyeRect.top + eye.clientHeight / 2;
        
        const x = e.clientX;
        const y = e.clientY;
        
        const radian = Math.atan2(x - eyeX, y - eyeY);
        const rotationDegrees = radian * (180 / Math.PI) * -1 + 180;
        
        eye.style.transform = `rotate(${rotationDegrees}deg)`;
      }
    };
    
    document.addEventListener('mousemove', handleMouseMove);
    return () => document.removeEventListener('mousemove', handleMouseMove);
  }, []);
  
  return (
    <div 
      ref={eyeRef}
      className="eye"
      style={{
        width: "10em",
        height: "10em",
        border: "15px solid #a6a4ad",
        backgroundColor: "white",
        borderRadius: "50%",
        margin: "0 1em",
        position: "relative",
        transition: "transform 0.1s ease"
      }}
    >
      <div 
        className="eyeball"
        style={{
          height: "3.2em",
          width: "3.2em",
          background: "radial-gradient(#271e1e 35%, #935a29 37%)",
          margin: "0.2em 3.5em",
          borderRadius: "50%",
          position: "relative"
        }}
      >
        <div style={{
          position: "absolute",
          backgroundColor: "white",
          height: "0.7em",
          width: "0.5em",
          borderRadius: "50%",
          top: "13px",
          left: "13px",
          transform: "rotate(45deg)"
        }}></div>
      </div>
    </div>
  );
}