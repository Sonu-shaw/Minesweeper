/* eslint-disable no-unused-vars */
import { useEffect, useState } from 'react'
import Board from "./Board"
import useSound from 'use-sound';
import sound from "./assets/clickSound.wav"
import lostSound from "./assets/lostSound.wav"
import winSound from "./assets/winSound.wav"
import Navbar from './Navbar';
import Model from './Model/Model';

const generateGameplay = (r, c, mines, firstMoveCell) => {
  const matrix = Array(r).fill(0).map(() => Array(c).fill(0));
  let countMine = 0;
  while (countMine < mines) {
    const i = Math.floor(Math.random() * r);
    const j = Math.floor(Math.random() * c);
    if (matrix[i][j] === -1 || (i === firstMoveCell.ri && j === firstMoveCell.rj)) { continue; }

    matrix[i][j] = -1;
    countMine++;

    for (let di of [-1, 0, 1]) {
      for (let dj of [-1, 0, 1]) {
        const ni = i + di;
        const nj = j + dj;
        if (ni >= 0 && ni < r && nj >= 0 && nj < c && matrix[ni][nj] !== -1) {
          matrix[ni][nj]++;
        }
      }
    }
  }
  return matrix;
}
export default function App() {
  const [row, setRow] = useState(9);
  const [col, setCol] = useState(9);
  const [mines, setMines] = useState(10);

  const [play] = useSound(sound);
  const [gameover] = useSound(lostSound);
  const [hurray] = useSound(winSound);

  const [msg, setMsg] = useState("");
  const [firstMove, setFirstMove] = useState(true);
  const [level, setLevel] = useState("beginner");
  const handleLevel = (e) => {
    setLevel(e.target.value);
    // console.log(level);
  }
  const [countFlag, setCountFlag] = useState(10);

  const [playground, setPlayground] = useState([[]]);
  // playground.map((row, i) => row.map((col, j) => console.log(playground[i][j])));

  const [reveal, setReveal] = useState(Array(row).fill(false)
    .map(() => Array(col).fill(false)));

  const [flag, setFlag] = useState(Array(row).fill(false)
    .map(() => Array(col).fill(false)));

  const [gameState, setGameState] = useState("start");

  const [time, setTime] = useState(0);

  const [hint, setHint] = useState(false);

  useEffect(() => {
    if (level === "beginner") {
      setRow(9);
      setCol(9);
      setMines(10);
      setCountFlag(10);
    }
    else if (level === "intermediate") {
      setRow(10);
      setCol(10);
      setMines(20);
      setCountFlag(20);
    } else if (level === "expert") {
      setRow(12);
      setCol(12);
      setMines(30);
      setCountFlag(30);
    }
  }, [level]);

  useEffect(() => {
    setPlayground(generateGameplay(row, col, mines, { ri: -1, cj: -1 }));
    setReveal(Array(row).fill(false).map(() => Array(col).fill(false)));
    setFlag(Array(row).fill(false).map(() => Array(col).fill(false)));
    setGameState("start");
    setHint(false);
    setTime(0);
  }, [row, col, mines]);


  const handleReveal = (r, c, newGame) => {
    if ((gameState !== "running" && gameState !== "start") || reveal[r][c] || flag[r][c]) { return; }
    play();
    setGameState("running");

    if (firstMove) {
      if (playground[r][c] === -1) {
        const newPlayground = generateGameplay(row, col, mines, { ri: r, rj: c });
        setPlayground(newPlayground);
        newGame = [...newPlayground];
        const newReveal = [...reveal];
        newReveal[r][c] = true;
        setReveal(newReveal);
        if (newGame[r][c] === 0) {
          console.log("hello");
          revealAdjacent(r, c, newReveal, newPlayground);
        }
        return;
      }
      else {
        newGame = [...playground];
      }
      setFirstMove(false);
    }
    else {
      newGame = [...playground];
    }


    const newReveal = [...reveal];
    newReveal[r][c] = true;
    setReveal(newReveal);

    if (newGame[r][c] === -1) {

      const newReveal = reveal.map((r, i) =>
        r.map((c, j) => (playground[i][j] === -1 ? true : c)));

      setReveal(newReveal);
      setGameState("lost");
      setMsg("Better luck next time!");
      gameover();
      return;
    }

    if (newGame[r][c] === 0) {
      console.log("hello");
      revealAdjacent(r, c, newReveal, playground);
    }
    checkWin(newReveal);
  }

  const revealAdjacent = (r, c, revealedPlayground, newPlayground) => {

    for (let di of [-1, 0, 1]) {
      for (let dj of [-1, 0, 1]) {
        const ni = r + di;
        const nj = c + dj;
        if (ni >= 0 && ni < row && nj >= 0 && nj < col && !revealedPlayground[ni][nj]) {

          revealedPlayground[ni][nj] = true;
          setReveal(revealedPlayground);

          if (newPlayground[ni][nj] === 0) {
            revealAdjacent(ni, nj, revealedPlayground, newPlayground);
          }
        }
      }
    }

  }

  const checkWin = (revealedPlayground) => {
    let win = true;
    for (let i = 0; i < row; i++) {
      for (let j = 0; j < col; j++) {
        if (playground[i][j] !== -1 && !revealedPlayground[i][j]) {
          win = false;
        }
      }
    }
    if (win) {
      setGameState("won");
      hurray();
      setMsg("Congratulations! You Won");

    }
  }

  const handleFlag = (r, c) => {
    if ((gameState !== "running" && gameState !== "start") || reveal[r][c]) { return; }
    // console.log("flag fun");

    const newFlag = [...flag];
    newFlag[r][c] = !newFlag[r][c];
    // console.log(newFlag);

    setFlag(newFlag);
  }

  const restart = () => {
    window.location.reload();
  }

  useEffect(() => {
    console.log(gameState);

    let timer;
    if (gameState === "running") {
      timer = setInterval(() => {
        console.log("helo time");

        setTime(prev => prev + 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [gameState]);

  const totalTime = (totalSec) => {
    const hr = Math.floor(totalSec / 3600);
    const min = Math.floor((totalSec % 3600) / 60);
    const sec = totalSec % 60;
    console.log("Total Time in Seconds:", time);
    console.log("Formatted Time:", { hr, min, sec });
    return { hr, min, sec };
  }
  const { hr, min, sec } = totalTime(time);


  const handleHint = () => {
    if (hint || gameState !== "running") { return; }

    let findMine = false;
    const newFlag = [...flag];

    while (!findMine) {
      const r = Math.floor(Math.random() * row);
      const c = Math.floor(Math.random() * col);

      if (playground[r][c] === -1 && !newFlag[r][c]) {
        newFlag[r][c] = true;
        findMine = true;
        setCountFlag(prev => prev - 1);
      }
    }
    setFlag(newFlag);
    setHint(true);
  }

  return (
    <div className="min-h-screen w-full flex flex-col items-center gap-8 bg-cover bg-center px-2 py-4 overflow-x-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900"

     >

      <Navbar level={level}
        handleLevel={handleLevel}
        handleHint={handleHint}
        countFlag={countFlag}
        restart={restart}
        hint={hint}
        hr={hr}
        min={min}
        sec={sec} />
      <div 

  className="p-3 sm:p-5 bg-white/10 backdrop-blur-md shadow-lg shadow-slate-900 bg-repeat-y h-fit w-fit border border-slate-700 rounded-2xl max-w-full overflow-auto m-auto transition-all
   ">

        <Board playground={playground}
          reveal={reveal}
          handleReveal={handleReveal}
          flag={flag}
          handleFlag={handleFlag}
          setCountFlag={setCountFlag} />
      </div >
      {gameState !== "running" && gameState !== "start" && <Model msg={gameState}
        restart={restart} />}

    </div>
  )
}


