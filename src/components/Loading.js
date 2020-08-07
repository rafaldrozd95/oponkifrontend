import React from "react";
import ReactDOM from "react-dom";
import "./Loading.css";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

const Loading = (props) => {
  return ReactDOM.createPortal(
    <div className='backdrop' onClick={props.onCancel}>
      <AiOutlineLoading3Quarters className='loading-roll' />
    </div>,
    document.getElementById("backdrop-hook")
  );
};
export default Loading;
