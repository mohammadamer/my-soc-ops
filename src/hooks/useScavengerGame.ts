import { useState, useCallback, useMemo, useEffect } from 'react';
import type { BingoSquareData } from '../types';
import { generateScavengerList, toggleSquare } from '../utils/bingoLogic';

export interface ScavengerGameState {
  gameState: 'start' | 'playing';
  items: BingoSquareData[];
  markedCount: number;
  totalCount: number;
}

export interface ScavengerGameActions {
  startGame: () => void;
  toggleItem: (id: number) => void;
  resetGame: () => void;
}

const STORAGE_KEY = 'soc-scavenger-v1';
const STORAGE_VERSION = 1;

interface StoredScavengerData {
  version: number;
  gameState: 'start' | 'playing';
  items: BingoSquareData[];
}

function validateStoredData(data: unknown): data is StoredScavengerData {
  if (!data || typeof data !== 'object') return false;
  const obj = data as Record<string, unknown>;
  if (obj.version !== STORAGE_VERSION) return false;
  if (typeof obj.gameState !== 'string' || !['start', 'playing'].includes(obj.gameState)) return false;
  if (!Array.isArray(obj.items) || (obj.items.length !== 0 && obj.items.length !== 24)) return false;
  return obj.items.every((sq: unknown) => {
    if (!sq || typeof sq !== 'object') return false;
    const s = sq as Record<string, unknown>;
    return (
      typeof s.id === 'number' &&
      typeof s.text === 'string' &&
      typeof s.isMarked === 'boolean' &&
      typeof s.isFreeSpace === 'boolean'
    );
  });
}

function loadState(): Pick<StoredScavengerData, 'gameState' | 'items'> | null {
  if (typeof window === 'undefined') return null;
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (!saved) return null;
    const parsed = JSON.parse(saved);
    if (validateStoredData(parsed)) {
      return { gameState: parsed.gameState, items: parsed.items };
    }
    localStorage.removeItem(STORAGE_KEY);
  } catch {
    if (typeof window !== 'undefined') localStorage.removeItem(STORAGE_KEY);
  }
  return null;
}

function saveState(gameState: 'start' | 'playing', items: BingoSquareData[]): void {
  if (typeof window === 'undefined') return;
  try {
    const data: StoredScavengerData = { version: STORAGE_VERSION, gameState, items };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch {
    // non-critical
  }
}

export function useScavengerGame(): ScavengerGameState & ScavengerGameActions {
  const loadedState = useMemo(() => loadState(), []);

  const [gameState, setGameState] = useState<'start' | 'playing'>(
    () => loadedState?.gameState ?? 'start'
  );
  const [items, setItems] = useState<BingoSquareData[]>(
    () => loadedState?.items ?? []
  );

  useEffect(() => {
    saveState(gameState, items);
  }, [gameState, items]);

  const markedCount = useMemo(() => items.filter((i) => i.isMarked).length, [items]);
  const totalCount = items.length;

  const startGame = useCallback(() => {
    setItems(generateScavengerList());
    setGameState('playing');
  }, []);

  const toggleItem = useCallback((id: number) => {
    setItems((curr) => toggleSquare(curr, id));
  }, []);

  const resetGame = useCallback(() => {
    setGameState('start');
    setItems([]);
  }, []);

  return { gameState, items, markedCount, totalCount, startGame, toggleItem, resetGame };
}
