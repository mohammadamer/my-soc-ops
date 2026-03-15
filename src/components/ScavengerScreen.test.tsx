import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { ScavengerScreen } from './ScavengerScreen';
import type { BingoSquareData } from '../types';

function makeItems(count: number, markedUpTo = 0): BingoSquareData[] {
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    text: `question ${i + 1}`,
    isMarked: i < markedUpTo,
    isFreeSpace: false,
  }));
}

describe('ScavengerScreen', () => {
  describe('rendering', () => {
    it('renders the title', () => {
      render(
        <ScavengerScreen
          items={makeItems(3)}
          markedCount={0}
          totalCount={3}
          onToggle={vi.fn()}
          onReset={vi.fn()}
        />
      );
      expect(screen.getByText('Soc Ops')).toBeInTheDocument();
    });

    it('renders all items as buttons', () => {
      const items = makeItems(5);
      render(
        <ScavengerScreen
          items={items}
          markedCount={0}
          totalCount={5}
          onToggle={vi.fn()}
          onReset={vi.fn()}
        />
      );
      items.forEach((item) => {
        expect(screen.getByText(item.text)).toBeInTheDocument();
      });
    });

    it('renders the progress count label', () => {
      render(
        <ScavengerScreen
          items={makeItems(24)}
          markedCount={0}
          totalCount={24}
          onToggle={vi.fn()}
          onReset={vi.fn()}
        />
      );
      expect(screen.getByText('0 / 24 found')).toBeInTheDocument();
    });

    it('shows updated progress count when some items are marked', () => {
      render(
        <ScavengerScreen
          items={makeItems(24, 7)}
          markedCount={7}
          totalCount={24}
          onToggle={vi.fn()}
          onReset={vi.fn()}
        />
      );
      expect(screen.getByText('7 / 24 found')).toBeInTheDocument();
    });

    it('shows "All found!" message when complete', () => {
      const items = makeItems(24, 24);
      render(
        <ScavengerScreen
          items={items}
          markedCount={24}
          totalCount={24}
          onToggle={vi.fn()}
          onReset={vi.fn()}
        />
      );
      expect(screen.getByText('🎉 All found!')).toBeInTheDocument();
    });

    it('does not show "All found!" when incomplete', () => {
      render(
        <ScavengerScreen
          items={makeItems(24, 1)}
          markedCount={1}
          totalCount={24}
          onToggle={vi.fn()}
          onReset={vi.fn()}
        />
      );
      expect(screen.queryByText('🎉 All found!')).not.toBeInTheDocument();
    });
  });

  describe('accessibility', () => {
    it('unmarked items have aria-pressed="false"', () => {
      render(
        <ScavengerScreen
          items={makeItems(1)}
          markedCount={0}
          totalCount={1}
          onToggle={vi.fn()}
          onReset={vi.fn()}
        />
      );
      const btn = screen.getByText('question 1').closest('button')!;
      expect(btn).toHaveAttribute('aria-pressed', 'false');
    });

    it('marked items have aria-pressed="true"', () => {
      render(
        <ScavengerScreen
          items={makeItems(1, 1)}
          markedCount={1}
          totalCount={1}
          onToggle={vi.fn()}
          onReset={vi.fn()}
        />
      );
      const btn = screen.getByText('question 1').closest('button')!;
      expect(btn).toHaveAttribute('aria-pressed', 'true');
    });
  });

  describe('interactions', () => {
    it('calls onToggle with the item id when clicked', () => {
      const onToggle = vi.fn();
      render(
        <ScavengerScreen
          items={makeItems(3)}
          markedCount={0}
          totalCount={3}
          onToggle={onToggle}
          onReset={vi.fn()}
        />
      );
      fireEvent.click(screen.getByText('question 2').closest('button')!);
      expect(onToggle).toHaveBeenCalledOnce();
      expect(onToggle).toHaveBeenCalledWith(1); // id === index for makeItems
    });

    it('calls onReset when the Back button is clicked', () => {
      const onReset = vi.fn();
      render(
        <ScavengerScreen
          items={makeItems(3)}
          markedCount={0}
          totalCount={3}
          onToggle={vi.fn()}
          onReset={onReset}
        />
      );
      fireEvent.click(screen.getByText('← Back'));
      expect(onReset).toHaveBeenCalledOnce();
    });

    it('calls onToggle only for the clicked item, not others', () => {
      const onToggle = vi.fn();
      render(
        <ScavengerScreen
          items={makeItems(5)}
          markedCount={0}
          totalCount={5}
          onToggle={onToggle}
          onReset={vi.fn()}
        />
      );
      fireEvent.click(screen.getByText('question 3').closest('button')!);
      expect(onToggle).toHaveBeenCalledWith(2);
      expect(onToggle).toHaveBeenCalledTimes(1);
    });
  });
});
