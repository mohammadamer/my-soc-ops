import type { BingoSquareData } from '../types';
import { BingoSquare } from './BingoSquare';

interface BingoBoardProps {
  readonly board: BingoSquareData[];
  readonly winningSquareIds: Set<number>;
  readonly onSquareClick: (squareId: number) => void;
}

export function BingoBoard({ board, winningSquareIds, onSquareClick }: BingoBoardProps) {
  return (
    <div
      className="grid grid-cols-5 gap-1 w-full max-w-md mx-auto aspect-square"
      style={{
        background: 'var(--square-bg)',
        color: 'var(--square-fg)',
        border: '2px solid var(--border)',
        boxShadow: 'var(--box-shadow, 0 2px 16px 0 #000a)',
        borderRadius: 'var(--border-radius, 1rem)'
      }}
    >
      {board.map((square) => (
        <BingoSquare
          key={square.id}
          square={square}
          isWinning={winningSquareIds.has(square.id)}
          onClick={() => onSquareClick(square.id)}
        />
      ))}
    </div>
  );
}
