import "./App.css";
import githubIcon from "./assets/github.png";
import linkedInIcon from "./assets/linkedin.png";
import Navbar from "./components/Navbar/Navbar";
import { useState, useEffect, useRef } from "react";

function Home() {
  const [typedName, setTypedName] = useState("");
  const [showCursor, setShowCursor] = useState(true);
  const [isMeasuring, setIsMeasuring] = useState(true);
  const [animateSkills, setAnimateSkills] = useState(false);
  const nameRef = useRef(null);
  const fullName = "Sanjay Dinesh";
  const typingSpeed = 150;
  const measureRef = useRef(null);

  useEffect(()=>{
    const timer = setTimeout(() => {
      setAnimateSkills(true);
    }, 500);
    return () => clearTimeout(timer);
  })

  useEffect(()=>{
    if(!isMeasuring && nameRef.current){
      let currentIndex = 0;
      const typingInterval = setInterval(() => {
        if(currentIndex < fullName.length){
          setTypedName(fullName.substring(0,currentIndex+1));
          currentIndex++;
        }else{
          clearInterval(typingInterval);
          const blinkInterval = setInterval(() => {
            setShowCursor(prev => !prev);
          }, 500);
          setTimeout(() => {
            clearInterval(blinkInterval);
            setShowCursor(false);
          }, 2000);
        }
      }, typingSpeed);
      return () => clearInterval(typingInterval);
    }
  }, [isMeasuring,fullName,typingSpeed]);

  useEffect(()=>{
    if(measureRef.current){
      measureRef.current.offsetWidth;
      setIsMeasuring(false);
    }
  },[])

  const handleDownloadResume = () => {
    const resumeUrl = "/Resume_June_2025.pdf";
    const link = document.createElement("a");
    link.href = resumeUrl;
    link.download = "Sanjay_Dinesh_Resume.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <>
      <Navbar />
      <div ref = {measureRef}
      style={{position:"absolute",visibility:"hidden",whiteSpace:"nowrap",fontSize:"100px"}}>
        {fullName}
      </div>
      <div className="container">
        <div className="container-left">
          <div className="welcome-message">Hello! Welcome to my portfolio, I am</div>
          <div className="name-title" ref={nameRef} style={{visibility: isMeasuring ? "hidden" : "visible",width: measureRef.current?.offsetWidth}}>
            {typedName}
            <span className={`cursor ${showCursor ? 'visible': ''}`}>|</span>
            </div>
          <div className="social-icons">
            <a 
              href="https://github.com/sanjaydinesh19" 
              target="_blank" 
              rel="noopener noreferrer"
              className="social-link"
            >
              <img className="social-icon" src={githubIcon} alt="github icon" />
            </a>
            <a 
              href="https://www.linkedin.com/in/sanjay-dinesh-a0a7b7288/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="social-link"
            >
              <img className="social-icon" src={linkedInIcon} alt="linkedIn icon" />
            </a>
          </div>
          <div className="resume-message">Click Here to Download my Resume</div>
          <button className="resume-button" onClick={handleDownloadResume}>Resume</button>
        </div>
        <div className="container-right">
          <div className="about-section">
            <h2>About Me</h2>
            <p>AI Enthusiast | Robotics Engineer Aspirant | B.Tech Student at VIT Chennai</p>
          </div>
          <div className="skills-section">
            <h2>Skills</h2>
            <div className="skill">
              <span>Python</span>
              <div className="progress-bar"><div className="progress python" style={{width: animateSkills ? "90%" : "0%"}}></div></div>
            </div>
            <div className="skill">
              <span>Computer Vision</span>
              <div className="progress-bar"><div className="progress cv" style={{width: animateSkills ? "85%" : "0%"}}></div></div>
            </div>
            <div className="skill">
              <span>Machine Learning</span>
              <div className="progress-bar"><div className="progress ml" style={{width: animateSkills ? "75%" : "0%"}}></div></div>
            </div>
            <div className="skill">
              <span>ROS</span>
              <div className="progress-bar"><div className="progress ros" style={{width: animateSkills ? "70%" : "0%"}}></div></div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;