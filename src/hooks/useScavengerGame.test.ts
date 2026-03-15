import { describe, it, expect, beforeEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useScavengerGame } from './useScavengerGame';

const STORAGE_KEY = 'soc-scavenger-v1';

beforeEach(() => {
  localStorage.clear();
});

describe('useScavengerGame', () => {
  describe('initial state', () => {
    it('starts in the start state', () => {
      const { result } = renderHook(() => useScavengerGame());
      expect(result.current.gameState).toBe('start');
    });

    it('starts with an empty items array', () => {
      const { result } = renderHook(() => useScavengerGame());
      expect(result.current.items).toHaveLength(0);
    });

    it('starts with markedCount of 0', () => {
      const { result } = renderHook(() => useScavengerGame());
      expect(result.current.markedCount).toBe(0);
    });

    it('starts with totalCount of 0', () => {
      const { result } = renderHook(() => useScavengerGame());
      expect(result.current.totalCount).toBe(0);
    });
  });

  describe('startGame', () => {
    it('transitions gameState to playing', () => {
      const { result } = renderHook(() => useScavengerGame());
      act(() => result.current.startGame());
      expect(result.current.gameState).toBe('playing');
    });

    it('populates items with 24 entries', () => {
      const { result } = renderHook(() => useScavengerGame());
      act(() => result.current.startGame());
      expect(result.current.items).toHaveLength(24);
    });

    it('sets totalCount to 24', () => {
      const { result } = renderHook(() => useScavengerGame());
      act(() => result.current.startGame());
      expect(result.current.totalCount).toBe(24);
    });

    it('starts with markedCount of 0 after starting', () => {
      const { result } = renderHook(() => useScavengerGame());
      act(() => result.current.startGame());
      expect(result.current.markedCount).toBe(0);
    });

    it('all items start unmarked', () => {
      const { result } = renderHook(() => useScavengerGame());
      act(() => result.current.startGame());
      result.current.items.forEach((item) => {
        expect(item.isMarked).toBe(false);
      });
    });
  });

  describe('toggleItem', () => {
    it('marks an unmarked item', () => {
      const { result } = renderHook(() => useScavengerGame());
      act(() => result.current.startGame());
      const id = result.current.items[0].id;
      act(() => result.current.toggleItem(id));
      expect(result.current.items[0].isMarked).toBe(true);
    });

    it('unmarks a marked item (toggle)', () => {
      const { result } = renderHook(() => useScavengerGame());
      act(() => result.current.startGame());
      const id = result.current.items[0].id;
      act(() => result.current.toggleItem(id));
      act(() => result.current.toggleItem(id));
      expect(result.current.items[0].isMarked).toBe(false);
    });

    it('increments markedCount when marking', () => {
      const { result } = renderHook(() => useScavengerGame());
      act(() => result.current.startGame());
      act(() => result.current.toggleItem(result.current.items[0].id));
      expect(result.current.markedCount).toBe(1);
    });

    it('decrements markedCount when unmarking', () => {
      const { result } = renderHook(() => useScavengerGame());
      act(() => result.current.startGame());
      const id = result.current.items[0].id;
      act(() => result.current.toggleItem(id));
      act(() => result.current.toggleItem(id));
      expect(result.current.markedCount).toBe(0);
    });

    it('does not affect other items', () => {
      const { result } = renderHook(() => useScavengerGame());
      act(() => result.current.startGame());
      act(() => result.current.toggleItem(result.current.items[0].id));
      const otherItems = result.current.items.slice(1);
      otherItems.forEach((item) => {
        expect(item.isMarked).toBe(false);
      });
    });
  });

  describe('resetGame', () => {
    it('transitions gameState back to start', () => {
      const { result } = renderHook(() => useScavengerGame());
      act(() => result.current.startGame());
      act(() => result.current.resetGame());
      expect(result.current.gameState).toBe('start');
    });

    it('clears items', () => {
      const { result } = renderHook(() => useScavengerGame());
      act(() => result.current.startGame());
      act(() => result.current.resetGame());
      expect(result.current.items).toHaveLength(0);
    });

    it('resets markedCount to 0', () => {
      const { result } = renderHook(() => useScavengerGame());
      act(() => result.current.startGame());
      act(() => result.current.toggleItem(result.current.items[0].id));
      act(() => result.current.resetGame());
      expect(result.current.markedCount).toBe(0);
    });
  });

  describe('localStorage persistence', () => {
    it('persists gameState and items to localStorage after startGame', () => {
      const { result } = renderHook(() => useScavengerGame());
      act(() => result.current.startGame());
      const saved = localStorage.getItem(STORAGE_KEY);
      expect(saved).not.toBeNull();
      const parsed = JSON.parse(saved!);
      expect(parsed.gameState).toBe('playing');
      expect(parsed.items).toHaveLength(24);
    });

    it('persists toggled item state to localStorage', () => {
      const { result } = renderHook(() => useScavengerGame());
      act(() => result.current.startGame());
      act(() => result.current.toggleItem(result.current.items[0].id));
      const saved = JSON.parse(localStorage.getItem(STORAGE_KEY)!);
      expect(saved.items[0].isMarked).toBe(true);
    });

    it('hydrates state from localStorage on mount', () => {
      // Seed localStorage with a playing state
      const items = Array.from({ length: 24 }, (_, i) => ({
        id: i,
        text: `question ${i}`,
        isMarked: i < 3,
        isFreeSpace: false,
      }));
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({ version: 1, gameState: 'playing', items })
      );

      const { result } = renderHook(() => useScavengerGame());
      expect(result.current.gameState).toBe('playing');
      expect(result.current.items).toHaveLength(24);
      expect(result.current.markedCount).toBe(3);
    });

    it('falls back to start state when localStorage has invalid data', () => {
      localStorage.setItem(STORAGE_KEY, 'not-valid-json{{{');
      const { result } = renderHook(() => useScavengerGame());
      expect(result.current.gameState).toBe('start');
    });

    it('falls back to start state when version does not match', () => {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({ version: 99, gameState: 'playing', items: [] })
      );
      const { result } = renderHook(() => useScavengerGame());
      expect(result.current.gameState).toBe('start');
    });
  });
});
