import React from "react";

function Input(props) {
  return (
    <>
      <label htmlFor={props.id}>{props.label}</label>
      <input
        readOnly
        disabled
        id={props.id}
        type={props.type}
        placeholder={props.placeholder}
        className="form-control"
      />
    </>
  );
}

export default Input;
