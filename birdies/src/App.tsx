import React, { useState } from "react";
// import logo from "./logo.svg";
import "./App.css";

function App() {
  const [parCount, setParCount] = useState(1);
  const [scoreCount, setScoreCount] = useState(1);
  if (scoreCount === 1) {
    console.log("ホールインワン");
  } else if (parCount - 3 === scoreCount) {
    console.log("アルバトロス");
  } else if (parCount - 2 === scoreCount) {
    console.log("イーグル");
  } else if (parCount - 1 === scoreCount) {
    console.log("バーディー");
  } else if (parCount === scoreCount) {
    console.log("パー");
  } else if (parCount + 1 === scoreCount) {
    console.log("ボギー");
  } else if (parCount + 2 === scoreCount) {
    console.log("ダブルボギー");
  }
  return (
    <div className="App">
      <header className="App-header">
        {/* <img src={logo} className="App-logo" alt="logo" /> */}
      </header>
      <div className="">
        <div className="flex">
          <button className="text-md" onClick={() => setParCount(parCount - 1)}>
            −
          </button>
          <p>{parCount}</p>
          <button className="text-md" onClick={() => setParCount(parCount + 1)}>
            ＋
          </button>
        </div>
        <div className="flex">
          <button
            className="text-md"
            onClick={() => setScoreCount(scoreCount - 1)}
          >
            −
          </button>
          <p>{scoreCount}</p>
          <button
            className="text-md"
            onClick={() => setScoreCount(scoreCount + 1)}
          >
            ＋
          </button>
        </div>
        <p className="hoge"></p>
        <button className="finish">Finish</button>
      </div>
    </div>
  );
}

export default App;
