import Square from "./Square.jsx";

/* eslint-disable react/prop-types */
export default function Board({ squares, onPlay, winningLine }) {
  const renderSquare = (i) => (
    <Square
      key={i}
      value={squares[i]}
      onClick={() => onPlay(i)}
      winning={winningLine.includes(i)}
    />
  );

  return (
    <div className="board" role="grid" aria-label="Tic Tac Toe board">
      <div className="row" role="row">
        {renderSquare(0)}
        {renderSquare(1)}
        {renderSquare(2)}
      </div>
      <div className="row" role="row">
        {renderSquare(3)}
        {renderSquare(4)}
        {renderSquare(5)}
      </div>
      <div className="row" role="row">
        {renderSquare(6)}
        {renderSquare(7)}
        {renderSquare(8)}
      </div>
    </div>
  );
}
