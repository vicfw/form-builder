import React, { useState } from "react";
import { Dropdown } from "react-bootstrap";
import { useDrop } from "react-dnd";
import { useSelector } from "react-redux";
import Checkbox from "../../Checkbox";
import Datebox from "../../Datebox";
import ElementsWrapper from "../../ElementsWrapper/ElementsWrapper";
import File from "../../File";
import Input from "../../Input";
import Multiselect from "../../Multiselect";
import Radiobox from "../../Radiobox";
import TextArea from "../../TextArea";

function BoxOne(props) {
  const { type, allBoxesId } = useSelector(state => state);
  const hello = props.lastDroppedItem;
  const render = () => {
    return props.onBoxDragEnd && props.onBoxDragEnd();
  };
  props.onDrop();
  const [{ canDrop, isOver, didDrop, getDropResult, getItem }, drop] = useDrop(
    () => ({
      accept: props.accept,
      drop: (item, monitor) => {
        props.onDrop();
      },
      hover: (item, monitor) => {},
      collect: monitor => ({
        isOver: monitor.isOver(),
        canDrop: monitor.canDrop(),
        getItem: monitor.getItem(),
        getDropResult: monitor.getInitialClientOffset(),
      }),
    }),
  );

  //function for render all inputs at main page
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
      if (hello.type === "checkbox") {
        return (
          <ElementsWrapper
            key={hello.id}
            id={hello.id}
            // handleRemove={handleRemove.bind(null, hello.id)}
            // handleEdit={handleEdit.bind(null, hello.id)}
          >
            <label style={{ marginBottom: "0" }}>{hello.label}</label>
            {hello.options.map(el => {
              return (
                <Checkbox
                  type={hello.type}
                  values={el.value}
                  options={el.holder}
                  id={hello.id}
                />
              );
            })}
          </ElementsWrapper>
        );
      }
      if (hello.type === "radio") {
        return (
          <ElementsWrapper
            key={hello.id}
            id={hello.id}
            // handleRemove={handleRemove.bind(null, hello.id)}
            // handleEdit={handleEdit.bind(null, hello.id)}
          >
            <label style={{ marginBottom: "0" }}>{hello.label}</label>
            {hello.options.map(el => {
              return (
                <Radiobox
                  type={hello.type}
                  options={el.holder}
                  values={el.value}
                  id={hello.id}
                />
              );
            })}
          </ElementsWrapper>
        );
      }
      if (hello.type === "date") {
        return (
          <ElementsWrapper
            key={hello.id}
            id={hello.id}
            // handleRemove={handleRemove.bind(null, hello.id)}
            // handleEdit={handleEdit.bind(null, hello.id)}
          >
            <Datebox label={hello.label} />
          </ElementsWrapper>
        );
      }
      if (hello.type === "textarea") {
        return (
          <ElementsWrapper
            key={hello.id}
            id={hello.id}
            // handleRemove={handleRemove.bind(null, hello.id)}
            // handleEdit={handleEdit.bind(null, hello.id)}
          >
            <TextArea label={hello.label} />
          </ElementsWrapper>
        );
      }
      if (hello.type === "multiselect") {
        return (
          <ElementsWrapper
            key={hello.id}
            id={hello.id}
            // handleRemove={handleRemove.bind(null, hello.id)}
            // handleEdit={handleEdit.bind(null, hello.id)}
          >
            <Multiselect id={hello.id} label={hello.label}>
              {hello.options.map((option, index) => {
                return (
                  <option key={hello.id} value={option.value}>
                    {option.holder}
                  </option>
                );
              })}
            </Multiselect>
          </ElementsWrapper>
        );
      }
      if (hello.type === "image") {
        return (
          <ElementsWrapper
            key={hello.id}
            id={hello.id}
            // handleRemove={handleRemove.bind(null, hello.id)}
            // handleEdit={handleEdit.bind(null, hello.id)}
          >
            <File id={hello.id} label={hello.label} type={hello.type} />
          </ElementsWrapper>
        );
      }
      if (hello.type === "video") {
        return (
          <ElementsWrapper
            key={hello.id}
            id={hello.id}
            // handleRemove={handleRemove.bind(null, hello.id)}
            // handleEdit={handleEdit.bind(null, item.id)}
          >
            <File id={hello.id} label={hello.label} type={hello.type} />
          </ElementsWrapper>
        );
      }
    }
  };

  return (
    <div
      className="box-1 bg-light"
      data-id={props.id}
      style={{
        border: isOver ? "2px dotted white" : "2px dotted black",
      }}
      ref={drop}
    >
      {renderAllInputs()}
    </div>
  );
}

export default BoxOne;
