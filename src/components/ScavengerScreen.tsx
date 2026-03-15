import type { BingoSquareData } from '../types';

interface ScavengerScreenProps {
  readonly items: BingoSquareData[];
  readonly markedCount: number;
  readonly totalCount: number;
  readonly onToggle: (id: number) => void;
  readonly onReset: () => void;
}

export function ScavengerScreen({
  items,
  markedCount,
  totalCount,
  onToggle,
  onReset,
}: ScavengerScreenProps) {
  const pct = totalCount > 0 ? Math.round((markedCount / totalCount) * 100) : 0;
  const isComplete = markedCount === totalCount && totalCount > 0;

  return (
    <div
      className="flex flex-col min-h-full"
      style={{ background: 'var(--bg)', color: 'var(--fg)', fontFamily: 'var(--font)' }}
    >
      {/* Header */}
      <header
        className="flex items-center justify-between p-3"
        style={{ background: 'var(--square-bg)', borderBottom: '2px solid var(--border)' }}
      >
        <button
          onClick={onReset}
          className="text-sm px-3 py-1.5 rounded"
          style={{ background: 'var(--button-bg)', color: 'var(--button-fg)' }}
        >
          ← Back
        </button>
        <h1 className="font-bold" style={{ color: 'var(--accent)' }}>
          Soc Ops
        </h1>
        <div className="w-16" />
      </header>

      {/* Progress meter */}
      <div className="px-4 pt-4 pb-2">
        <div className="flex items-baseline justify-between mb-1.5">
          <span className="text-sm font-semibold" style={{ color: 'var(--accent)' }}>
            Scavenger Hunt
          </span>
          <span
            className="text-sm tabular-nums"
            style={{ color: isComplete ? 'var(--accent)' : 'var(--fg)' }}
          >
            {isComplete ? '🎉 All found!' : `${markedCount} / ${totalCount} found`}
          </span>
        </div>
        <div
          className="w-full rounded-full overflow-hidden"
          style={{ height: '8px', background: 'var(--square-bg)', border: '1.5px solid var(--border)' }}
        >
          <div
            className="h-full rounded-full transition-all duration-300"
            style={{
              width: `${pct}%`,
              background: isComplete ? 'var(--accent2)' : 'var(--accent)',
            }}
          />
        </div>
      </div>

      {/* Instructions */}
      <p className="text-center text-sm px-4 pt-1 pb-2" style={{ color: 'var(--fg)', opacity: 0.7 }}>
        Check off each person you find a match for.
      </p>

      {/* Checklist */}
      <ol className="flex-1 overflow-y-auto px-4 pb-6 space-y-2">
        {items.map((item) => (
          <li key={item.id}>
            <button
              onClick={() => onToggle(item.id)}
              aria-pressed={item.isMarked}
              className="w-full flex items-center gap-3 rounded-lg px-4 py-3 text-left transition-colors"
              style={{
                background: item.isMarked ? 'var(--accent)' : 'var(--square-bg)',
                color: item.isMarked ? 'var(--button-fg)' : 'var(--square-fg)',
                border: `1.5px solid ${item.isMarked ? 'transparent' : 'var(--border)'}`,
                opacity: item.isMarked ? 0.75 : 1,
              }}
            >
              {/* Custom checkbox visual */}
              <span
                className="shrink-0 flex items-center justify-center rounded"
                style={{
                  width: '20px',
                  height: '20px',
                  border: `2px solid ${item.isMarked ? 'var(--button-fg)' : 'var(--border)'}`,
                  background: item.isMarked ? 'var(--button-fg)' : 'transparent',
                  color: item.isMarked ? 'var(--accent)' : 'transparent',
                  flexShrink: 0,
                }}
              >
                {item.isMarked && (
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                    <path
                      d="M2 6l3 3 5-5"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                )}
              </span>
              <span
                className="text-sm leading-snug"
                style={{ textDecoration: item.isMarked ? 'line-through' : 'none' }}
              >
                {item.text}
              </span>
            </button>
          </li>
        ))}
      </ol>
    </div>
  );
}
