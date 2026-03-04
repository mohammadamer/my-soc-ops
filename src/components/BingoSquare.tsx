import type { BingoSquareData } from '../types';

interface BingoSquareProps {
  readonly square: BingoSquareData;
  readonly isWinning: boolean;
  readonly onClick: () => void;
}

export function BingoSquare({ square, isWinning, onClick }: BingoSquareProps) {
  const baseClasses =
    'relative flex items-center justify-center p-1 text-center border rounded transition-all duration-150 select-none min-h-[60px] text-xs leading-tight';

  // Extracted state logic
  let bg = 'var(--square-bg)';
  let fg = 'var(--square-fg)';
  let border = '2px solid var(--border)';
  let boxShadow = 'none';
  if (square.isMarked) {
    if (isWinning) {
      bg = 'var(--accent2)';
      fg = 'var(--button-fg)';
      border = '2px solid var(--accent2)';
      boxShadow = '0 0 0 4px var(--accent2)';
    } else {
      bg = 'var(--accent)';
      fg = 'var(--button-fg)';
      border = '2px solid var(--accent)';
    }
  }
  if (square.isFreeSpace) {
    bg = 'var(--free-space-bg)';
    fg = 'var(--free-space-fg)';
    border = '2px solid var(--border)';
  }

  return (
    <button
      onClick={onClick}
      disabled={square.isFreeSpace}
      className={baseClasses + (square.isFreeSpace ? ' font-bold text-sm' : '')}
      aria-pressed={square.isMarked}
      aria-label={square.isFreeSpace ? 'Free space' : square.text}
      style={{
        background: bg,
        color: fg,
        border,
        boxShadow,
        borderRadius: 'var(--border-radius, 1rem)'
      }}
    >
      <span className="wrap-break-word hyphens-auto">{square.text}</span>
      {square.isMarked && !square.isFreeSpace && (
        <span className="absolute top-0.5 right-0.5 text-green-600 text-xs">✓</span>
      )}
    </button>
  );
}
