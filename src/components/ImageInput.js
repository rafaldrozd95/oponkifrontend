import React, { useState, useRef } from "react";
const ImageInput = (props) => {
  const [image, setImage] = useState();
  const inputRef = useRef();
  const handleImage = (e) => {
    const pickedFile = e.target.files;
    setImage(pickedFile);
    props.onInput(props.id, pickedFile);
  };
  return (
    <div className='photo'>
      <button
        className='btn'
        onClick={(e) => {
          e.preventDefault();
          inputRef.current.click();
        }}
      >
        {props.namiusz}
      </button>
      <input
        ref={inputRef}
        id={props.id}
        style={{ display: "none" }}
        multiple
        type='file'
        defaultValue={props.def ? props.def : ""}
        accept='.jpg,.png,.jpeg'
        onChange={handleImage}
      ></input>
    </div>
  );
};
export default ImageInput;
