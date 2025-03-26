import "./App.css";
import githubIcon from "./assets/github.png";
import linkedInIcon from "./assets/linkedin.png";
import Navbar from "./components/Navbar/Navbar";

function Home() {
  const handleDownloadResume = () => {
    const resumeUrl = "/Sanjay_Dinesh_Resume.pdf";
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
      <div className="container">
        <div className="container-left">
          <div className="welcome-message">Hello! Welcome to my portfolio, I am</div>
          <div className="name-title">Sanjay Dinesh</div>
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
            <p>AI Enthusiast | Robotics Engineer</p>
          </div>
          <div className="skills-section">
            <h2>Skills</h2>
            <div className="skill">
              <span>Python</span>
              <div className="progress-bar"><div className="progress react"></div></div>
            </div>
            <div className="skill">
              <span>Computer Vision</span>
              <div className="progress-bar"><div className="progress python"></div></div>
            </div>
            <div className="skill">
              <span>Machine Learning</span>
              <div className="progress-bar"><div className="progress ml"></div></div>
            </div>
            <div className="skill">
              <span>ROS</span>
              <div className="progress-bar"><div className="progress ros"></div></div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;