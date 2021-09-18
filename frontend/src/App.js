// import logo from "./logo.svg";
import "./App.css";
import { useState } from "react";

function App() {
  const [txt, setTxt] = useState("loading.....");
  fetch("/api")
    .then((res) => {
      return res.text();
    })
    .then((data) => {
      setTimeout(() => {
        setTxt(data);
      }, 1000);
    });
  return <>{txt}</>;
}

export default App;
// <header className="App-header">
//   <img src={logo} className="App-logo" alt="logo" />
//   <p>
//     Edit <code>src/App.js</code> and save to reload.
//   </p>
//   <a
//     className="App-link"
//     href="https://reactjs.org"
//     target="_blank"
//     rel="noopener noreferrer"
//   >
//     Learn React
//   </a>
// </header>
