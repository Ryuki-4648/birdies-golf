import React, { useState } from "react";
// import logo from "./logo.svg";
import "./App.css";

function App() {
  const [parCounts, setParCounts] = useState(Array(19).fill(1)); // 1-18ホール分のパーを格納する配列。初期値を1とする。
  const [scoreCounts, setScoreCounts] = useState(Array(19).fill(1)); // Array.prototype.fill() 開始位置〜終了位置（までのすべての要素を、静的な値に変更した配列を返す

  const [displayResultTexts, setDisplayResultTexts] = useState(
    Array(19).fill("")
  );
  const [resultTotalScore, setResultTotalScore] = useState(0);

  const onClickResultButton = () => {
    const sum = scoreCounts.reduce(
      (accumulator, currentValue) => accumulator + currentValue // accumulator: 現在の合計値 currentValue: 現在の要素の値
    );
    console.log(sum - 1);
    console.log(scoreCounts);
    console.log(parCounts);
    setResultTotalScore(sum);
  };

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
    if (parCounts[index] < 1) return;
    const newParCount = [...parCounts]; // parCounts配列をコピー　新しい配列の作成
    newParCount[index] += value; // 新しい配列のindex番目にvalueを足す
    setParCounts(newParCount);
  };
  const scoreCountsChange = (index: number, value: number) => {
    if (scoreCounts[index] < 1) return;
    const newScoreCount = [...scoreCounts];
    newScoreCount[index] += value;
    setScoreCounts(newScoreCount);
  };
  const createTableRows = () => {
    const tableRows = [];
    for (let i = 1; i < 19; i++) {
      tableRows.push(
        <tr key={i}>
          <td className="w-20 text-xl font-semibold">{i}</td>
          <td className="w-32">
            <div className="flex items-center justify-center">
              <button
                className={`text-md h-10 w-10 cursor-pointer rounded-full ${
                  parCounts[i] < 2
                    ? "cursor-not-allowed bg-gray-200"
                    : "bg-blue-100"
                }`}
                onClick={(event) => parCountsChange(i, -i)}
                disabled={parCounts[i] <= 1}
              >
                −
              </button>
              <p className="mx-2 w-4">{parCounts[i]}</p>
              <button
                className="text-md h-10 w-10 cursor-pointer rounded-full bg-pink-100"
                onClick={(event) => parCountsChange(i, 1)}
              >
                ＋
              </button>
            </div>
          </td>
          <td className="w-32">
            <div className="flex items-center justify-center p-1">
              <button
                className={`text-md h-10 w-10 cursor-pointer rounded-full ${
                  scoreCounts[i] < 2
                    ? "cursor-not-allowed bg-gray-200"
                    : "bg-blue-100"
                }`}
                onClick={(event) => scoreCountsChange(i, -1)}
                disabled={scoreCounts[i] <= 1}
              >
                −
              </button>
              <p className="mx-2 w-4">{scoreCounts[i]}</p>
              <button
                className="text-md h-10 w-10 cursor-pointer rounded-full bg-pink-100"
                onClick={(event) => scoreCountsChange(i, 1)}
              >
                ＋
              </button>
            </div>
          </td>
          <td>
            <p className="text-sm">
              {displayResultTexts[i] ? displayResultTexts[i] : ""}
            </p>
          </td>
        </tr>
      );
    }
    return tableRows;
  };
  return (
    <div className="App relative">
      <header className="App-header">
        {/* <img src={logo} className="App-logo" alt="logo" /> */}
      </header>
      <div className="box absolute left-1/2 top-1/2 z-10 overflow-y-scroll bg-white">
        <div className="wrap p-4">
          <table className="w-full">
            <thead>
              <tr>
                <th className="h-8 w-20">ホール</th>
                <th className="h-8 w-32">パー</th>
                <th className="h-8 w-32">スコア</th>
                <th className="h-8">コメント</th>
              </tr>
            </thead>
            <tbody>{createTableRows()}</tbody>
          </table>
          <button
            className="mt-12 h-12 w-40 cursor-pointer bg-gray-500"
            onClick={(event) => {
              onClickFinishButton(18, event);
            }}
          >
            Finish
          </button>
          <button
            className="mt-12 h-12 w-40 cursor-pointer bg-gray-200"
            onClick={onClickResultButton}
          >
            Score
          </button>
          <div className="mt-8 flex items-center justify-center">
            <p className="mr-2 text-3xl">Score :</p>
            <p className="result-score text-5xl">{resultTotalScore}</p>
          </div>
        </div>
      </div>
      <img
        src="./bg01.png"
        alt=""
        className="bg01 z-1 absolute left-1/2 top-1/2 w-4/6"
      />
    </div>
  );
}

export default App;
