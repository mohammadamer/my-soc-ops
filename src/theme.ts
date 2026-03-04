// Theme system for Soc Ops Bingo
// Defines theme tokens, palettes, and font stacks for creative UI redesign

export type Theme = {
  name: string;
  colors: {
    bg: string;
    fg: string;
    accent: string;
    accent2?: string;
    border: string;
    squareBg: string;
    squareFg: string;
    modalBg: string;
    modalFg: string;
    buttonBg: string;
    buttonFg: string;
    freeSpaceBg?: string;
    freeSpaceFg?: string;
  };
  font: string;
  effects?: {
    boxShadow?: string;
    borderRadius?: string;
    backdrop?: string;
    extra?: string;
  };
};

export const themes: Theme[] = [
  {
    name: "Vaporwave Sunset",
    colors: {
      bg: "#2d1e4f",
      fg: "#fff1fa",
      accent: "#ff8ec7",
      accent2: "#ffd580",
      border: "#ff8ec7",
      squareBg: "#4b2e83",
      squareFg: "#fff1fa",
      modalBg: "#ff8ec7cc",
      modalFg: "#2d1e4f",
      buttonBg: "#ffd580",
      buttonFg: "#2d1e4f",
      freeSpaceBg: "#ff8ec7",
      freeSpaceFg: "#fff1fa"
    },
    font: "'Satoshi', 'Montserrat', sans-serif",
    effects: {
      boxShadow: "0 4px 32px 0 #ff8ec7aa",
      borderRadius: "1.5rem",
      backdrop: "blur(8px)",
      extra: "bg-gradient-to-br from-[#ff8ec7] to-[#ffd580]"
    }
  },
  {
    name: "Brutalist Blocks",
    colors: {
      bg: "#f3f3f3",
      fg: "#222",
      accent: "#ff004f",
      accent2: "#00e0ff",
      border: "#222",
      squareBg: "#fff",
      squareFg: "#222",
      modalBg: "#fff",
      modalFg: "#222",
      buttonBg: "#ff004f",
      buttonFg: "#fff",
      freeSpaceBg: "#00e0ff",
      freeSpaceFg: "#222"
    },
    font: "'Space Mono', 'IBM Plex Mono', monospace",
    effects: {
      boxShadow: "none",
      borderRadius: "0.25rem",
      extra: "border-2 border-[#222]"
    }
  },
  {
    name: "Dark Mode Noir",
    colors: {
      bg: "#18181b",
      fg: "#e5e7eb",
      accent: "#6366f1",
      accent2: "#f43f5e",
      border: "#27272a",
      squareBg: "#27272a",
      squareFg: "#e5e7eb",
      modalBg: "#18181bcc",
      modalFg: "#e5e7eb",
      buttonBg: "#6366f1",
      buttonFg: "#fff",
      freeSpaceBg: "#f43f5e",
      freeSpaceFg: "#fff"
    },
    font: "'Inter', 'Roboto', sans-serif",
    effects: {
      boxShadow: "0 2px 16px 0 #000a",
      borderRadius: "0.75rem"
    }
  },
  {
    name: "Playful Candy Pop",
    colors: {
      bg: "#fff0f6",
      fg: "#ff5ca7",
      accent: "#ffb347",
      accent2: "#7afcff",
      border: "#ff5ca7",
      squareBg: "#ffe3ee",
      squareFg: "#ff5ca7",
      modalBg: "#ffb347cc",
      modalFg: "#ff5ca7",
      buttonBg: "#7afcff",
      buttonFg: "#ff5ca7",
      freeSpaceBg: "#ffb347",
      freeSpaceFg: "#fff"
    },
    font: "'Baloo 2', 'Comic Neue', cursive",
    effects: {
      boxShadow: "0 4px 24px 0 #ff5ca7aa",
      borderRadius: "2rem"
    }
  },
  {
    name: "Scandinavian Calm",
    colors: {
      bg: "#f6f7f9",
      fg: "#2e3a4a",
      accent: "#a3c9a8",
      accent2: "#e2eafc",
      border: "#dbe2ef",
      squareBg: "#e2eafc",
      squareFg: "#2e3a4a",
      modalBg: "#a3c9a8cc",
      modalFg: "#2e3a4a",
      buttonBg: "#a3c9a8",
      buttonFg: "#2e3a4a",
      freeSpaceBg: "#e2eafc",
      freeSpaceFg: "#2e3a4a"
    },
    font: "'Nunito', 'Quicksand', sans-serif",
    effects: {
      boxShadow: "0 2px 12px 0 #a3c9a866",
      borderRadius: "1rem"
    }
  }
];

export const defaultTheme = themes[0];
