import Navbar from "./components/Navbar/Navbar";
import "./Projects.css";

const projects = [
  {
    title: "MIRA – Autonomous Underwater Vehicle",
    desc: "Competition AUV built for SAUVC 2025, 2026 & TAC 2026. Underwater gate perception with MobileNetV2SSD, YOLOv8 for 3D bounding box detection of valves and pipelines, ArUco marker docking, and flare detection using OpenCV.",
    link: "https://github.com/sanjaydinesh19/mira",
    secondaryLink: "https://github.com/sanjaydinesh19/auv-sim",
    secondaryLabel: "Simulator",
    tags: ["Python", "YOLOv8", "OpenCV", "ROS2", "C++"],
    category: "robotics",
    status: "Active",
  },
  {
    title: "AUV Simulator",
    desc: "Stonefish-based simulator for the MIRA AUV (Dreadnought Robotics). Used to validate the full programming stack prior to real-world underwater deployment.",
    link: "https://github.com/sanjaydinesh19/auv-sim",
    tags: ["Python", "ROS2", "Stonefish", "Gazebo"],
    category: "robotics",
    status: "Active",
  },
  {
    title: "Adaptive Gait Quadruped Robot",
    desc: "Quadruped robot that dynamically adjusts gait level and stance based on real-time IMU elevation values to navigate uneven terrain effectively.",
    link: null,
    tags: ["Python", "ROS2", "IMU", "Hardware"],
    category: "robotics",
    status: "Ongoing",
  },
  {
    title: "4 DOF Robotic Arm – Object Classification",
    desc: "Robotic arm that uses a force sensor to measure grip force at the gripper during grasping, classifying objects as soft or hard with 85% accuracy.",
    link: null,
    tags: ["Python", "Hardware", "Force Sensor", "Robotics"],
    category: "robotics",
    status: "Completed",
  },
  {
    title: "Hybrid RL-Based Cube Solver",
    desc: "Rubik's Cube solver using a hybrid Reinforcement Learning approach with the Pilgrim class for graph-based solving. Achieves a solve time of 50–60 seconds, implemented on hardware using stepper motors.",
    link: "https://github.com/sanjaydinesh19/cube-solver",
    tags: ["Python", "Reinforcement Learning", "Hardware", "Stepper Motors"],
    category: "ai",
    status: "Completed",
  },
  {
    title: "AI Teaching Assistant",
    desc: "Teaching assistant built on OpenAI's Agent SDK to support teachers in rural classrooms. Features worksheet generation, voice assistance, and a study plan generator.",
    link: "https://github.com/sanjaydinesh19/ai-teaching-assistant",
    tags: ["Python", "OpenAI SDK", "LLM", "Voice AI"],
    category: "ai",
    status: "Completed",
  },
  {
    title: "AI Academic Assistant",
    desc: "LLM-based academic assistant for Q&A and summarization, built and deployed as part of the Microsoft Innovations Club (MIC) project cycle at VIT Chennai.",
    link: "https://github.com/sanjaydinesh19/acad-assistant",
    tags: ["Python", "LLM", "NLP", "MIC"],
    category: "ai",
    status: "Completed",
  },
  {
    title: "AI Resume Builder",
    desc: "NLP-powered resume builder with skill extraction and formatting optimization. Built and deployed as part of the MIC project cycle, listed on the MIC website.",
    link: "https://github.com/sanjaydinesh19/resume-builder",
    tags: ["Python", "NLP", "MIC"],
    category: "ai",
    status: "Completed",
  },
  {
    title: "MedBot AI – Lung Pneumonia Detection",
    desc: "Medical AI model for detecting lung pneumonia from chest X-ray images using deep learning classification.",
    link: "https://github.com/sanjaydinesh19/medbot-ai",
    tags: ["Python", "Deep Learning", "Medical AI", "Jupyter"],
    category: "ai",
    status: "Completed",
  },
  {
    title: "Steganography Project",
    desc: "Embedded secure communication system using steganography with a Raspberry Pi as a cryptographically secure node for covert data transmission.",
    link: "https://github.com/sanjaydinesh19/steganography-project",
    tags: ["Python", "Raspberry Pi", "Cryptography", "Security"],
    category: "systems",
    status: "Completed",
  },
  {
    title: "Portfolio Website",
    desc: "This portfolio website built with React and Vite, featuring responsive design, a contact form via EmailJS, and certificate/project showcases.",
    link: "https://github.com/sanjaydinesh19/portfolio",
    tags: ["React", "JavaScript", "CSS", "Vite"],
    category: "web",
    status: "Active",
  },
];

const categoryGradients = {
  robotics: "linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)",
  ai: "linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #533483 100%)",
  systems: "linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #1b4332 100%)",
  web: "linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #1d3557 100%)",
};

const statusColors = {
  Active: "#22c55e",
  Ongoing: "#f59e0b",
  Completed: "#6b7280",
};

function Projects() {
  return (
    <>
      <Navbar />
      <div className="projects-page">
        <div className="projects-grid">
          {projects.map((project, index) => (
            <div
              key={index}
              className="project-card"
              style={{ animationDelay: `${index * 0.07}s` }}
            >
              <div
                className="project-card-header"
                style={{ background: categoryGradients[project.category] }}
              >
                <span
                  className="project-status"
                  style={{ color: statusColors[project.status] }}
                >
                  ● {project.status}
                </span>
                <h3 className="project-title">{project.title}</h3>
              </div>

              <div className="project-card-body">
                <p className="project-desc">{project.desc}</p>

                <div className="project-tags">
                  {project.tags.map((tag, i) => (
                    <span key={i} className="project-tag">{tag}</span>
                  ))}
                </div>

                <div className="project-links">
                  {project.link ? (
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="project-link-btn"
                    >
                      GitHub
                    </a>
                  ) : (
                    <span className="project-link-btn disabled">No Repo</span>
                  )}
                  {project.secondaryLink && (
                    <a
                      href={project.secondaryLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="project-link-btn secondary"
                    >
                      {project.secondaryLabel}
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default Projects;
