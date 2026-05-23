import { useLocation } from "react-router-dom";
import "./sidebar.css";

const links = [
  { label: "Home",         path: "/" },
  { label: "Experience",   path: "/experience" },
  { label: "Projects",     path: "/projects" },
  { label: "Certificates", path: "/certificates" },
  { label: "Contact",      path: "/contact" },
];

export default function Sidebar({ sideBarVisibility, onClose }) {
  const { pathname } = useLocation();

  return (
    <div className={`side-bar ${sideBarVisibility ? "side-bar-visible-position" : "side-bar-hidden-position"}`}>
      {links.map(({ label, path }) => (
        <a
          key={path}
          href={path}
          onClick={onClose}
          className={`side-bar-button ${pathname === path ? "active" : ""}`}
        >
          {label}
        </a>
      ))}
    </div>
  );
}
