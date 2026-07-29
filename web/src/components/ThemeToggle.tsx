'use client';

import React, { useEffect, useState } from 'react';
import { Sun, Moon, Monitor } from 'lucide-react';

type ThemeMode = 'auto' | 'dark' | 'light';

export function ThemeToggle() {
  const [mode, setMode] = useState<ThemeMode>('auto');
  const [mounted, setMounted] = useState(false);

  const applyTheme = (targetMode: ThemeMode) => {
    const root = document.documentElement;
    if (targetMode === 'dark') {
      root.classList.add('dark');
      root.classList.remove('light');
    } else if (targetMode === 'light') {
      root.classList.add('light');
      root.classList.remove('dark');
    } else {
      // Auto / System preference
      const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      if (systemPrefersDark) {
        root.classList.add('dark');
        root.classList.remove('light');
      } else {
        root.classList.add('light');
        root.classList.remove('dark');
      }
    }
  };

  useEffect(() => {
    setMounted(true);
    const savedMode = (localStorage.getItem('checkmate_theme_mode') as ThemeMode) || 'auto';
    setMode(savedMode);
    applyTheme(savedMode);

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleSystemChange = () => {
      const currentMode = (localStorage.getItem('checkmate_theme_mode') as ThemeMode) || 'auto';
      if (currentMode === 'auto') {
        applyTheme('auto');
      }
    };

    mediaQuery.addEventListener('change', handleSystemChange);
    return () => mediaQuery.removeEventListener('change', handleSystemChange);
  }, []);

  const handleModeChange = (newMode: ThemeMode) => {
    setMode(newMode);
    localStorage.setItem('checkmate_theme_mode', newMode);
    applyTheme(newMode);
  };

  if (!mounted) {
    return <div className="w-24 h-8 bg-brand-surface rounded-full border border-brand-border animate-pulse" />;
  }

  return (
    <div className="flex items-center bg-brand-surface/80 p-1 rounded-full border border-brand-border text-brand-muted text-xs">
      <button
        onClick={() => handleModeChange('auto')}
        title="Auto System Mode"
        className={`flex items-center gap-1 px-2.5 py-1 rounded-full transition-all ${
          mode === 'auto'
            ? 'bg-brand-accent text-brand-dark font-bold shadow-sm'
            : 'hover:text-white'
        }`}
      >
        <Monitor className="w-3.5 h-3.5" />
        <span className="hidden sm:inline">Auto</span>
      </button>

      <button
        onClick={() => handleModeChange('dark')}
        title="Dark Mode"
        className={`flex items-center gap-1 px-2.5 py-1 rounded-full transition-all ${
          mode === 'dark'
            ? 'bg-brand-accent text-brand-dark font-bold shadow-sm'
            : 'hover:text-white'
        }`}
      >
        <Moon className="w-3.5 h-3.5" />
        <span className="hidden sm:inline">Dark</span>
      </button>

      <button
        onClick={() => handleModeChange('light')}
        title="Light Mode"
        className={`flex items-center gap-1 px-2.5 py-1 rounded-full transition-all ${
          mode === 'light'
            ? 'bg-brand-accent text-brand-dark font-bold shadow-sm'
            : 'hover:text-white'
        }`}
      >
        <Sun className="w-3.5 h-3.5" />
        <span className="hidden sm:inline">Light</span>
      </button>
    </div>
  );
}

export default ThemeToggle;
