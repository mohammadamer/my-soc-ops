import { questions, FREE_SPACE } from '../data/questions';
import type { BingoSquareData, BingoLine } from '../types';

// Re-export types for convenience
export type { BingoSquareData, BingoLine } from '../types';

const BOARD_SIZE = 5;
const CENTER_INDEX = 12; // 5x5 grid, center is index 12 (row 2, col 2)

/**
 * Shuffle an array using Fisher-Yates algorithm
 */
function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

/**
 * Generate a new 5x5 bingo board
 */
export function generateBoard(): BingoSquareData[] {
  const shuffledQuestions = shuffleArray(questions).slice(0, 24);
  const board: BingoSquareData[] = [];

  let questionIndex = 0;
  for (let i = 0; i < 25; i++) {
    if (i === CENTER_INDEX) {
      board.push({
        id: i,
        text: FREE_SPACE,
        isMarked: true,
        isFreeSpace: true,
      });
    } else {
      board.push({
        id: i,
        text: shuffledQuestions[questionIndex],
        isMarked: false,
        isFreeSpace: false,
      });
      questionIndex++;
    }
  }

  return board;
}

/**
 * Generate a flat list of 24 random questions for Scavenger Hunt mode.
 * No grid positions, no free space — just a shuffled subset.
 */
export function generateScavengerList(): BingoSquareData[] {
  const shuffled = shuffleArray(questions).slice(0, 24);
  return shuffled.map((text, i) => ({
    id: i,
    text,
    isMarked: false,
    isFreeSpace: false,
  }));
}

/**
 * Generate a shuffled deck of 24 question strings for Card Deck Shuffle mode.
 * Returns newest card at the end of the array so callers can pop() to draw.
 */
export function generateDeck(): string[] {
  return shuffleArray(questions).slice(0, 24);
}

/**
 * Toggle a square's marked state
 */
export function toggleSquare(board: BingoSquareData[], squareId: number): BingoSquareData[] {
  return board.map((square) =>
    square.id === squareId && !square.isFreeSpace
      ? { ...square, isMarked: !square.isMarked }
      : square
  );
}

/**
 * Get all possible winning lines
 */
function getWinningLines(): BingoLine[] {
  const lines: BingoLine[] = [];

  // Rows
  for (let row = 0; row < BOARD_SIZE; row++) {
    const squares = [];
    for (let col = 0; col < BOARD_SIZE; col++) {
      squares.push(row * BOARD_SIZE + col);
    }
    lines.push({ type: 'row', index: row, squares });
  }

  // Columns
  for (let col = 0; col < BOARD_SIZE; col++) {
    const squares = [];
    for (let row = 0; row < BOARD_SIZE; row++) {
      squares.push(row * BOARD_SIZE + col);
    }
    lines.push({ type: 'column', index: col, squares });
  }

  // Diagonal (top-left to bottom-right)
  lines.push({
    type: 'diagonal',
    index: 0,
    squares: [0, 6, 12, 18, 24],
  });

  // Diagonal (top-right to bottom-left)
  lines.push({
    type: 'diagonal',
    index: 1,
    squares: [4, 8, 12, 16, 20],
  });

  return lines;
}

/**
 * Check if there's a bingo and return the winning line(s)
 */
export function checkBingo(board: BingoSquareData[]): BingoLine | null {
  const lines = getWinningLines();

  for (const line of lines) {
    const isComplete = line.squares.every((idx) => board[idx].isMarked);
    if (isComplete) {
      return line;
    }
  }

  return null;
}

/**
 * Get the square IDs that are part of a winning line
 */
export function getWinningSquareIds(line: BingoLine | null): Set<number> {
  if (!line) return new Set();
  return new Set(line.squares);
}
