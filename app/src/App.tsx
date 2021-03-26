//import React from "react";
//import logo from "./logo.svg";
import "./App.css";
import { Canva } from "./components/Canva/Canva";
function App() {
  return (
    <div className="App">
      <Canva imgWidth={256} imgHeight={256}></Canva>
    </div>
  );
}

export default App;
