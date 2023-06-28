import React, { useState } from "react";
// import logo from "./logo.svg";
import "./App.css";

function App() {
  const [parCounts, setParCounts] = useState(Array(19).fill(1)); // 1-18ホール分のパーを格納する配列。初期値を1とする。
  const [scoreCounts, setScoreCounts] = useState(Array(19).fill(1));
  const [displayResultTexts, setDisplayResultTexts] = useState(
    Array(19).fill("")
  );
  const onClickFinishButton = (
    index: number,
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    const scoreCount = scoreCounts[index];
    const parCount = parCounts[index];
    console.log(scoreCount); // onClickFinishButton(hoge, event)としたら、hoge番目のスコアが表示される
    console.log(parCount);
    if (scoreCount === 1) {
      setDisplayResultTexts((prevResultTexts) => {
        console.log(prevResultTexts); // 配列0-18
        const newResultTexts = [...prevResultTexts];
        newResultTexts[index] = "ホールインワン";
        return newResultTexts;
      });
    } else if (parCount - 4 === scoreCount) {
      setDisplayResultTexts((prevResultTexts) => {
        const newResultTexts = [...prevResultTexts];
        newResultTexts[index] = "コンドル";
        return newResultTexts;
      });
    } else if (parCount - 3 === scoreCount) {
      setDisplayResultTexts((prevResultTexts) => {
        const newResultTexts = [...prevResultTexts];
        newResultTexts[index] = "アルバトロス";
        return newResultTexts;
      });
    } else if (parCount - 2 === scoreCount) {
      setDisplayResultTexts((prevResultTexts) => {
        const newResultTexts = [...prevResultTexts];
        newResultTexts[index] = "イーグル";
        return newResultTexts;
      });
    } else if (parCount - 1 === scoreCount) {
      setDisplayResultTexts((prevResultTexts) => {
        const newResultTexts = [...prevResultTexts];
        newResultTexts[index] = "バーディー";
        return newResultTexts;
      });
    } else if (parCount === scoreCount) {
      setDisplayResultTexts((prevResultTexts) => {
        const newResultTexts = [...prevResultTexts];
        newResultTexts[index] = "パー";
        return newResultTexts;
      });
    } else if (parCount + 1 === scoreCount) {
      setDisplayResultTexts((prevResultTexts) => {
        const newResultTexts = [...prevResultTexts];
        newResultTexts[index] = "ボギー";
        return newResultTexts;
      });
    } else if (parCount + 2 === scoreCount) {
      setDisplayResultTexts((prevResultTexts) => {
        const newResultTexts = [...prevResultTexts];
        newResultTexts[index] = "ダブルボギー";
        return newResultTexts;
      });
    }
  };
  const parCountsChange = (index: number, value: number) => {
    const newParCount = [...parCounts]; // parCounts配列をコピー　新しい配列の作成
    newParCount[index] += value; // 新しい配列のindex番目にvalueを足す
    setParCounts(newParCount);
  };
  const scoreCountsChange = (index: number, value: number) => {
    const newScoreCount = [...scoreCounts];
    newScoreCount[index] += value;
    setScoreCounts(newScoreCount);
  };
  const createTableRows = () => {
    const tableRows = [];
    for (let i = 1; i < 19; i++) {
      tableRows.push(
        <tr key={i}>
          <td>{i}</td>
          <td>
            <div className="flex">
              <button
                className="text-md c-button01"
                onClick={(event) => parCountsChange(i, -i)}
              >
                −
              </button>
              <p>{parCounts[i]}</p>
              <button
                className="text-md c-button01"
                onClick={(event) => parCountsChange(i, 1)}
              >
                ＋
              </button>
            </div>
          </td>
          <td>
            <div className="flex">
              <button
                className="text-md c-button01"
                onClick={(event) => scoreCountsChange(i, -1)}
              >
                −
              </button>
              <p>{scoreCounts[i]}</p>
              <button
                className="text-md c-button01"
                onClick={(event) => scoreCountsChange(i, 1)}
              >
                ＋
              </button>
            </div>
          </td>
          <td>
            <p className="hoge">
              {displayResultTexts[i] ? displayResultTexts[i] : ""}
            </p>
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
      <div className="box">
        <div className="wrap">
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
          <button
            className="finish"
            onClick={(event) => {
              onClickFinishButton(18, event);
            }}
          >
            Finish
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
