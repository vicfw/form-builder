import React from "react";

function Datebox({ label }) {
  return (
    <div>
      <label>{label}</label>
      <input type="date" className="form-control" disabled readOnly />
    </div>
  );
}

export default Datebox;
