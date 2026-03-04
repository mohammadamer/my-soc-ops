import type { BingoSquareData } from '../types';
import { BingoBoard } from './BingoBoard';

interface GameScreenProps {
  readonly board: BingoSquareData[];
  readonly winningSquareIds: Set<number>;
  readonly hasBingo: boolean;
  readonly onSquareClick: (squareId: number) => void;
  readonly onReset: () => void;
}

export function GameScreen({
  board,
  winningSquareIds,
  hasBingo,
  onSquareClick,
  onReset,
}: GameScreenProps) {
  return (
    <div className="flex flex-col min-h-full" style={{ background: 'var(--bg)', color: 'var(--fg)', fontFamily: 'var(--font)' }}>
      {/* Header */}
      <header className="flex items-center justify-between p-3" style={{ background: 'var(--square-bg)', borderBottom: '2px solid var(--border)' }}>
        <button
          onClick={onReset}
          className="text-sm px-3 py-1.5 rounded"
          style={{ background: 'var(--button-bg)', color: 'var(--button-fg)' }}
        >
          ← Back
        </button>
        <h1 className="font-bold" style={{ color: 'var(--accent)' }}>Soc Ops</h1>
        <div className="w-16"></div>
      </header>

      {/* Instructions */}
      <p className="text-center text-sm py-2 px-4" style={{ color: 'var(--fg)' }}>
        Tap a square when you find someone who matches it.
      </p>

      {/* Bingo indicator */}
      {hasBingo && (
        <div className="text-center py-2 font-semibold text-sm" style={{ background: 'var(--accent2)', color: 'var(--button-fg)' }}>
          🎉 BINGO! You got a line!
        </div>
      )}

      {/* Board */}
      <div className="flex-1 flex items-center justify-center p-3">
        <BingoBoard
          board={board}
          winningSquareIds={winningSquareIds}
          onSquareClick={onSquareClick}
        />
      </div>
    </div>
  );
}
