interface BingoModalProps {
  readonly onDismiss: () => void;
}

export function BingoModal({ onDismiss }: BingoModalProps) {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div
        className="rounded-xl p-6 max-w-xs w-full text-center shadow-xl animate-[bounce_0.5s_ease-out]"
        style={{
          background: 'var(--modal-bg)',
          color: 'var(--modal-fg)',
          border: '2px solid var(--border)',
          boxShadow: 'var(--box-shadow, 0 4px 32px 0 #000a)',
          borderRadius: 'var(--border-radius, 1rem)'
        }}
      >
        <div className="text-5xl mb-4">🎉</div>
        <h2 className="text-3xl font-bold mb-2" style={{ color: 'var(--accent)' }}>BINGO!</h2>
        <p className="mb-6">You completed a line!</p>
        <button
          onClick={onDismiss}
          className="w-full font-semibold py-3 px-6 rounded-lg transition-colors"
          style={{ background: 'var(--button-bg)', color: 'var(--button-fg)' }}
        >
          Keep Playing
        </button>
      </div>
    </div>
  );
}
