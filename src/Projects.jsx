import Navbar from "./components/Navbar/Navbar";
import "./Gallery.css";
import "./App.css"; 

function Projects() {
  const projects = [
    {
      title: "Portfolio Website",
      img: "/assets/projects/portfolio.png",
      link: "https://github.com/sanjaydinesh19/portfolio",
      desc: "This portfolio website built with React and custom UI."
    }
  ];

  return (
    <>
  <Navbar />
  <div className="page-container">
    <div className="gallery-container">
      {projects.map((project, index) => (
        <a
          key={index}
          href={project.link}
          target="_blank"
          rel="noopener noreferrer"
          className="gallery-card"
          style={{ animationDelay: `${index * 0.2}s` }}
        >
          <img src={project.img} alt={project.title} />
          <div className="gallery-card-content">
            <h3>{project.title}</h3>
            <p>{project.desc}</p>
          </div>
        </a>
      ))}
    </div>
  </div>
</>

  );
}

export default Projects;
