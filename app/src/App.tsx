//import React from "react";
//import logo from "./logo.svg";
import "./App.css";
import { Canva } from "./components/Canva/Canva";
function App() {
  return (
    <div className="App">
      <Canva imgWidth={400} imgHeight={(400 / 16) * 9}></Canva>
    </div>
  );
}

export default App;
