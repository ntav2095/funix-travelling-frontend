import { render } from "@testing-library/react";
import React, { Component } from "react";
import { BrowserRouter } from "react-router-dom";
import "./App.css";
import Main from "./Main";
// import IndividualIntervalsExample from "./Compoment/SLIDERCOmpoment";
function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Main />
      </div>
    </BrowserRouter>
  );
}

export default App;
