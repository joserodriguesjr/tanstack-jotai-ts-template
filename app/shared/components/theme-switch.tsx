import { useAtom } from 'jotai';
import { atomWithStorage } from 'jotai/utils';
import { useEffect, useState } from 'react';

import { Button } from '@/shared/components/ui/button';

type Theme = 'light' | 'dark';
export const themeAtom = atomWithStorage<Theme>('theme', 'light');

export const ThemeSwitch = () => {
  const [mounted, setMounted] = useState(false);
  const [theme, setTheme] = useAtom(themeAtom);

  const onToggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  if (!mounted) {
    return null;
  }

  return (
    <Button variant={'noBackground'} size={'icon'} onClick={onToggleTheme}>
      {theme === 'light' ? '🌙' : '☀️'}
    </Button>
  );
};
