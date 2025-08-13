import { useMemo, useState } from "react";
import Board from "./components/Board.jsx";
import { calculateWinner } from "./utils/calculateWinner.js";

export default function App() {
  // Player meta
  const [playerX, setPlayerX] = useState("Player X");
  const [playerO, setPlayerO] = useState("Player O");

  // Game state
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);
  const [scores, setScores] = useState({ X: 0, O: 0, Draw: 0 });
  const [justFinished, setJustFinished] = useState(false);

  const { winner, line } = useMemo(() => calculateWinner(squares), [squares]);
  const isBoardFull = useMemo(() => squares.every(Boolean), [squares]);
  const isDraw = !winner && isBoardFull;

  const currentPlayerSymbol = xIsNext ? "X" : "O";
  const currentPlayerName = xIsNext ? playerX : playerO;

  function handleSquareClick(i) {
    if (squares[i] || winner) return;
    const nextSquares = squares.slice();
    nextSquares[i] = currentPlayerSymbol;

    // Evaluate outcome immediately after the move
    const { winner: w } = calculateWinner(nextSquares);
    const boardFull = nextSquares.every(Boolean);
    const draw = !w && boardFull;

    if (w) {
      setScores((prev) => ({ ...prev, [w]: prev[w] + 1 }));
      setJustFinished(true);
    } else if (draw) {
      setScores((prev) => ({ ...prev, Draw: prev.Draw + 1 }));
      setJustFinished(true);
    }

    setSquares(nextSquares);
    setXIsNext(!xIsNext);
  }

  function resetBoard() {
    setSquares(Array(9).fill(null));
    setXIsNext(true);
    setJustFinished(false);
  }

  function resetMatch() {
    resetBoard();
    setScores({ X: 0, O: 0, Draw: 0 });
  }

  const status = winner
    ? `Winner: ${winner === "X" ? playerX : playerO}`
    : isDraw
    ? "Draw! Start a new round."
    : `Next Turn: ${currentPlayerName} (${currentPlayerSymbol})`;

  return (
    <div className="app">
      <header className="header">
        <h1 className="title">Tic‑Tac‑Toe Pro</h1>
      </header>

      <section className="controlBar">
        <div className="playerInputs">
          <label>
            X:
            <input
              aria-label="Player X name"
              value={playerX}
              onChange={(e) => setPlayerX(e.target.value)}
              placeholder="Player X"
            />
          </label>
          <label>
            O:
            <input
              aria-label="Player O name"
              value={playerO}
              onChange={(e) => setPlayerO(e.target.value)}
              placeholder="Player O"
            />
          </label>
        </div>
        <div className="buttons">
          <button className="btn secondary" onClick={resetBoard}>
            Reset Board
          </button>
          <button className="btn danger" onClick={resetMatch}>
            Reset Match
          </button>
        </div>
      </section>

      <main className="main">
        <aside className="scoreboard">
          <h2>Scoreboard</h2>
          <div className="scores">
            <div className="score chip">
              {playerX} (X): <b>{scores.X}</b>
            </div>
            <div className="score chip">
              {playerO} (O): <b>{scores.O}</b>
            </div>
            <div className="score chip">
              Draws: <b>{scores.Draw}</b>
            </div>
          </div>
          <div className="status" aria-live="polite">
            {status}
          </div>
        </aside>

        <div className="boardWrap">
          <Board
            squares={squares}
            onPlay={handleSquareClick}
            winningLine={line}
          />
        </div>
      </main>

      {(winner || isDraw) && justFinished && (
        <div className="overlay" role="dialog" aria-modal="true">
          <div className="modal">
            <h3 className="celebrate">
              {winner
                ? `${winner === "X" ? playerX : playerO} wins!`
                : "It's a draw!"}
            </h3>
            <button
              className="btn primary"
              onClick={() => {
                setJustFinished(false);
                resetBoard();
              }}
            >
              Play Again
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
