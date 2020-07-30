import React, { useRef } from "react";
import "./CheckedBox.css";

const ChedkedBox = (props) => {
  const { onInput } = props;
  const checkRef = useRef();
  const newbuttonRef = useRef();

  return (
    <div className='choice-pair'>
      <input
        id={props.id}
        type='radio'
        value={props.id}
        style={{ display: "none" }}
        ref={checkRef}
        name={props.name}
        onChange={(e) => {
          onInput(props.name, checkRef.current.value);
        }}
      ></input>
      <div
        ref={newbuttonRef}
        className='fake-checkbox'
        htmlFor={props.id}
        onClick={(e) => {
          checkRef.current.click();
        }}
      ></div>
      <label htmlFor={props.id}>{props.tytul}</label>
    </div>
  );
};
export default ChedkedBox;
