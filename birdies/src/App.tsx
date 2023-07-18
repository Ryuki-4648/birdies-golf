import React, { useState } from "react";
import "./App.css";
import { Header } from "./components/header";

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
    // console.log(sum - 1);
    // console.log(scoreCounts);
    // console.log(parCounts);
    setResultTotalScore(sum);

    const newDisplayResultTexts = scoreCounts.map((score, index) => {
      const difference = scoreCounts[index] - parCounts[index];
      if (difference === 0) {
        return "ホールインワン";
      } else if (difference === -4) {
        return "コンドル";
      } else if (difference === -3) {
        return "アルバトロス";
      } else if (difference === -2) {
        return "イーグル";
      } else if (difference === -1) {
        return "バーディー";
      } else if (difference === 1) {
        return "ボギー";
      } else if (difference === 2) {
        return "ダブルボギー";
      } else {
        return "";
      }
    });
    setDisplayResultTexts(newDisplayResultTexts);
  };

  const calculateScoreDifference = (index: number) => {
    return scoreCounts[index] - parCounts[index];
  };

  const onClickResetButton = () => {
    setParCounts(Array(19).fill(1));
    setScoreCounts(Array(19).fill(1));
    setResultTotalScore(0);
    setDisplayResultTexts(Array(19).fill(""));
  };

  const addClassByScore = (score: number) => {
    if (score === 0) {
      return "text-gray-400";
    } else if (score >= 1 && score <= 80) {
      return "text-red-700";
    } else if (score >= 81 && score <= 100) {
      return "text-yellow-600";
    } else if (score >= 101 && score <= 130) {
      return "text-green-700";
    } else {
      return "text-blue-700";
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
          <td className="w-20 font-semibold text-gray-600">{i}</td>
          <td className="w-32">
            <div className="flex items-center justify-center">
              <button
                className={`text-md h-6 w-6 cursor-pointer rounded-full md:h-10 md:w-10 ${
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
                className="text-md h-6 w-6 cursor-pointer rounded-full bg-pink-100 md:h-10 md:w-10"
                onClick={(event) => parCountsChange(i, 1)}
              >
                ＋
              </button>
            </div>
          </td>
          <td className="w-32">
            <div className="flex items-center justify-center p-1">
              <button
                className={`text-md h-6 w-6 cursor-pointer rounded-full md:h-10 md:w-10 ${
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
                className="text-md h-6 w-6 cursor-pointer rounded-full bg-pink-100 md:h-10 md:w-10"
                onClick={(event) => scoreCountsChange(i, 1)}
              >
                ＋
              </button>
            </div>
          </td>
          <td>
            <p className="text-xs md:text-sm">{calculateScoreDifference(i)}</p>
          </td>
          <td>
            <p className="text-xs md:text-sm">
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
      <Header />
      <div className="box absolute left-1/2 top-1/2 z-10 flex w-11/12 justify-center overflow-x-scroll overflow-y-scroll bg-white px-2 py-4 md:w-5/12 md:overflow-x-auto md:pl-0 md:pr-4">
        <div className="wrap">
          <table className="w-full">
            <thead>
              <tr>
                <th className="text-md h-12 w-20 md:text-xl">ホール</th>
                <th className="text-md h-12 w-32 md:text-xl">パー</th>
                <th className="text-md h-12 w-32 md:text-xl">スコア</th>
                <th className="text-md h-12 w-24 md:text-xl">キロク</th>
                <th className="text-md h-12 w-32 md:text-xl">メモ</th>
              </tr>
            </thead>
            <tbody>{createTableRows()}</tbody>
          </table>
          <button
            className="mt-12 h-12 w-48 cursor-pointer bg-gray-200 duration-300 hover:bg-red-400 hover:text-white"
            onClick={onClickResultButton}
          >
            スコアをみる
          </button>
          <div className="mb-4 mt-8 flex items-center justify-center">
            <p className="mr-2 text-3xl">Score :</p>
            <p
              className={`result-score text-5xl ${addClassByScore(
                resultTotalScore
              )}`}
            >
              {resultTotalScore}
            </p>
          </div>
          <p
            className="cursor-pointer text-sm text-blue-600 duration-300 hover:text-gray-400"
            onClick={onClickResetButton}
          >
            リセットする
          </p>
        </div>
      </div>
      <img
        src="./bg01.png"
        alt=""
        className="bg01 z-1 absolute left-1/2 top-1/2 h-screen -translate-x-1/2 -translate-y-1/2 cursor-pointer lg:h-full"
      />
    </div>
  );
}

export default App;
