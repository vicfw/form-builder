import React from "react";

function SaveFileName({ refProp }) {
  return (
    <div class="input-group">
      <span class="input-group-text" id="basic-addon1">
        نام فایل
      </span>
      <input
        type="text"
        className="form-control"
        id="filename"
        placeholder="نام فرم ایجاد شده را وارد نمایید"
        ref={refProp}
        required
      />
    </div>
  );
}

export default SaveFileName;
