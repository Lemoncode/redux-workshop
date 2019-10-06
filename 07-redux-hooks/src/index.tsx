import * as React from "react";
import * as ReactDOM from "react-dom";
import { createStore, applyMiddleware, compose } from "redux";
import { Provider } from "react-redux";
import { reducers } from "./reducer";
import reduxThunk from "redux-thunk";

import { HelloComponent } from "./hello";
import { MemberCollectionComponent } from "./components/member-collection.component";

const composeEnhancers =
  window["__REDUX_DEVTOOLS_EXTENSION_COMPOSE__"] || compose;

const store = createStore(
  reducers,
  /* preloadedState, */ composeEnhancers(applyMiddleware(reduxThunk))
);

ReactDOM.render(
  <Provider store={store}>
    <>
      <HelloComponent />
      <MemberCollectionComponent />
    </>
  </Provider>,

  document.getElementById("root")
);
