import React from "react";
import sty from "./styles.module.css";
import { IoClose as CloseIcon } from "react-icons/io5";
import { NavLink } from "react-router-dom";

const Sidebar = ({ isOpen, sidebarClose }) => {

    const linkStyle=({isActive})=>{
        return {
            textDecortion: isActive ? "underline" : "none",
            color: isActive ? "green" : "#fff",
            fontWeight: isActive ? "600" : ""
        }
    }
  return (
    <div className={`${sty.sidebar} ${isOpen && sty.open}`}>
      <span className={sty.closeIcon} onClick={sidebarClose}>
        <CloseIcon size={30} />
      </span>
      {/* navbar links */}
      <div className={sty.links}>
        <NavLink to="/" style={linkStyle} onClick={sidebarClose}>
          Home
        </NavLink>
        <NavLink to="/loan" style={linkStyle} onClick={sidebarClose}>
          Applay Loan
        </NavLink>
        <NavLink to="/deposite" style={linkStyle} onClick={sidebarClose}>
          Deposite
        </NavLink>
      </div>
      {/* navbar auth links */}
      <div className={sty.auth}>
        <NavLink to="/login" className={sty.login} style={linkStyle} onClick={sidebarClose}>
          Login
        </NavLink>
        <NavLink to="/signup" className={sty.register} onClick={sidebarClose}>
          Signup
        </NavLink>
      </div>
    </div>
  );
};

export default Sidebar;
