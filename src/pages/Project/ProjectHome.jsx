import { Link } from "react-router-dom";
import "./project.css";
import project1Image from "../../assets/project1.png";
import project2Image from "../../assets/project2.png";
import project3Image from "../../assets/project3.png";
import project4Image from "../../assets/project4.png";
import project5Image from "../../assets/project5.png";


const projects = [
  { id: 1, title: "Project 1", description: "Flappy Bird", imageUrl: project1Image },
  { id: 2, title: "Project 2", description: "Pong", imageUrl: project2Image },
  { id: 3, title: "Project 3", description: "Brick Breaker", imageUrl: project3Image },
  { id: 4, title: "Project 4", description: "T-Rex Runner", imageUrl: project4Image },
  { id: 5, title: "Project 5", description: "Space Shooter", imageUrl: project5Image }
];

export default function ProjectHome() {
  return (
    <div className="project-container">
      <div className="project-gallery">
        {projects.map((project) => (
          <Link to={`/project${project.id}`} key={project.id} className="project-card">
            <img src={project.imageUrl} alt={project.title} className="project-image" />
            <div className="project-info">
              <h3>{project.title}</h3>
              <p>{project.description}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}