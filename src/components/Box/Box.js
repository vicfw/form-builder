import React from "react";
import "./Box.css";
import { useDrag } from "react-dnd";

function Box({ name, style, icon, dragRowType, onDragEnd }) {
  const [{ isDragging }, drag, dragPreview] = useDrag(() => ({
    type: dragRowType ? "Row" : "Box",
    item: { id: "1" },
    collect: monitor => ({
      isDragging: monitor.isDragging(),
      didDrop: !!monitor.didDrop(),
      canDrag: monitor.canDrag(),
    }),
  }));

  return (
    <>
      <div ref={dragPreview} style={{ opacity: isDragging ? 0.5 : 1 }}>
        <div
          className="box"
          style={style}
          role="Handle"
          ref={drag}
          onDragEnd={onDragEnd}
        >
          <span>{name}</span>
          <span>{icon}</span>
        </div>
      </div>
    </>
  );
}

export default Box;
