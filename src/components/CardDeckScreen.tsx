import type { CSSProperties } from 'react';

interface CardDeckScreenProps {
  readonly gameState: 'drawing' | 'revealed' | 'empty';
  readonly currentCard: string | null;
  readonly drawnCount: number;
  readonly totalCards: number;
  readonly onDraw: () => void;
  readonly onNext: () => void;
  readonly onShuffle: () => void;
  readonly onReset: () => void;
}

const CARD_BACK_STYLE: CSSProperties = {
  position: 'absolute',
  inset: 0,
  borderRadius: '16px',
  backfaceVisibility: 'hidden',
  background: [
    'repeating-linear-gradient(135deg, rgba(255,255,255,0.08) 0, rgba(255,255,255,0.08) 1px, transparent 1px, transparent 12px)',
    'repeating-linear-gradient(45deg, rgba(255,255,255,0.08) 0, rgba(255,255,255,0.08) 1px, transparent 1px, transparent 12px)',
    'var(--button-bg)',
  ].join(', '),
  boxShadow: '0 8px 32px rgba(0,0,0,0.22)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
};

const CARD_FRONT_STYLE: CSSProperties = {
  position: 'absolute',
  inset: 0,
  borderRadius: '16px',
  backfaceVisibility: 'hidden',
  transform: 'rotateY(180deg)',
  background: 'var(--square-bg)',
  border: '2px solid var(--border)',
  boxShadow: '0 8px 32px rgba(0,0,0,0.22)',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '28px 24px',
};

export function CardDeckScreen({
  gameState,
  currentCard,
  drawnCount,
  totalCards,
  onDraw,
  onNext,
  onShuffle,
  onReset,
}: CardDeckScreenProps) {
  const isRevealed = gameState === 'revealed';
  const isEmpty = gameState === 'empty';

  const progressLabel =
    drawnCount === 0
      ? `${totalCards} cards ready`
      : `${drawnCount} of ${totalCards} drawn`;

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

      {isEmpty ? (
        /* ── Empty state ── */
        <div className="flex-1 flex flex-col items-center justify-center gap-6 px-6 text-center">
          <div style={{ fontSize: '72px', lineHeight: 1 }}>🃏</div>
          <div>
            <h2
              className="text-2xl font-bold mb-2"
              style={{ color: 'var(--accent)' }}
            >
              Deck empty!
            </h2>
            <p className="text-sm" style={{ color: 'var(--fg)', opacity: 0.7 }}>
              All {totalCards} cards have been drawn.
            </p>
          </div>
          <button
            onClick={onShuffle}
            className="font-semibold py-3 px-8 rounded-lg"
            style={{ background: 'var(--button-bg)', color: 'var(--button-fg)' }}
          >
            Shuffle again
          </button>
        </div>
      ) : (
        /* ── Active drawing ── */
        <div className="flex-1 flex flex-col items-center justify-center gap-5 px-6 py-4">
          {/* Progress label */}
          <p
            className="text-sm"
            style={{ color: 'var(--fg)', opacity: 0.65 }}
          >
            {progressLabel}
          </p>

          {/* 3-D flip card */}
          <div style={{ perspective: '1200px', width: '100%', maxWidth: '260px' }}>
            <div
              style={{
                width: '100%',
                aspectRatio: '5 / 7',
                position: 'relative',
                transformStyle: 'preserve-3d',
                transition: 'transform 0.55s cubic-bezier(0.4, 0, 0.2, 1)',
                transform: isRevealed ? 'rotateY(180deg)' : 'rotateY(0deg)',
              }}
            >
              {/* Card back */}
              <div style={CARD_BACK_STYLE}>
                <span
                  style={{
                    fontSize: 'clamp(64px, 20vw, 96px)',
                    fontWeight: 700,
                    color: 'var(--button-fg)',
                    opacity: 0.18,
                    lineHeight: 1,
                    userSelect: 'none',
                  }}
                >
                  ?
                </span>
              </div>

              {/* Card front */}
              <div style={CARD_FRONT_STYLE}>
                <span
                  style={{
                    position: 'absolute',
                    top: '12px',
                    left: '14px',
                    color: 'var(--accent)',
                    fontSize: '18px',
                    lineHeight: 1,
                    userSelect: 'none',
                  }}
                >
                  ♦
                </span>
                <span
                  style={{
                    position: 'absolute',
                    bottom: '12px',
                    right: '14px',
                    color: 'var(--accent)',
                    fontSize: '18px',
                    lineHeight: 1,
                    transform: 'rotate(180deg)',
                    userSelect: 'none',
                  }}
                >
                  ♦
                </span>
                <p
                  className="text-center font-medium leading-snug"
                  style={{
                    color: 'var(--square-fg)',
                    fontSize: 'clamp(13px, 3.5vw, 17px)',
                  }}
                >
                  {currentCard}
                </p>
              </div>
            </div>
          </div>

          {/* Action button */}
          <button
            onClick={isRevealed ? onNext : onDraw}
            className="w-full font-semibold py-3 px-6 rounded-lg text-base"
            style={{
              maxWidth: '260px',
              background: 'var(--button-bg)',
              color: 'var(--button-fg)',
            }}
          >
            {isRevealed ? 'Next card →' : 'Draw your card'}
          </button>
        </div>
      )}
    </div>
  );
}
