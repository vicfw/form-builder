import React from "react";

function Radiobox({ label, type, id, options }) {
  return (
    <>
      <div class="form-check" style={{ padding: "0" }}>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <label className="form-check-label" style={{ marginBottom: "6px" }}>
            {label}
          </label>
          <div style={{ marginRight: "21px" }}>
            <input
              class="form-check-input"
              type={type}
              value=""
              id={id}
              disabled
              readOnly
            />
            <label class="form-check-label" for={id}>
              {options}
            </label>
          </div>
        </div>
      </div>
    </>
  );
}

export default Radiobox;
