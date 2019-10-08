import { createStore, compose } from "redux";
import { applicationReducer } from "./reducers";

const composeEnhancer =
  (process.env.NODE_ENV !== "production" &&
    window["__REDUX_DEVTOOLS_EXTENSION_COMPOSE__"]) ||
  compose;

export const store = createStore(applicationReducer, {}, composeEnhancer());
