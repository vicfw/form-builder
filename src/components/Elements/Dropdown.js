import React from "react";

function Dropdown(props) {
  return (
    <>
      <label>{props.label}</label>
      <select disabled className="form-control">
        {props.children}
      </select>
    </>
  );
}

export default Dropdown;
