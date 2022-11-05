import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";

import store from "./store";
import { setUser } from "./store/user.slice";

// css bootstrap
import "bootstrap/dist/css/bootstrap.min.css";

// react slick
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// css variables
import "./assets/css/variables.css";

// css
import "./App.css";

const user = localStorage.getItem("user")
  ? JSON.parse(localStorage.getItem("user"))
  : null;
store.dispatch(setUser(user));

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <Provider store={store}>
      <App />
    </Provider>
  </BrowserRouter>
);
