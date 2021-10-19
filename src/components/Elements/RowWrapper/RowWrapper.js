import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import BoxOne from "./Boxes/BoxOne";
import update from "immutability-helper";
import { v4 as uuidv4 } from "uuid";

import "./RowWrapper.css";

function RowWrapper(props) {
  const { type } = useSelector((state) => state);
  const lastIndex = type[type.length - 1];
  const [dustbins, setDustbins] = useState([
    { accepts: "Box", lastDroppedItem: null, id: uuidv4() },
    { accepts: "Box", lastDroppedItem: null, id: uuidv4() },
  ]);

  const handelDrop = (index) => {
    return setDustbins(
      update(dustbins, {
        [index]: {
          lastDroppedItem: {
            $set: lastIndex,
          },
        },
      })
    );
  };

  return (
    <div className="row-wrapper">
      {dustbins.map(({ accepts, lastDroppedItem, id }, index) => (
        <BoxOne
          accept={accepts}
          lastDroppedItem={lastDroppedItem}
          OnBoxDragId={props.OnBoxDragId}
          onBoxDragEnd={props.onBoxDragEnd}
          key={index}
          id={id}
          onDrop={() => handelDrop(index)}
        />
      ))}
      {/* <Box1 />
      <Box2 /> */}
    </div>
  );
}

export default RowWrapper;
