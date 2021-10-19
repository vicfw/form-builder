import React from "react";
import { Form } from "react-bootstrap";
function File(props) {
  return (
    <>
      <Form.File
        label={props.label}
        custom
        className="mt-4"
        data-browse="انتخاب کنید"
      />
    </>
  );
}

export default File;
