
import { useCallback, useEffect, useState } from 'react';
import { useBingoGame } from './hooks/useBingoGame';
import { StartScreen } from './components/StartScreen';
import { GameScreen } from './components/GameScreen';
import { BingoModal } from './components/BingoModal';
import { defaultTheme } from './theme';
import type { Theme } from './theme';
import { ThemePicker } from './components/ThemePicker';

function applyTheme(theme: Theme) {
  const root = document.documentElement;
  Object.entries(theme.colors).forEach(([key, value]) => {
    root.style.setProperty(`--${key.replace(/([A-Z])/g, "-$1").toLowerCase()}`, value);
  });
  root.style.setProperty('--font', theme.font);
}

function App() {
  const {
    gameState,
    board,
    winningSquareIds,
    showBingoModal,
    startGame,
    handleSquareClick,
    resetGame,
    dismissModal,
  } = useBingoGame();

  const [theme, setTheme] = useState<Theme>(defaultTheme);

  const handleThemeChange = useCallback((t: Theme) => {
    setTheme(t);
    applyTheme(t);
  }, []);

  useEffect(() => {
    applyTheme(theme);
  }, [theme]);

  return (
    <main className="min-h-screen flex flex-col items-center justify-center" style={{ background: 'var(--bg)', color: 'var(--fg)', fontFamily: 'var(--font)' }}>
      <div className="w-full max-w-2xl mx-auto px-4 py-4">
        <ThemePicker onThemeChange={handleThemeChange} />
      </div>
      {gameState === 'start' ? (
        <StartScreen onStart={startGame} />
      ) : (
        <>
          <GameScreen
            board={board}
            winningSquareIds={winningSquareIds}
            hasBingo={gameState === 'bingo'}
            onSquareClick={handleSquareClick}
            onReset={resetGame}
          />
          {showBingoModal && (
            <BingoModal onDismiss={dismissModal} />
          )}
        </>
      )}
    </main>
  );
}

export default App;
