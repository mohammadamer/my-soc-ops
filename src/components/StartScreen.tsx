interface StartScreenProps {
  readonly onStart: () => void;
}

export function StartScreen({ onStart }: StartScreenProps) {
  return (
    <div className="flex flex-col items-center justify-center min-h-full p-6" style={{ background: 'var(--bg)', color: 'var(--fg)', fontFamily: 'var(--font)' }}>
      <div className="text-center max-w-sm">
        <h1 className="text-4xl font-bold mb-2" style={{ color: 'var(--accent)' }}>Soc Ops</h1>
        <p className="text-lg mb-8" style={{ color: 'var(--fg)' }}>Social Bingo</p>
        <div className="rounded-lg p-6 shadow-sm border mb-8" style={{ background: 'var(--square-bg)', color: 'var(--square-fg)', border: '2px solid var(--border)' }}>
          <h2 className="font-semibold mb-3" style={{ color: 'var(--accent)' }}>How to play</h2>
          <ul className="text-left text-sm space-y-2" style={{ color: 'var(--fg)' }}>
            <li>• Find people who match the questions</li>
            <li>• Tap a square when you find a match</li>
            <li>• Get 5 in a row to win!</li>
          </ul>
        </div>
        <button
          onClick={onStart}
          className="w-full font-semibold py-4 px-8 rounded-lg text-lg transition-colors"
          style={{ background: 'var(--button-bg)', color: 'var(--button-fg)' }}
        >
          Start Game
        </button>
      </div>
    </div>
  );
}
