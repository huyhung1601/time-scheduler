import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { Provider } from "react-redux";
// import { store } from "./store/store";
import { TaskDialogContextProvider } from "./context/TaskDialogContext";
import { store } from "./app/store";

ReactDOM.render(
  <>
    <Provider store={store}>
      <TaskDialogContextProvider>
        <App />
      </TaskDialogContextProvider>
    </Provider>
  </>,
  document.getElementById("root")
);
