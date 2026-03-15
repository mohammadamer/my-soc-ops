interface StartScreenProps {
  readonly onStartBingo: () => void;
  readonly onStartScavenger: () => void;
  readonly onStartCardDeck: () => void;
}

export function StartScreen({ onStartBingo, onStartScavenger, onStartCardDeck }: StartScreenProps) {
  return (
    <div className="flex flex-col items-center justify-center min-h-full p-6" style={{ background: 'var(--bg)', color: 'var(--fg)', fontFamily: 'var(--font)' }}>
      <div className="text-center max-w-sm w-full">
        <h1 className="text-4xl font-bold mb-2" style={{ color: 'var(--accent)' }}>Soc Ops</h1>
        <p className="text-lg mb-8" style={{ color: 'var(--fg)' }}>Social Icebreaker Games</p>

        {/* Bingo mode card */}
        <div className="rounded-lg p-5 shadow-sm border mb-4 text-left" style={{ background: 'var(--square-bg)', color: 'var(--square-fg)', border: '2px solid var(--border)' }}>
          <h2 className="font-semibold mb-1" style={{ color: 'var(--accent)' }}>Bingo</h2>
          <ul className="text-sm space-y-1 mb-4" style={{ color: 'var(--fg)' }}>
            <li>• Find people who match the squares</li>
            <li>• Tap a square when you find a match</li>
            <li>• Get 5 in a row to win!</li>
          </ul>
          <button
            onClick={onStartBingo}
            className="w-full font-semibold py-3 px-6 rounded-lg text-base transition-colors"
            style={{ background: 'var(--button-bg)', color: 'var(--button-fg)' }}
          >
            Play Bingo
          </button>
        </div>

        {/* Scavenger Hunt mode card */}
        <div className="rounded-lg p-5 shadow-sm border mb-4 text-left" style={{ background: 'var(--square-bg)', color: 'var(--square-fg)', border: '2px solid var(--border)' }}>
          <h2 className="font-semibold mb-1" style={{ color: 'var(--accent)' }}>Scavenger Hunt</h2>
          <ul className="text-sm space-y-1 mb-4" style={{ color: 'var(--fg)' }}>
            <li>• Same questions shown as a checklist</li>
            <li>• Check off each person you find</li>
            <li>• Fill the progress bar to finish!</li>
          </ul>
          <button
            onClick={onStartScavenger}
            className="w-full font-semibold py-3 px-6 rounded-lg text-base transition-colors"
            style={{ background: 'var(--button-bg)', color: 'var(--button-fg)' }}
          >
            Play Scavenger Hunt
          </button>
        </div>

        {/* Card Deck Shuffle mode card */}
        <div className="rounded-lg p-5 shadow-sm border text-left" style={{ background: 'var(--square-bg)', color: 'var(--square-fg)', border: '2px solid var(--border)' }}>
          <h2 className="font-semibold mb-1" style={{ color: 'var(--accent)' }}>Card Deck Shuffle</h2>
          <ul className="text-sm space-y-1 mb-4" style={{ color: 'var(--fg)' }}>
            <li>• Pass the device around the group</li>
            <li>• Each player taps to flip their card</li>
            <li>• 24 unique cards — then the deck is empty!</li>
          </ul>
          <button
            onClick={onStartCardDeck}
            className="w-full font-semibold py-3 px-6 rounded-lg text-base transition-colors"
            style={{ background: 'var(--button-bg)', color: 'var(--button-fg)' }}
          >
            Play Card Deck Shuffle
          </button>
        </div>
      </div>
    </div>
  );
}
