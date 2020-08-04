import React, { useState, useEffect } from "react";
import "./Modal.css";
import ReactDOM from "react-dom";
import Backdrop from "./Backdrop";
import {
  AiOutlineArrowLeft,
  AiOutlineArrowRight,
  AiOutlineClose,
} from "react-icons/ai";

const Modal = (props) => {
  const { image, number } = props;
  const [site, setSite] = useState();
  useEffect(() => {
    setSite(number);
  }, [number]);
  const element = (
    <React.Fragment>
      <Backdrop onCancel={props.onCancel}></Backdrop>
      <div className='modal'>
        <img
          src={`${process.env.REACT_APP_API_URL}/${props.image[site]}`}
          alt='123'
        />

        <div className='arrow'>
          <div className='arrow-content'>
            <AiOutlineArrowLeft
              onClick={() => {
                if (site > 0) {
                  setSite(site - 1);
                } else {
                  setSite(image.length - 1);
                  console.log(image.length - 1);
                }
              }}
              className='arrow-child'
            />
            <AiOutlineArrowRight
              onClick={() => {
                if (site < 3) {
                  setSite(site + 1);
                } else {
                  setSite(0);
                }
              }}
              className='arrow-child'
            />
          </div>
        </div>
        <AiOutlineClose className='ex' onClick={props.onCancel} />
      </div>
    </React.Fragment>
  );
  return ReactDOM.createPortal(
    props.show && element,
    document.getElementById("modal-hook")
  );
};
export default Modal;
