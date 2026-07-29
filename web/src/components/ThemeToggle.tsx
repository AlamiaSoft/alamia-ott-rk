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
    return <div className="w-16 h-7 bg-brand-surface rounded-full border border-brand-border animate-pulse" />;
  }

  return (
    <div className="flex items-center bg-brand-surface p-0.5 rounded-full border border-brand-border text-brand-muted text-xs shadow-inner">
      <button
        onClick={() => handleModeChange('auto')}
        title="Auto System Mode"
        aria-label="Auto System Mode"
        className={`p-1.5 rounded-full transition-all ${
          mode === 'auto'
            ? 'bg-brand-accent text-brand-dark shadow'
            : 'hover:text-white hover:bg-brand-card/50'
        }`}
      >
        <Monitor className="w-3.5 h-3.5" />
      </button>

      <button
        onClick={() => handleModeChange('dark')}
        title="Dark Mode"
        aria-label="Dark Mode"
        className={`p-1.5 rounded-full transition-all ${
          mode === 'dark'
            ? 'bg-brand-accent text-brand-dark shadow'
            : 'hover:text-white hover:bg-brand-card/50'
        }`}
      >
        <Moon className="w-3.5 h-3.5" />
      </button>

      <button
        onClick={() => handleModeChange('light')}
        title="Light Mode"
        aria-label="Light Mode"
        className={`p-1.5 rounded-full transition-all ${
          mode === 'light'
            ? 'bg-brand-accent text-brand-dark shadow'
            : 'hover:text-white hover:bg-brand-card/50'
        }`}
      >
        <Sun className="w-3.5 h-3.5" />
      </button>
    </div>
  );
}

export default ThemeToggle;
