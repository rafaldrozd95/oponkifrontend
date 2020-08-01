import React, { useState, useEffect } from "react";

const Input = (props) => {
  const { onInput, id } = props;
  const [value, setValue] = useState();
  const handleInputChange = (e) => {
    setValue(e.target.value);
  };

  useEffect(
    function () {
      onInput(id, value);
    },
    [value, onInput, id]
  );
  const element =
    props.element === "text" ? (
      <input
        type='text'
        defaultValue={props.def ? props.def : ""}
        onChange={handleInputChange}
      ></input>
    ) : props.element === "textarea" ? (
      <textarea
        rows={props.rows || "10"}
        defaultValue={props.def ? props.def : ""}
        onChange={handleInputChange}
      ></textarea>
    ) : props.element === "password" ? (
      <input type='password' onChange={handleInputChange}></input>
    ) : (
      <select name='type' onChange={handleInputChange}>
        <option value='' selected disabled hidden>
          Wybierz
        </option>
        {props.options.map((el, index) => (
          <option key={index} value={el}>
            {el}
          </option>
        ))}
      </select>
    );
  return element;
};

export default Input;
