import { useAtom } from 'jotai';
import { atomWithStorage } from 'jotai/utils';
import { useEffect } from 'react';

import { Button } from 'src/shared/components/ui/button';

type Theme = 'light' | 'dark';
export const themeAtom = atomWithStorage<Theme>('theme', 'light');

export const ThemeSwitch = () => {
  const [theme, setTheme] = useAtom(themeAtom);

  const onToggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  return (
    <Button variant={'noBackground'} size={'icon'} onClick={onToggleTheme}>
      {theme === 'light' ? '🌙' : '☀️'}
    </Button>
  );
};
