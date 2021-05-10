import React, { useRef, useState, useEffect } from "react";
import "./sidebar.css";
import { Button, Form } from "react-bootstrap";
import { useStateValue } from "../../Context/FormContext";
import { v4 as uuidv4 } from "uuid";

function SiderBar({ elementId, type, handleClose, showSideBar }) {
  const label = useRef();
  const placehorlder = useRef();
  const [inputArr, setInputArr] = useState([]);
  const [state, dispatch] = useStateValue();

  useEffect(() => {
    dispatch({
      type: "DROPDOWN_OPTIONS",
      payload: inputArr,
    });
  }, [inputArr]);

  //generate options input
  const generateOptionInput = () => {
    setInputArr(perval => {
      return [
        ...perval,
        {
          id: elementId,
          holder: "",
          value: "",
          inputId: uuidv4(),
        },
      ];
    });
  };

  const handleOptions = (val, data) => {
    const idx = inputArr.findIndex(el => {
      return el.inputId === data;
    });

    let newInputArr = [...inputArr];
    newInputArr[idx] = { ...newInputArr[idx], holder: val };
    setInputArr(newInputArr);
  };

  const handleValues = (val, data) => {
    const idx = inputArr.findIndex(el => {
      return el.inputId === data;
    });
    let newInputArr = [...inputArr];
    newInputArr[idx] = { ...newInputArr[idx], value: val };
    setInputArr(newInputArr);
  };

  //render diffrent forms for diffrent elements
  const renderEditFrom = () => {
    if (type) {
      if (type.type === "text") {
        return (
          <Form>
            <Form.Group controlId="forname">
              <Form.Label>نام لیبل فیلد</Form.Label>
              <Form.Control
                ref={label}
                type="text"
                placeholder="نام لیبل فیلد را وارد کنید"
                onChange={e => {
                  dispatch({
                    type: "UPDATE_LABEL",
                    payload: { label: label.current.value },
                  });
                }}
              />
            </Form.Group>
            <Form.Group controlId="forplaceholder">
              <Form.Label>نام نگهدارنده فیلد</Form.Label>
              <Form.Control
                ref={placehorlder}
                type="text"
                placeholder="نام نگهدارنده فیلد را وارد کنید"
                onChange={e => {
                  dispatch({
                    type: "UPDATE_PLACEHOLDER",
                    payload: placehorlder.current.value,
                  });
                }}
              />
            </Form.Group>
          </Form>
        );
      }
      if (type.type === "dropdown") {
        return (
          <Form>
            <Form.Group controlId="forname">
              <Form.Label>نام لیبل فیلد</Form.Label>
              <Form.Control
                ref={label}
                type="text"
                value={label.current ? label.current.value : ""}
                placeholder="نام لیبل فیلد را وارد کنید"
                onChange={e => {
                  dispatch({
                    type: "UPDATE_LABEL",
                    payload: { label: label.current.value },
                  });
                }}
              />
            </Form.Group>
            <Form.Group>
              <div className="d-flex flex-column">
                <div className="d-flex align-items-center my-3">
                  <Button variant="success" onClick={generateOptionInput}>
                    جهت اضافه کردن گزینه کلیک کنید +
                  </Button>
                </div>

                {inputArr.map((item, i) => {
                  return (
                    item.id === elementId && (
                      <div
                        className="row my-3 d-flex align-items-center"
                        key={i}
                      >
                        <div className="col-md-8">
                          <Form.Label>نام جای نگهدارنده</Form.Label>
                          <Form.Control
                            data-id={item.inputId}
                            type="text"
                            value={item.holder || ""}
                            placeholder="نام گزینه فیلد را وارد کنید"
                            onChange={e =>
                              handleOptions(e.target.value, e.target.dataset.id)
                            }
                          />
                        </div>
                        <div className="col-md-3">
                          <Form.Label>مقدار</Form.Label>
                          <Form.Control
                            type="text"
                            data-id={item.inputId}
                            value={item.value || ""}
                            onChange={e =>
                              handleValues(e.target.value, e.target.dataset.id)
                            }
                          />
                        </div>
                        <div className="col-md-1">
                          <span>
                            <Button
                              className="mt-4"
                              variant="danger"
                              onClick={generateOptionInput}
                            >
                              حذف
                            </Button>
                          </span>
                        </div>
                      </div>
                    )
                  );
                })}
              </div>
            </Form.Group>
          </Form>
        );
      }
    }
  };

  const style = {
    position: "absolute",
    overflowY: "scroll",
    top: "0",
    left: "0",
    bottom: "0",
    zIndex: "99",
    width: "680px",
    height: "100%",
    backgroundColor: "#f5f3f3ed",
    transition: "all 0.4s ease-in",
    transform: !showSideBar ? "translateX(-100%)" : "translateX(0)",
  };

  return (
    <div style={style}>
      <div className="sidebar-wrapper">
        <span style={{ cursor: "pointer" }} onClick={handleClose}>
          X
        </span>
        {renderEditFrom()}
      </div>
    </div>
  );
}

export default SiderBar;
