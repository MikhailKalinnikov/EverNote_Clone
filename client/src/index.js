import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import Reducer from "./redux/reducers/Reducer";
import { composeWithDevTools } from "redux-devtools-extension";
import initState from "./redux/initState";

const store = createStore(
  Reducer,
  initState(),
  composeWithDevTools(applyMiddleware())
);
store.subscribe(() => {
  window.localStorage.setItem("Ever_Note", JSON.stringify(store.getState()));
});
ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
