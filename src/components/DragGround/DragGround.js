import React from "react";
import "./DragGround.css";
import { useDrop } from "react-dnd";
function DragGround(props) {
  const [{ canDrop, isOver }, drop] = useDrop(() => ({
    accept: "Box",
    collect: monitor => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
      didDrop: monitor.didDrop(),
      getDropResult: monitor.getDropResult(),
    }),
  }));

  return (
    <div
      ref={drop}
      role={"Dustbin"}
      className="drag-ground"
      style={{
        backgroundColor: isOver ? "#ca5197" : "white",
        color: isOver ? "white" : "black",
        border: isOver ? "2px dotted white" : "2px dotted black",
      }}
    >
      {props.children}
      {canDrop ? "Release to drop" : "Drag a box here"}
    </div>
  );
}

export default DragGround;
