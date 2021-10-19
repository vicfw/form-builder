import React from "react";

function Multiselect(props) {
  return (
    <>
      <label>{props.label}</label>
      <select
        class="form-select form-control"
        multiple
        aria-label="multiple select"
        disabled
      >
        {props.children}
      </select>
    </>
  );
}

export default Multiselect;
