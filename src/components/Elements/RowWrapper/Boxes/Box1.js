import React from "react";
import { useDrop } from "react-dnd";

function Box1() {
  const [{ canDrop, isOver, didDrop, getDropResult, getItem }, drop] = useDrop(
    () => ({
      accept: "Box1",
      drop: (item, monitor) => {},
      collect: (monitor) => ({
        isOver: monitor.isOver(),
        canDrop: monitor.canDrop(),
      }),
    })
  );
  const renderAllInputs = () => {
    if (hello) {
      if (hello.type === "text") {
        return (
          <ElementsWrapper
            key={hello.id}
            id={hello.id}
            // handleRemove={handleRemove.bind(null, hello.id)}
            // handleEdit={handleEdit.bind(null, hello.id)}
          >
            <Input
              placeholder={hello.placeholder}
              label={hello.label}
              id={hello.id}
              type={hello.type}
            />
          </ElementsWrapper>
        );
      }
      if (hello.type === "dropdown") {
        return (
          <ElementsWrapper
            key={hello.id}
            id={hello.id}
            // handleRemove={handleRemove.bind(null, hello.id)}
            // handleEdit={handleEdit.bind(null, hello.id)}
          >
            <Dropdown id={hello.id} label={hello.label}>
              {hello.options.map((option, index) => {
                return (
                  <option key={hello.id} value={option.value}>
                    {option.holder}
                  </option>
                );
              })}
            </Dropdown>
          </ElementsWrapper>
        );
      }
    }
  };
  return (
    <div
      className="box-1 bg-light"
      style={{
        border: isOver ? "2px dotted white" : "2px dotted black",
      }}
      ref={drop}
    >
      {renderAllInputs()}
    </div>
  );
}

export default Box1;
