import { useState, useEffect } from "react";
import { themes } from "../theme";
import type { Theme } from "../theme";

export function ThemePicker({ onThemeChange }: { onThemeChange: (theme: Theme) => void }) {
  const [selected, setSelected] = useState<number>(0);

  // Only set state from localStorage on mount, not in effect
  useEffect(() => {
    const saved = localStorage.getItem("socops-theme");
    if (saved && !isNaN(Number(saved))) {
      setSelected(Number(saved));
    }
  }, []);

  useEffect(() => {
    onThemeChange(themes[selected]);
    localStorage.setItem("socops-theme", String(selected));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selected]);

  return (
    <div className="flex gap-2 items-center py-2">
      <span className="text-xs font-semibold">Theme:</span>
      <select
        className="rounded px-2 py-1 border border-gray-300 bg-white text-xs"
        value={selected}
        onChange={e => setSelected(Number(e.target.value))}
        aria-label="Select theme"
      >
        {themes.map((t, i) => (
          <option key={t.name} value={i}>{t.name}</option>
        ))}
      </select>
    </div>
  );
}
