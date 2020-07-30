import React, { useState, useRef, useReducer, useEffect } from "react";
import "./NavBar.css";
import Navs from "./Navs";
import Sidebar from "../Sidebar";
import { Link } from "react-router-dom";
const NavBar = () => {
  const buttonRef = useRef();
  const [sidebar, setSidebar] = useState();
  useEffect(() => {
    if (sidebar) {
      buttonRef.current.className = "menu-burger-active";
    } else {
      buttonRef.current.className = "menu-burger";
    }
  }, [sidebar]);
  return (
    <div className='main-nav'>
      <Sidebar show={sidebar} onCancel={() => setSidebar(false)}>
        <nav>
          <Navs />
        </nav>
      </Sidebar>
      <Link to='/'>
        {" "}
        <h2>OPONY JAND</h2>
      </Link>

      <div
        ref={buttonRef}
        className='menu-burger'
        onClick={(e) => {
          setSidebar(true);
        }}
      >
        <span />
        <span />
        <span />
      </div>
      <Navs />
    </div>
  );
};

export default NavBar;
