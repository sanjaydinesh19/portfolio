import { useEffect, useRef } from "react";
import Navbar from "./components/Navbar/Navbar";
import "./Experience.css";

const experiences = [
  {
    org: "Dreadnought Robotics",
    role: "Programming Team Member",
    period: "Apr 2024 – Present",
    side: "left",
    bullets: [
      "Competition AUV programming for SAUVC 2025, 2026 & TAC 2026",
      "YOLOv8 · MobileNetV2SSD · ArUco Docking · Pipeline Detection",
      "Control & path planning — PD, A*, LSRB in C++ / Python",
    ],
    image: "/assets/experience/MIRA.png",
    imageAlt: "MIRA AUV",
    accent: "#00b4d8",
  },
  {
    org: "Microsoft Innovations Club",
    role: "AIML Lead",
    period: "Apr 2025 – Apr 2026",
    side: "right",
    bullets: [
      "Built & deployed AI Resume Builder and AI Academic Assistant",
      "Mentored peers in ML, Python & MLOps",
    ],
    image: "/assets/experience/MICProject.png",
    imageAlt: "MIC AI Projects",
    accent: "#006cff",
  },
  {
    org: "AUV Club, VIT Chennai",
    role: "President",
    period: "Jul 2025 – Present",
    side: "left",
    bullets: [
      "Leading events that teach the full robot development pipeline",
      "Bridging academic theory and hands-on robotics",
    ],
    image: null,
    accent: "#8a2be2",
  },
];

export default function Experience() {
  const entryRefs = useRef([]);

  useEffect(() => {
    const observers = entryRefs.current.map((el) => {
      if (!el) return null;
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            el.classList.add("is-visible");
            obs.disconnect();
          }
        },
        { threshold: 0.15 }
      );
      obs.observe(el);
      return obs;
    });
    return () => observers.forEach((o) => o?.disconnect());
  }, []);

  return (
    <>
      <Navbar />
      <div className="experience-page">
        <h1 className="experience-heading">Experience</h1>
        <div className="timeline">
          <div className="timeline-track" />
          {experiences.map((exp, i) => (
            <div
              key={i}
              className={`timeline-entry ${exp.side}`}
              ref={(el) => (entryRefs.current[i] = el)}
            >
              <div className="entry-card" style={{ "--accent": exp.accent }}>
                {exp.image && (
                  <div className="entry-image-wrap">
                    <img src={exp.image} alt={exp.imageAlt} className="entry-image" />
                    <div className="entry-image-overlay" />
                  </div>
                )}
                <div className="entry-content">
                  <span className="entry-period">{exp.period}</span>
                  <h2 className="entry-org" style={{ color: exp.accent }}>{exp.org}</h2>
                  <h3 className="entry-role">{exp.role}</h3>
                  <ul className="entry-bullets">
                    {exp.bullets.map((b, j) => (
                      <li key={j}>{b}</li>
                    ))}
                  </ul>
                </div>
              </div>
              <div className="entry-dot" style={{ background: exp.accent, boxShadow: `0 0 12px ${exp.accent}` }} />
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
