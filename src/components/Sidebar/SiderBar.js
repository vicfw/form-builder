import React, { useState, useEffect } from "react";
import "./sidebar.css";
import { Button, Form } from "react-bootstrap";
import { v4 as uuidv4 } from "uuid";
import { useDispatch } from "react-redux";
import { addDropdownOptions, addOtherInputs } from "../../redux/action";

function SiderBar({ elementId, type, handleClose, showSideBar }) {
  const [inputArr, setInputArr] = useState([]);
  const [inputs, setInputs] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(addDropdownOptions(inputArr));
  }, [inputArr]);

  //create initial data for other inputs

  useEffect(() => {
    if (elementId) {
      setInputs(perval => {
        return [
          ...perval,
          {
            id: elementId,
            inputId: uuidv4(),
            elementLabel: "",
            placeholder: "",
            isRequired: false,
            isDisabled: false,
          },
        ];
      });
    }
  }, [elementId]);

  useEffect(() => {
    dispatch(addOtherInputs(inputs));
  }, [inputs]);

  const newArr = [...inputs];

  const filterArrForInputs = newArr.filter(
    (item, index, self) => index === self.findIndex(t => t.id === item.id),
  );

  //generate initial data options input

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

  //handle options for option input
  const handleOptions = (val, data) => {
    const idx = inputArr.findIndex(el => {
      return el.inputId === data;
    });

    let newInputArr = [...inputArr];
    newInputArr[idx] = { ...newInputArr[idx], holder: val };
    setInputArr(newInputArr);
  };

  //handle values for option input

  const handleValues = (val, data) => {
    const idx = inputArr.findIndex(el => {
      return el.inputId === data;
    });
    let newInputArr = [...inputArr];
    newInputArr[idx] = { ...newInputArr[idx], value: val };
    setInputArr(newInputArr);
  };

  //handle label input

  const handleLabelChange = (val, data) => {
    const idx = filterArrForInputs.findIndex(el => {
      return el.inputId === data;
    });
    let newInputArr = [...filterArrForInputs];
    newInputArr[idx] = { ...filterArrForInputs[idx], elementLabel: val };
    setInputs(newInputArr);
  };

  //handle placeholder input

  const handlePlaceholderChange = (val, data) => {
    const idx = filterArrForInputs.findIndex(el => {
      return el.inputId === data;
    });
    let newInputArr = [...filterArrForInputs];
    newInputArr[idx] = { ...filterArrForInputs[idx], placeholder: val };
    setInputs(newInputArr);
  };

  //handle required input

  const handleRequiredChange = (val, data) => {
    const idx = filterArrForInputs.findIndex(el => {
      return el.inputId === data;
    });
    let newInputArr = [...filterArrForInputs];
    newInputArr[idx] = { ...filterArrForInputs[idx], isRequired: val };
    setInputs(newInputArr);
  };

  //handle disabled input

  const handleDisabledChange = (val, data) => {
    const idx = filterArrForInputs.findIndex(el => {
      return el.inputId === data;
    });
    let newInputArr = [...filterArrForInputs];
    newInputArr[idx] = { ...filterArrForInputs[idx], isDisabled: val };
    setInputs(newInputArr);
  };

  //handle removing option and value inputs

  const removeOptionInput = id => {
    const removedArr = inputArr.filter(element => {
      return element.inputId !== id;
    });
    setInputArr(removedArr);
  };

  //render diffrent forms for diffrent elements
  const renderEditFrom = () => {
    if (type) {
      let es = type.filter(el => {
        return el.id === elementId;
      });
      return es.map((element, index) => {
        if (element.elementType === "text") {
          return filterArrForInputs.map(item => {
            return (
              item.id === elementId && (
                <Form>
                  <Form.Group controlId={element.id}>
                    <Form.Label>نام لیبل فیلد</Form.Label>
                    <Form.Control
                      data-id={item.inputId}
                      type="text"
                      value={item.elementLabel || ""}
                      placeholder="نام لیبل فیلد را وارد کنید"
                      onChange={e =>
                        handleLabelChange(e.target.value, e.target.dataset.id)
                      }
                    />
                  </Form.Group>
                  <Form.Group controlId="forplaceholder">
                    <Form.Label>نام نگهدارنده فیلد</Form.Label>
                    <Form.Control
                      type="text"
                      data-id={item.inputId}
                      value={item.placeholder || ""}
                      placeholder="نام نگهدارنده فیلد را وارد کنید"
                      onChange={e => {
                        handlePlaceholderChange(
                          e.target.value,
                          e.target.dataset.id,
                        );
                      }}
                    />
                  </Form.Group>
                  <Form.Group controlId="forcheckbox">
                    <Form.Label className="m-0">
                      آیا فیلد ضروری است ؟
                    </Form.Label>
                    <Form.Check
                      type="checkbox"
                      data-id={item.inputId}
                      onClick={e => {
                        handleRequiredChange(
                          e.target.checked,
                          e.target.dataset.id,
                        );
                      }}
                    />
                  </Form.Group>
                  <Form.Group controlId="fordisabled">
                    <Form.Label className="m-0">
                      آیا فیلد غیر فعال شود ؟
                    </Form.Label>
                    <Form.Check
                      type="checkbox"
                      data-id={item.inputId}
                      onClick={e => {
                        handleDisabledChange(
                          e.target.checked,
                          e.target.dataset.id,
                        );
                      }}
                    />
                  </Form.Group>
                </Form>
              )
            );
          });
        }
        if (element.elementType === "dropdown") {
          return filterArrForInputs.map(item => {
            return (
              item.id === elementId && (
                <Form>
                  <Form.Group controlId={element.id}>
                    <Form.Label>نام لیبل فیلد</Form.Label>
                    <Form.Control
                      data-id={item.inputId}
                      type="text"
                      value={item.elementLabel || ""}
                      placeholder="نام لیبل فیلد را وارد کنید"
                      onChange={e =>
                        handleLabelChange(e.target.value, e.target.dataset.id)
                      }
                    />
                  </Form.Group>
                  <Form.Group controlId="forcheckbox">
                    <Form.Label className="m-0">
                      آیا فیلد ضروری است ؟
                    </Form.Label>
                    <Form.Check
                      type="checkbox"
                      data-id={item.inputId}
                      onClick={e => {
                        handleRequiredChange(
                          e.target.checked,
                          e.target.dataset.id,
                        );
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
                                    handleOptions(
                                      e.target.value,
                                      e.target.dataset.id,
                                    )
                                  }
                                />
                              </div>
                              <div className="col-md-2">
                                <Form.Label>مقدار</Form.Label>
                                <Form.Control
                                  type="text"
                                  data-id={item.inputId}
                                  value={item.value || ""}
                                  onChange={e =>
                                    handleValues(
                                      e.target.value,
                                      e.target.dataset.id,
                                    )
                                  }
                                />
                              </div>
                              <div className="col-md-2">
                                <span>
                                  <Button
                                    style={{ marginTop: "37px" }}
                                    variant="danger"
                                    onClick={() =>
                                      removeOptionInput(item.inputId)
                                    }
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
              )
            );
          });
        }
        if (element.elementType === "checkbox") {
          return filterArrForInputs.map(item => {
            return (
              item.id === elementId && (
                <Form>
                  <Form.Group controlId={element.id}>
                    <Form.Label>نام لیبل فیلد</Form.Label>
                    <Form.Control
                      data-id={item.inputId}
                      type="text"
                      value={item.elementLabel || ""}
                      placeholder="نام لیبل فیلد را وارد کنید"
                      onChange={e =>
                        handleLabelChange(e.target.value, e.target.dataset.id)
                      }
                    />
                  </Form.Group>
                  <Form.Group controlId="forcheckbox">
                    <Form.Label className="m-0">
                      آیا فیلد ضروری است ؟
                    </Form.Label>
                    <Form.Check
                      type="checkbox"
                      data-id={item.inputId}
                      onClick={e => {
                        handleRequiredChange(
                          e.target.checked,
                          e.target.dataset.id,
                        );
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
                                    handleOptions(
                                      e.target.value,
                                      e.target.dataset.id,
                                    )
                                  }
                                />
                              </div>
                              <div className="col-md-2">
                                <span>
                                  <Button
                                    style={{ marginTop: "37px" }}
                                    variant="danger"
                                    onClick={() =>
                                      removeOptionInput(item.inputId)
                                    }
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
              )
            );
          });
        }
        if (element.elementType === "radio") {
          return filterArrForInputs.map(item => {
            return (
              item.id === elementId && (
                <Form>
                  <Form.Group controlId={element.id}>
                    <Form.Label>نام لیبل فیلد</Form.Label>
                    <Form.Control
                      data-id={item.inputId}
                      type="text"
                      value={item.elementLabel || ""}
                      placeholder="نام لیبل فیلد را وارد کنید"
                      onChange={e =>
                        handleLabelChange(e.target.value, e.target.dataset.id)
                      }
                    />
                  </Form.Group>
                  <Form.Group controlId="forcheckbox">
                    <Form.Label className="m-0">
                      آیا فیلد ضروری است ؟
                    </Form.Label>
                    <Form.Check
                      type="checkbox"
                      data-id={item.inputId}
                      onClick={e => {
                        handleRequiredChange(
                          e.target.checked,
                          e.target.dataset.id,
                        );
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
                                    handleOptions(
                                      e.target.value,
                                      e.target.dataset.id,
                                    )
                                  }
                                />
                              </div>
                              <div className="col-md-2">
                                <span>
                                  <Button
                                    style={{ marginTop: "37px" }}
                                    variant="danger"
                                    onClick={() =>
                                      removeOptionInput(item.inputId)
                                    }
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
              )
            );
          });
        }
        if (element.elementType === "multiselect") {
          return filterArrForInputs.map(item => {
            return (
              item.id === elementId && (
                <Form>
                  <Form.Group controlId={element.id}>
                    <Form.Label>نام لیبل فیلد</Form.Label>
                    <Form.Control
                      data-id={item.inputId}
                      type="text"
                      value={item.elementLabel || ""}
                      placeholder="نام لیبل فیلد را وارد کنید"
                      onChange={e =>
                        handleLabelChange(e.target.value, e.target.dataset.id)
                      }
                    />
                  </Form.Group>
                  <Form.Group controlId="forcheckbox">
                    <Form.Label className="m-0">
                      آیا فیلد ضروری است ؟
                    </Form.Label>
                    <Form.Check
                      type="checkbox"
                      data-id={item.inputId}
                      onClick={e => {
                        handleRequiredChange(
                          e.target.checked,
                          e.target.dataset.id,
                        );
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
                                    handleOptions(
                                      e.target.value,
                                      e.target.dataset.id,
                                    )
                                  }
                                />
                              </div>
                              <div className="col-md-2">
                                <Form.Label>مقدار</Form.Label>
                                <Form.Control
                                  type="text"
                                  data-id={item.inputId}
                                  value={item.value || ""}
                                  onChange={e =>
                                    handleValues(
                                      e.target.value,
                                      e.target.dataset.id,
                                    )
                                  }
                                />
                              </div>
                              <div className="col-md-2">
                                <span>
                                  <Button
                                    style={{ marginTop: "37px" }}
                                    variant="danger"
                                    onClick={() =>
                                      removeOptionInput(item.inputId)
                                    }
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
              )
            );
          });
        }
        if (element.elementType === "image" || "video" || "date") {
          return filterArrForInputs.map(item => {
            return (
              item.id === elementId && (
                <Form>
                  <Form.Group controlId={element.id}>
                    <Form.Label>نام لیبل فیلد</Form.Label>
                    <Form.Control
                      data-id={item.inputId}
                      type="text"
                      value={item.elementLabel || ""}
                      placeholder="نام لیبل فیلد را وارد کنید"
                      onChange={e =>
                        handleLabelChange(e.target.value, e.target.dataset.id)
                      }
                    />
                  </Form.Group>
                </Form>
              )
            );
          });
        }
      });
    }
  };

  const style = {
    position: "absolute",
    overflowY: "scroll",
    top: "0",
    left: "0",
    bottom: "0",
    zIndex: "10000",
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
