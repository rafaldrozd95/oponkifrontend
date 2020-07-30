import React from "react";
import "./Modal.css";
import ReactDOM from "react-dom";
import Backdrop from "./Backdrop";

const Modal = (props) => {
  const element = (
    <React.Fragment>
      <Backdrop onCancel={props.onCancel}></Backdrop>
      <div className='modal'>
        <img onClick={props.onCancel} src={`${props.image}`} alt='123' />
      </div>
    </React.Fragment>
  );
  return ReactDOM.createPortal(
    props.show && element,
    document.getElementById("modal-hook")
  );
};
export default Modal;
