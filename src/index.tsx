import React from "react";
import ReactDOM from "react-dom";
import { PersistGate } from "redux-persist/integration/react";

import App from "./App";
import { store, persistedStore } from "./components/store/index";
var { Provider } = require("react-redux");

ReactDOM.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistedStore}>
      <App />
    </PersistGate>{" "}
  </Provider>,
  document.getElementById("root")
);
