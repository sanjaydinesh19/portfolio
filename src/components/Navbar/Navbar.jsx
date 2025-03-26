import "./navbar.css";
import menuIcon from "../../assets/menu.png";
import Sidebar from "../Sidebar/Sidebar";
import { useState } from "react";
export default function Navbar() {
  const [sideBarVisibility, setSidebarVisibility] = useState(false);
  return (
    <>
      <div className="navbar-container">
        <div className="navbar-left-section">SD</div>
        <div className="navbar-right-section">
          <div
            onClick={() => {
              setSidebarVisibility(!sideBarVisibility);
            }}
          >
            <img className="menu-icon" src={menuIcon} alt="" />
          </div>
        </div>
      </div>
      <Sidebar sideBarVisibility={sideBarVisibility} />
    </>
  );
}
