import React from "react";
import "./Box.css";

function Box({ name, onClick, style }) {
  return (
    <div className="box" onClick={onClick} style={style}>
      <span>{name}</span>
    </div>
  );
}

export default Box;
