import React from "react";
import "./ModalInfo.css";
import ReactDOM from "react-dom";
import { CSSTransition } from "react-transition-group";

const ModalInfo = (props) => {
  const element = (
    <CSSTransition
      in={props.show}
      timeout={200}
      classNames='slide-in-top'
      mountOnEnter
      unmountOnExit
    >
      <div className={`modal-info ${props.classer}`}>
        <h1>{props.children}</h1>

        <div className={props.btn ? `${props.btn}` : `btn`}>
          <button className='btn' onClick={() => props.onCancel()}>
            OK
          </button>
        </div>
      </div>
    </CSSTransition>
  );
  return ReactDOM.createPortal(element, document.getElementById("modal-hook"));
};
export default ModalInfo;
