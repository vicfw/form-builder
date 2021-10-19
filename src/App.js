import { useEffect, useRef, useState } from "react";
import { Button } from "react-bootstrap";
import { v4 as uuidv4 } from "uuid";
import Box from "./components/Box/Box";
import Input from "./components/Elements/Input";
import SiderBar from "./components/Sidebar/SiderBar";
import File from "./components/Elements/File";
import SaveFileName from "./components/Others/SaveFileName";
import ElementsWrapper from "./components/Elements/ElementsWrapper/ElementsWrapper";
import Dropdown from "./components/Elements/Dropdown";
import Checkbox from "./components/Elements/Checkbox";
import Radiobox from "./components/Elements/Radiobox";
import Datebox from "./components/Elements/Datebox";
import TextArea from "./components/Elements/TextArea";
import Multiselect from "./components/Elements/Multiselect";
import Toast from "react-bootstrap/Toast";
import { IoTextOutline } from "react-icons/io5";
import { IoIosArrowDropdown, IoIosVideocam, IoMdPhotos } from "react-icons/io";
import { IoMdCheckboxOutline } from "react-icons/io";
import { IoMdRadioButtonOn } from "react-icons/io";
import { IoMdCalendar } from "react-icons/io";
import { IoLogoTumblr } from "react-icons/io";
import { IoIosPricetags } from "react-icons/io";
import DragGround from "./components/DragGround/DragGround";
import { useDispatch, useSelector } from "react-redux";
import { handleTypes } from "./redux/action";

