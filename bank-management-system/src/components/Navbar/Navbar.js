import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import st from "./style.module.css";
import { IoMenuOutline as MenuIcon } from "react-icons/io5";
import Sidebar from "../Sidebar/Sidebar";
import { useDispatch, useSelector } from "react-redux";
import { logoutAction } from "../../store/actions/AuthActions";

const Navbar = () => {
  const [openSidebar, setOpenSidebar] = useState(false);
  const [hideNavItem, setHideNavItem] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState();
  const navigate = useNavigate();
  
  const authenticated = useSelector((state) => state.auth.isAuthenticated);
 const dispatch=useDispatch();
const getUserName=useSelector((state)=> state.auth.user);
// console.log(getUserName.email);
  useEffect(() => {
    // console.log(authenticated);
    setIsAuthenticated(authenticated);
  }, [authenticated]);

  const sidebarOpen = () => {
    setOpenSidebar(true);
  };
  const sidebarClose = () => {
    setOpenSidebar(false);
  };

  const logoutClicked=()=>{
    setIsAuthenticated(false)
    dispatch(logoutAction());
    navigate("/")
  }
  // navbar link active style
  const linkStyle = ({ isActive }) => {
    return {
      textDecortion: isActive ? "underline" : "none",
      color: isActive ? "yellow" : "#fff",
      fontWeight: isActive ? "600" : "",
      fontSize: isActive ? "20px":"",
    };
  };
  return (
    <header>
      <div className={st.navbar}>
        {/* navbar logo */}
        <div className={st.logo}>
          <NavLink to="/">SD Bank</NavLink>
        </div>
        <NavLink to="/" style={linkStyle}>
          Home
        </NavLink>
        {/* {console.log(hideNavItem)} */}
        {/* navbar links */}
        {isAuthenticated === false ? (
          <div className={st.auth}>
            <NavLink to="/signin" className={st.login} style={linkStyle}>
              Login
            </NavLink>
            <span>/</span>
            <NavLink to="/signup" className={st.register}>
              Register
            </NavLink>
          </div>
        ) : (
          <div className={st.links}>
            <NavLink to="/loan" style={linkStyle}>
              Apply Loan
            </NavLink>
            <NavLink to="/deposite" style={linkStyle}>
              Deposite
            </NavLink>
            {/* <p>{getUserName.email}</p> */}
            <button type="submit" className={st.logout_btn} onClick={()=>logoutClicked()}>Logout</button>
          </div>
        )}
      
        {/* )} */}

        {/* navbar auth links */}

        {/* navbar menu btn */}
        <div className={st.menuBtn} onClick={sidebarOpen}>
          <MenuIcon size={30} />
        </div>
      </div>
      <Sidebar isOpen={openSidebar} sidebarClose={sidebarClose} />
    </header>
  );
};

export default Navbar;
