import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { Provider } from "react-redux";
import { store } from "./store/store";
import {ToggleContextProvider } from "./context/Context";

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <ToggleContextProvider >
      <App />
      </ToggleContextProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
