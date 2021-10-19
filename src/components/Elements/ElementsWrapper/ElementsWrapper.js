import React from "react";
import "./elementsWrapper.css";
import { IoIosRemoveCircleOutline } from "react-icons/io";
import { BiCalendarEdit } from "react-icons/bi";
import { OverlayTrigger } from "react-bootstrap";
import { Tooltip } from "react-bootstrap";
function ElementsWrapper({ id, handleRemove, children, handleEdit }) {
  return (
    <div className="elements-wrapper">
      <div className="icons-wrapper">
        <OverlayTrigger
          placement="bottom"
          delay={{ show: 250, hide: 400 }}
          overlay={<Tooltip id={id}>حذف</Tooltip>}
        >
          <span onClick={handleRemove} style={{ cursor: "pointer" }}>
            <IoIosRemoveCircleOutline
              style={{ fontSize: "25px", marginLeft: "10px" }}
            />
          </span>
        </OverlayTrigger>
        <OverlayTrigger
          placement="bottom"
          delay={{ show: 250, hide: 400 }}
          overlay={<Tooltip id={id}>ویرایش</Tooltip>}
        >
          <span style={{ cursor: "pointer" }} onClick={handleEdit}>
            <BiCalendarEdit style={{ fontSize: "25px" }} />
          </span>
        </OverlayTrigger>
      </div>
      {children}
    </div>
  );
}

export default ElementsWrapper;
