import React from "react";
import "./ModalError.css";
import ReactDOM from "react-dom";
import { CSSTransition } from "react-transition-group";

const ModalError = (props) => {
  const element = (
    <CSSTransition
      in={props.show}
      timeout={200}
      classNames='slide-in-top'
      mountOnEnter
      unmountOnExit
    >
      <div className='modal-error'>
        <h1>{props.children}</h1>

        <div className='modal-options'>
          <button
            className='btn'
            onClick={(e) => {
              props.handleFunc(e);
              props.onCancel();
              props.history && props.history.push("/");
            }}
          >
            Tak
          </button>
          <button className='btn' onClick={() => props.onCancel()}>
            Nie
          </button>
        </div>
      </div>
    </CSSTransition>
  );
  return ReactDOM.createPortal(element, document.getElementById("modal-hook"));
};
export default ModalError;
