import React from "react";

function TextArea(props) {
  return (
    <>
      <label>{props.label}</label>
      <textarea disabled readOnly className="form-control" />
    </>
  );
}

export default TextArea;