function App() {
  const [type, setType] = useState([]);
  const [elementId, setElementId] = useState(null);
  const [showSideBar, setShowSideBar] = useState(false);
  const [jsonFile, setJsonFile] = useState(false);
  const { otherInputs, options } = useSelector(state => state);
  const [allBoxes] = useState([
    {
      name: "فیلد تکست",
      icon: <IoTextOutline style={{ fontSize: "23px" }} />,
      onDragEnd: () => {
        return setType(perval => [
          ...perval,
          {
            elementType: "text",
            id: uuidv4(),
            conceptId: 0,
            elementLabel: "لیبل",
            placeholder: "جای نگهدارنده",
            isRequired: false,
            isDisabeld: false,
          },
        ]);
      },
    },
    {
      name: "فیلد کرکره ای",
      icon: <IoIosArrowDropdown style={{ fontSize: "23px" }} />,
      onDragEnd: () => {
        setType(perval => [
          ...perval,
          {
            elementType: "dropdown",
            id: uuidv4(),
            elementLabel: "لیبل",
            isRequired: false,
            isDisabeld: false,
            options: [
              {
                id: "",
                holder: "جای نگهدارنده 1",
                value: "",
              },
            ],
          },
        ]);
      },
    },
    {
      name: "فیلد چک باکس",
      icon: <IoMdCheckboxOutline style={{ fontSize: "23px" }} />,
      onDragEnd: () => {
        setType(perval => [
          ...perval,
          {
            elementType: "checkbox",
            id: uuidv4(),
            isRequired: false,
            isDisabeld: false,
            elementLabel: "لیبل",
            options: [
              {
                id: uuidv4(),
                holder: "جای نگهدارنده 1",
                value: "",
              },
            ],
          },
        ]);
      },
    },
    {
      name: "فیلد چند انتخابی",
      icon: <IoMdRadioButtonOn style={{ fontSize: "23px" }} />,
      onDragEnd: () => {
        setType(perval => [
          ...perval,
          {
            elementType: "radio",
            id: uuidv4(),
            elementLabel: "لیبل",
            isRequired: false,
            isDisabeld: false,
            options: [
              {
                id: "",
                holder: "جای نگهدارنده 1",
                value: "",
              },
            ],
          },
        ]);
      },
    },
    {
      name: "فیلد تاریخ",
      icon: <IoMdCalendar style={{ fontSize: "23px" }} />,
      onDragEnd: () => {
        setType(perval => [
          ...perval,
          {
            elementType: "date",
            id: uuidv4(),
            elementLabel: "لیبل",
            isRequired: false,
            isDisabeld: false,
          },
        ]);
      },
    },
    {
      name: "فیلد تکست چند سطری",
      icon: <IoLogoTumblr style={{ fontSize: "23px" }} />,
      onDragEnd: () => {
        setType(perval => [
          ...perval,
          {
            elementType: "textarea",
            id: uuidv4(),
            isRequired: false,
            isDisabeld: false,
            elementLabel: "لیبل",
          },
        ]);
      },
    },
    {
      name: "فیلد چند انتخابی (تگ)",
      icon: <IoIosPricetags style={{ fontSize: "23px" }} />,
      onDragEnd: () => {
        setType(perval => [
          ...perval,
          {
            elementType: "multiselect",
            id: uuidv4(),
            elementLabel: "لیبل",
            isRequired: false,
            isDisabeld: false,
            options: [
              {
                id: "",
                holder: "جای نگهدارنده 1",
                value: "",
              },
            ],
          },
        ]);
      },
    },
    {
      name: "فیلد ارسال عکس",
      icon: <IoMdPhotos style={{ fontSize: "23px" }} />,
      onDragEnd: () => {
        setType(perval => [
          ...perval,
          {
            elementType: "image",
            id: uuidv4(),
            elementLabel: "لیبل",
            isRequired: false,
            isDisabeld: false,
          },
        ]);
      },
    },
    {
      name: "فیلد ارسال ویدیو",
      icon: <IoIosVideocam style={{ fontSize: "23px" }} />,
      onDragEnd: () => {
        setType(perval => [
          ...perval,
          {
            elementType: "video",
            id: uuidv4(),
            elementLabel: "لیبل",
            isRequired: false,
            isDisabeld: false,
          },
        ]);
      },
    },
    {
      name: "فیلد کرکره ای اتوماتیک",
      icon: <IoIosVideocam style={{ fontSize: "23px" }} />,
      onDragEnd: () => {
        setType(perval => [
          ...perval,
          {
            elementType: "fetch-dropdown",
            id: uuidv4(),
            elementLabel: "لیبل",
            isRequired: false,
            isDisabeld: false,
          },
        ]);
      },
    },
  ]);

  const dispatch = useDispatch();
  const inputForFileName = useRef();

  //remove a input field
  const handleRemove = index => {
    const removed = type.filter((k, i) => {
      return index !== i;
    });
    setType(removed);
  };

  //edit a text input field
  useEffect(() => {
    //edit text fields
    if (elementId) {
      const update = type.filter(item => {
        return item.id === elementId;
      });

      const other = otherInputs.filter(item => {
        return item.id === elementId;
      });
      if (update[0]) {
        update[0].elementLabel = other[0].elementLabel;
        update[0].placeholder = other[0].placeholder;
        update[0].isRequired = other[0].isRequired;
        const index = type.findIndex(el => el.id === elementId);
        let arr = [...type];
        arr[index] = update[0];
        setType(arr);
      }
    }
  }, [otherInputs]);

  //edit options for select box radio and checkboxes
  useEffect(() => {
    const update = type.filter(item => {
      return item.id === elementId;
    });
    if (update.length > 0) {
      if (update[0].id === elementId) {
        const b = options.filter(el => {
          return el.id === elementId;
        });
        const newUpdateArr = { ...update[0] };
        newUpdateArr.options = b;
        const index = type.findIndex(el => el.id === elementId);
        let result = [...type];
        result[index] = newUpdateArr;
        setType(result);
      }
    }
  }, [options]);

  //change input required field text
  useEffect(() => {
    inputForFileName.current.oninvalid = function (e) {
      e.target.setCustomValidity("وارد کردن نام فرم الزامی است !");
    };

    inputForFileName.current.oninput = function (e) {
      e.target.setCustomValidity("");
    };
  }, []);

  useEffect(() => {
    dispatch(handleTypes(type));
  }, [type]);

  const handleEdit = id => {
    setShowSideBar(true);
    setElementId(id);
  };

  const handleSidBarClose = () => [setShowSideBar(false)];

  //function for render field boxes
  const renderAllBoxes = () => (
    <>
      {allBoxes.map(box => {
        return (
          <Box name={box.name} icon={box.icon} onDragEnd={box.onDragEnd} />
        );
      })}
    </>
  );

  //function for render all inputs at main page
  const renderAllInputs = () =>
    type.length > 0 &&
    type.map((item, index) => {
      if (item.elementType === "text") {
        return (
          <ElementsWrapper
            key={item.id}
            id={index}
            handleRemove={handleRemove.bind(null, index)}
            handleEdit={handleEdit.bind(null, item.id)}
          >
            <Input
              placeholder={item.placeholder}
              label={item.elementLabel}
              id={index}
              elementType={item.elementType}
            />
          </ElementsWrapper>
        );
      }
      if (item.elementType === "dropdown") {
        return (
          <ElementsWrapper
            key={item.id}
            id={index}
            handleRemove={handleRemove.bind(null, index)}
            handleEdit={handleEdit.bind(null, item.id)}
          >
            <Dropdown id={item.id} label={item.elementLabel}>
              {item.options.map((option, index) => {
                return (
                  <option key={index} value={option.value}>
                    {option.holder}
                  </option>
                );
              })}
            </Dropdown>
          </ElementsWrapper>
        );
      }
      if (item.elementType === "checkbox") {
        return (
          <ElementsWrapper
            key={item.id}
            id={index}
            handleRemove={handleRemove.bind(null, index)}
            handleEdit={handleEdit.bind(null, item.id)}
          >
            <label style={{ marginBottom: "0" }}>{item.elementLabel}</label>
            {item.options.map(el => {
              return (
                <Checkbox
                  type={item.elementType}
                  values={el.value}
                  options={el.holder}
                  id={item.id}
                />
              );
            })}
          </ElementsWrapper>
        );
      }
      if (item.elementType === "radio") {
        return (
          <ElementsWrapper
            key={item.id}
            id={index}
            handleRemove={handleRemove.bind(null, index)}
            handleEdit={handleEdit.bind(null, item.id)}
          >
            <label style={{ marginBottom: "0" }}>{item.elementLabel}</label>
            {item.options.map(el => {
              return (
                <Radiobox
                  type={item.elementType}
                  options={el.holder}
                  values={el.value}
                  id={item.id}
                />
              );
            })}
          </ElementsWrapper>
        );
      }
      if (item.elementType === "date") {
        return (
          <ElementsWrapper
            key={item.id}
            id={index}
            handleRemove={handleRemove.bind(null, index)}
            handleEdit={handleEdit.bind(null, item.id)}
          >
            <Datebox label={item.elementLabel} />
          </ElementsWrapper>
        );
      }
      if (item.elementType === "textarea") {
        return (
          <ElementsWrapper
            key={item.id}
            id={index}
            handleRemove={handleRemove.bind(null, index)}
            handleEdit={handleEdit.bind(null, item.id)}
          >
            <TextArea label={item.elementLabel} />
          </ElementsWrapper>
        );
      }
      if (item.elementType === "multiselect") {
        return (
          <ElementsWrapper
            key={item.id}
            id={index}
            handleRemove={handleRemove.bind(null, index)}
            handleEdit={handleEdit.bind(null, item.id)}
          >
            <Multiselect id={item.id} label={item.elementLabel}>
              {item.options.map((option, index) => {
                return (
                  <option key={index} value={option.value}>
                    {option.holder}
                  </option>
                );
              })}
            </Multiselect>
          </ElementsWrapper>
        );
      }
      if (item.elementType === "image") {
        return (
          <ElementsWrapper
            key={item.id}
            id={index}
            handleRemove={handleRemove.bind(null, index)}
            handleEdit={handleEdit.bind(null, item.id)}
          >
            <File
              id={item.id}
              label={item.elementLabel}
              type={item.elementType}
            />
          </ElementsWrapper>
        );
      }
      if (item.elementType === "video") {
        return (
          <ElementsWrapper
            key={item.id}
            id={index}
            handleRemove={handleRemove.bind(null, index)}
            handleEdit={handleEdit.bind(null, item.id)}
          >
            <File
              id={item.id}
              label={item.elementLabel}
              type={item.elementType}
            />
          </ElementsWrapper>
        );
      }
      return null;
    });

  return (
    <>
      <div className="container py-5  ">
        <div className="row">
          <div className="col-md-4">
            <h5 className="mb-3 toolbox-header">باکس فیلد ها</h5>
            <div className="toolbox-container">{renderAllBoxes()}</div>
          </div>
          <div className="col-md-8">
            <div className=" bg-light form-playground shadow-sm rounded p-5">
              {type.length === 0 ? (
                <p className="text-center">
                  لطفا فرم مورد نظر خود را ایجاد کنید
                </p>
              ) : null}

              <DragGround />
              {renderAllInputs()}
            </div>
            <form
              onSubmit={e => {
                e.preventDefault();
                if (type.length > 0) {
                  const newArr = type.map((el, index) => {
                    if (!el.name) el.name = `${el.type}-${index}`;
                    return null;
                  });
                  if (!newArr) {
                    setType(perval => {
                      return [...perval, newArr];
                    });
                  }
                }

                let jsonFile = {};
                jsonFile.fileName = inputForFileName.current.value;
                jsonFile.formId = uuidv4();
                jsonFile.elements = type;

                const json = JSON.stringify(jsonFile);

                localStorage.setItem("form-json", json);
                if (localStorage.getItem("form-json")) {
                  setJsonFile(true);
                }
              }}
              className=" row align-items-center mt-4"
            >
              <Button type="submit" variant="dark" className="col-md-3">
                ذخیره
              </Button>
              <div className="col-md-9 filename-input-container">
                <SaveFileName refProp={inputForFileName} />
              </div>
            </form>
          </div>
        </div>

        <SiderBar
          elementId={elementId}
          type={type}
          handleClose={handleSidBarClose}
          showSideBar={showSideBar}
        />

        <div
          style={{
            position: "absolute",
            top: "50px",
            right: "100px",
          }}
        >
          <Toast
            show={jsonFile}
            delay={5000}
            onClose={() => setJsonFile(false)}
            autohide
          >
            <Toast.Body>فرم با موفقیت در LocalStorage ذخیره شد !</Toast.Body>
          </Toast>
        </div>
      </div>
    </>
  );
}

export default App;
