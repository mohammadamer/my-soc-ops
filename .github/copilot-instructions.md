# Soc Ops Copilot Workspace Instructions

## Mandatory development checklist
- [ ] `npm run lint`
- [ ] `npm run build`
- [ ] `npm run test`

## Project context
- This repo is a small React + TypeScript + Vite app for a social bingo game.
- Keep changes focused, minimal, and easy to review.

## Tech stack and architecture
- UI: React 19 with function components and hooks.
- Language: TypeScript (strict typing preferred, avoid `any`).
- Styling: Tailwind CSS v4 (`@import "tailwindcss"`, CSS-first tokens).
- Build tooling: Vite.
- Tests: Vitest + Testing Library.

## Code conventions
- Match existing style in nearby files (naming, formatting, import patterns).
- Prefer pure utility functions for game logic in `src/utils`.
- Keep stateful/game-flow logic in hooks (primarily `src/hooks/useBingoGame.ts`).
- Keep components presentational when possible (`src/components`).
- Avoid adding new dependencies unless clearly necessary.
- Do not add inline comments unless the code is non-obvious.

## UX and product scope
- Implement only the requested UX; do not add extra flows or features.
- Preserve current game behavior (start -> playing -> bingo) and free-space rules.
- Favor simple, accessible interactions and clear button/label text.

## Quality bar before handoff
- Run and pass:
  - `npm run lint`
  - `npm run build`
  - `npm run test`
- If a change affects behavior, update/add focused tests near the changed logic.

## File guidance
- Game flow and persistence: `src/hooks/useBingoGame.ts`
- Bingo rules and win detection: `src/utils/bingoLogic.ts`
- UI screens/components: `src/components/*`
- Static question set: `src/data/questions.ts`
- Shared types: `src/types/index.ts`

## What to avoid
- Do not refactor unrelated files.
- Do not rename public symbols/files without request.
- Do not commit secrets or environment-specific values.
