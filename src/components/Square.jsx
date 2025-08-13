export default function Square({ value, onClick, winning }) {
  return (
    <button
      className={`square ${winning ? "winner" : ""} ${value ? "taken" : ""}`}
      onClick={onClick}
      disabled={Boolean(value)}
      role="gridcell"
      aria-label={value ? `Square ${value}` : "Empty square"}
    >
      {value}
    </button>
  );
}
