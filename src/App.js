import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import "./App.css";
import Box from "./components/Box/Box";
import ElementsWrapper from "./components/Elements/ElementsWrapper/ElementsWrapper";
import Input from "./components/Elements/Input";
import SiderBar from "./components/Sidebar/SiderBar";
import { useStateValue } from "./Context/FormContext";
import { v4 as uuidv4 } from "uuid";
import Dropdown from "./components/Elements/Dropdown";

function App(props) {
  const [type, setType] = useState([]);
  const [typeForEdit, setTypeForEdit] = useState(null);
  const [elementId, setElementId] = useState(null);
  const [showSideBar, setShowSideBar] = useState(false);
  const [{ label, placeholder, elId, options }, dispatch] = useStateValue();

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
      if (update[0]) {
        update[0].label = label;
        update[0].placeholder = placeholder;
        const index = type.findIndex(el => el.id === elementId);
        let arr = [...type];
        arr[index] = update[0];
        setType(arr);
      }
    }
  }, [placeholder, label]);

  useEffect(() => {
    const update = type.filter(item => {
      return item.id === elementId;
    });
    if (update.length > 0) {
      if (update[0].id === elementId) {
        const b = options.filter(hello => {
          return hello.id === elementId;
        });
        const lopdate = { ...update[0] };
        lopdate.options = b;
        const index = type.findIndex(el => el.id === elementId);
        let arr1 = [...type];
        arr1[index] = lopdate;
        setType(arr1);
      }
    }
  }, [options]);

  const handleEdit = id => {
    setShowSideBar(true);
    setElementId(id);
    const typeForSideBar = type.filter(item => {
      return item.id === id;
    });
    setTypeForEdit(typeForSideBar[0]);
  };

  const handleSidBarClose = () => [setShowSideBar(false)];

  return (
    <>
      <div className="container pt-5  ">
        <div className="row">
          <div className="col-md-4">
            <div className="toolbox-container">
              <Box
                style={{ marginBottom: "20px" }}
                name="فیلد تکست"
                onClick={() => {
                  setType(perval => [
                    ...perval,
                    {
                      type: "text",
                      id: uuidv4(),
                      label: "لیبل",
                      placeholder: "جای نگهدارنده",
                    },
                  ]);
                }}
              />
              <Box
                name="فیلد انتخابی"
                onClick={() => {
                  setType(perval => [
                    ...perval,
                    {
                      type: "dropdown",
                      id: uuidv4(),
                      label: "لیبل",
                      options: [
                        {
                          id: "",
                          holder: "جای نگهدارنده 1",
                          value: "",
                        },
                      ],
                    },
                  ]);
                }}
              />
            </div>
          </div>
          <div className="col-md-8">
            <div className=" bg-light form-playground shadow-sm rounded p-5">
              {type.length === 0 ? (
                <p className="text-center">
                  لطفا فرم مورد نظر خود را ایجاد کنید
                </p>
              ) : null}
              {type.length > 0 &&
                type.map((item, index) => {
                  if (item.type === "text") {
                    return (
                      <ElementsWrapper
                        key={item.id}
                        id={index}
                        handleRemove={handleRemove.bind(null, index)}
                        handleEdit={handleEdit.bind(null, item.id)}
                      >
                        <Input
                          placeholder={item.placeholder}
                          label={item.label}
                          id={index}
                          type={item.type}
                        />
                      </ElementsWrapper>
                    );
                  }
                  if (item.type === "dropdown") {
                    return (
                      <ElementsWrapper
                        key={item.id}
                        id={index}
                        handleRemove={handleRemove.bind(null, index)}
                        handleEdit={handleEdit.bind(null, item.id)}
                      >
                        <Dropdown id={item.id} label={item.label}>
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
                  return null;
                })}
            </div>
            <Button
              onClick={() => {
                const json = JSON.stringify(type);
                localStorage.setItem("form-json", json);
              }}
              variant="dark"
              className="mt-4"
            >
              ذخیره
            </Button>
          </div>
        </div>

        <SiderBar
          elementId={elementId}
          type={typeForEdit}
          handleClose={handleSidBarClose}
          showSideBar={showSideBar}
        />
      </div>
    </>
  );
}

export default App;
