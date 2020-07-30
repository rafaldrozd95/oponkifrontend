import React from "react";
import "./Sidebar.css";
import ReactDOM from "react-dom";
import Backdrop from "./Backdrop";
import { CSSTransition } from "react-transition-group";

const Sidebar = (props) => {
  const element = (
    <React.Fragment>
      {props.show && <Backdrop onCancel={props.onCancel}></Backdrop>}
      <CSSTransition
        in={props.show}
        timeout={200}
        classNames='slide-in-left'
        mountOnEnter
        unmountOnExit
      >
        <aside className='sidebar' onClick={props.onCancel}>
          {props.children}
        </aside>
      </CSSTransition>
    </React.Fragment>
  );
  return ReactDOM.createPortal(element, document.getElementById("modal-hook"));
};
export default Sidebar;
