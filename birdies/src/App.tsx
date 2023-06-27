import React, { useState } from "react";
// import logo from "./logo.svg";
import "./App.css";

function App() {
  const [parCount, setParCount] = useState(1);
  const [scoreCount, setScoreCount] = useState(1);
  const [displayResultText, setDisplayResltText] = useState("");
  const onClickFinishButton = () => {
    if (scoreCount === 1) {
      setDisplayResltText("ホールインワン");
    } else if (parCount - 4 === scoreCount) {
      setDisplayResltText("コンドル");
    } else if (parCount - 3 === scoreCount) {
      setDisplayResltText("アルバトロス");
    } else if (parCount - 2 === scoreCount) {
      setDisplayResltText("イーグル");
    } else if (parCount - 1 === scoreCount) {
      setDisplayResltText("バーディー");
    } else if (parCount === scoreCount) {
      setDisplayResltText("パー");
    } else if (parCount + 1 === scoreCount) {
      setDisplayResltText("ボギー");
    } else if (parCount + 2 === scoreCount) {
      setDisplayResltText("ダブルボギー");
    }
  };
  const createTableRows = () => {
    const tableRows = [];
    for (let i = 1; i <= 18; i++) {
      tableRows.push(
        <tr>
          <td>{i}</td>
          <td>
            <div className="flex">
              <button
                className="text-md"
                onClick={() => setParCount(parCount - 1)}
              >
                −
              </button>
              <p>{parCount}</p>
              <button
                className="text-md"
                onClick={() => setParCount(parCount + 1)}
              >
                ＋
              </button>
            </div>
          </td>
          <td>
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
          </td>
          <td>
            <p className="hoge">{displayResultText}</p>
          </td>
        </tr>
      );
    }
    return tableRows;
  };
  return (
    <div className="App">
      <header className="App-header">
        {/* <img src={logo} className="App-logo" alt="logo" /> */}
      </header>
      <div className="">
        <table>
          <thead>
            <tr>
              <th>ホール</th>
              <th>パー</th>
              <th>スコア</th>
              <th>コメント</th>
            </tr>
          </thead>
          <tbody>{createTableRows()}</tbody>
        </table>
        <button className="finish" onClick={onClickFinishButton}>
          Finish
        </button>
      </div>
    </div>
  );
}

export default App;
