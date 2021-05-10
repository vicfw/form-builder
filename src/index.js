import React from "react";
import "./index.css";
import ReactDOM from "react-dom";
import App from "./App";
import { StateProvider } from "./Context/FormContext";
import reducer, { initialState } from "./Context/reducer";

ReactDOM.render(
  <React.StrictMode>
    <StateProvider initialState={initialState} reducer={reducer}>
      <App />
    </StateProvider>
  </React.StrictMode>,
  document.getElementById("root"),
);
