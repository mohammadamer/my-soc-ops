# Soc Ops

Make in-person mixers less awkward and more fun with a fast social bingo game.

Players find people who match prompts on their board, mark squares, and race to 5 in a row.

👉 **[Follow the Lab Guide](.lab/GUIDE.md)** to customize prompts and run workshop steps.

## Why Soc Ops?

- Quick to start: open the app and play in minutes.
- Designed for group energy: prompts spark easy conversations.
- Familiar game loop: start → play → bingo celebration.
- Lightweight stack: React + TypeScript + Vite.

## How the game works

1. Start a new board.
2. Talk to people and find matches for prompts.
3. Mark squares as you confirm matches.
4. Hit bingo with 5 in a row.
5. Celebrate and start another round.

## Local development

### Prerequisites

- [Node.js 22](https://nodejs.org/) or higher

### Run locally

```bash
npm install
npm run dev
```

### Quality checks

```bash
npm run lint
npm run test
npm run build
```

## Tech stack

- React 19 + TypeScript
- Vite
- Tailwind CSS v4
- Vitest + Testing Library

## Deployment

GitHub Pages deploy runs automatically on pushes to `main` via [deploy workflow](.github/workflows/deploy.yml).

## Project structure

- `src/components` → UI screens and bingo board components
- `src/hooks/useBingoGame.ts` → game flow and state management
- `src/utils/bingoLogic.ts` → bingo rules and win detection
- `src/data/questions.ts` → question/prompt set

## Contributing

Issues and PRs are welcome. Start with [CONTRIBUTING.md](CONTRIBUTING.md).
