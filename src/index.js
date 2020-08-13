import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { Provider } from "react-redux";
import store from "./redux/store";
import { fetchMissionsData } from "./redux/actions";


store.dispatch(fetchMissionsData());
ReactDOM.hydrate(
  <Provider store={store}>
    <App />,
  </Provider>,
  document.getElementById("root")
);
