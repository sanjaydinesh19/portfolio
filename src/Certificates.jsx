import Navbar from "./components/Navbar/Navbar";
import "./Gallery.css";
import "./App.css"; 

function Certificates() {
  const certificates = [
    {
      title: "Supervised Machine Learning: Regression and Classification - Coursera",
      img: "/assets/certificates/ml1.png",
      pdf: "/assets/certificates/ml1.pdf"
    },
    {
      title: "Advanced Learning Algorithms - Coursera",
      img: "/assets/certificates/ml2.png",
      pdf: "/assets/certificates/ml2.pdf"
    },
    {
      title: "Unsupervised Learning, Recommenders, Reinforcement Learning - Coursera",
      img: "/assets/certificates/ml3.png",
      pdf: "/assets/certificates/ml3.pdf"
    }
  ];

  return (
    <>
  <Navbar />
  <div className="page-container">
    <div className="gallery-container">
      {certificates.map((cert, index) => (
        <a
          key={index}
          href={cert.pdf}
          target="_blank"
          rel="noopener noreferrer"
          className="gallery-card"
          style={{ animationDelay: `${index * 0.2}s` }}
        >
          <img src={cert.img} alt={cert.title} />
          <div className="gallery-card-content">
            <h3>{cert.title}</h3>
            <p>Click to view certificate</p>
          </div>
        </a>
      ))}
    </div>
  </div>
</>

  );
}

export default Certificates;
