import { createStore } from "redux";
import reducer from "./reducer";
import { composeWithDevTools } from "redux-devtools-extension";

const redux = require("redux");
const applyMiddleware = redux.applyMiddleware;
const thunkMiddleware = require("redux-thunk").default;

const store = createStore(
  reducer,
  composeWithDevTools(applyMiddleware(thunkMiddleware))
);

export default store;
