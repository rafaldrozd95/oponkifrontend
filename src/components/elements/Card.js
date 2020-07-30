import React from "react";
import "./Card.css";
const Card = (props) => {
  return (
    <div className='card'>
      <img src={props.image}></img>
      <h3>{props.title}</h3>
      <p>{props.children}</p>
    </div>
  );
};
export default Card;
