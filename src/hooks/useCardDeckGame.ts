import { useState, useCallback, useMemo, useEffect } from 'react';
import { generateDeck } from '../utils/bingoLogic';

const DECK_SIZE = 24;

export interface CardDeckGameState {
  gameState: 'start' | 'drawing' | 'revealed' | 'empty';
  currentCard: string | null;
  drawnCount: number;
  totalCards: number;
}

export interface CardDeckGameActions {
  startGame: () => void;
  drawCard: () => void;
  nextCard: () => void;
  shuffleAgain: () => void;
  resetGame: () => void;
}

const STORAGE_KEY = 'soc-carddeck-v1';
const STORAGE_VERSION = 1;

type ActiveGameState = 'start' | 'drawing' | 'revealed' | 'empty';

interface StoredCardDeckData {
  version: number;
  gameState: ActiveGameState;
  deck: string[];
  currentCard: string | null;
  drawnCount: number;
}

function validateStoredData(data: unknown): data is StoredCardDeckData {
  if (!data || typeof data !== 'object') return false;
  const obj = data as Record<string, unknown>;
  if (obj.version !== STORAGE_VERSION) return false;
  if (
    typeof obj.gameState !== 'string' ||
    !['start', 'drawing', 'revealed', 'empty'].includes(obj.gameState)
  )
    return false;
  if (
    !Array.isArray(obj.deck) ||
    !obj.deck.every((s: unknown) => typeof s === 'string')
  )
    return false;
  if (obj.currentCard !== null && typeof obj.currentCard !== 'string') return false;
  if (typeof obj.drawnCount !== 'number') return false;
  return true;
}

function loadState(): Pick<
  StoredCardDeckData,
  'gameState' | 'deck' | 'currentCard' | 'drawnCount'
> | null {
  if (typeof window === 'undefined') return null;
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (!saved) return null;
    const parsed = JSON.parse(saved);
    if (validateStoredData(parsed)) {
      return {
        gameState: parsed.gameState,
        deck: parsed.deck,
        currentCard: parsed.currentCard,
        drawnCount: parsed.drawnCount,
      };
    }
    localStorage.removeItem(STORAGE_KEY);
  } catch {
    if (typeof window !== 'undefined') localStorage.removeItem(STORAGE_KEY);
  }
  return null;
}

function saveState(
  gameState: ActiveGameState,
  deck: string[],
  currentCard: string | null,
  drawnCount: number
): void {
  if (typeof window === 'undefined') return;
  try {
    const data: StoredCardDeckData = {
      version: STORAGE_VERSION,
      gameState,
      deck,
      currentCard,
      drawnCount,
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch {
    // non-critical
  }
}

export function useCardDeckGame(): CardDeckGameState & CardDeckGameActions {
  const loadedState = useMemo(() => loadState(), []);

  const [gameState, setGameState] = useState<ActiveGameState>(
    () => loadedState?.gameState ?? 'start'
  );
  const [deck, setDeck] = useState<string[]>(() => loadedState?.deck ?? []);
  const [currentCard, setCurrentCard] = useState<string | null>(
    () => loadedState?.currentCard ?? null
  );
  const [drawnCount, setDrawnCount] = useState<number>(
    () => loadedState?.drawnCount ?? 0
  );

  useEffect(() => {
    saveState(gameState, deck, currentCard, drawnCount);
  }, [gameState, deck, currentCard, drawnCount]);

  const startGame = useCallback(() => {
    const newDeck = generateDeck();
    setDeck(newDeck);
    setCurrentCard(null);
    setDrawnCount(0);
    setGameState('drawing');
  }, []);

  const drawCard = useCallback(() => {
    if (deck.length === 0) return;
    const card = deck[deck.length - 1];
    setDeck(deck.slice(0, -1));
    setCurrentCard(card);
    setDrawnCount((n) => n + 1);
    setGameState('revealed');
  }, [deck]);

  const nextCard = useCallback(() => {
    setCurrentCard(null);
    setGameState(deck.length === 0 ? 'empty' : 'drawing');
  }, [deck.length]);

  // Restart from the empty-deck screen without going back to the start screen
  const shuffleAgain = useCallback(() => {
    const newDeck = generateDeck();
    setDeck(newDeck);
    setCurrentCard(null);
    setDrawnCount(0);
    setGameState('drawing');
  }, []);

  const resetGame = useCallback(() => {
    setGameState('start');
    setDeck([]);
    setCurrentCard(null);
    setDrawnCount(0);
  }, []);

  return {
    gameState,
    currentCard,
    drawnCount,
    totalCards: DECK_SIZE,
    startGame,
    drawCard,
    nextCard,
    shuffleAgain,
    resetGame,
  };
}
