import "./sidebar.css";
export default function Sidebar({ sideBarVisibility }) {
  return (
    <div
      className={`side-bar ${
        sideBarVisibility
          ? "side-bar-visible-position"
          : "side-bar-hidden-position"
      }`}
    >
      <a href="/" className="side-bar-button">
        Home
      </a>
      <a href="/assignments" className="side-bar-button">
        Assignments
      </a>
      <a href="/projects" className="side-bar-button">
        Projects
      </a>
      <a href="/contact" className="side-bar-button">
        Contact
      </a>
    </div>
  );
}
