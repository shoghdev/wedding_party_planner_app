import { useCallback, useEffect, useState } from 'react';
import type { ThemeMode } from '@/types/theme';

const STORAGE_KEY = 'dream-celebrate-theme';
const THEME_TRANSITION_MS = 450;

const enableThemeTransition = () => {
  document.documentElement.classList.add('theme-transitioning');
  window.setTimeout(() => {
    document.documentElement.classList.remove('theme-transitioning');
  }, THEME_TRANSITION_MS);
};

const getInitialMode = (): ThemeMode => {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored === 'light' || stored === 'dark') {
    return stored;
  }
  return 'light';
};

export const useThemeMode = () => {
  const [mode, setMode] = useState<ThemeMode>(getInitialMode);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, mode);
    document.documentElement.setAttribute('data-theme', mode);
  }, [mode]);

  const toggleMode = useCallback(() => {
    enableThemeTransition();
    setMode((current) => (current === 'light' ? 'dark' : 'light'));
  }, []);

  return { mode, toggleMode, setMode };
};
