// components/ThemeToggle.tsx
import { useAtom } from 'jotai';
import { themeAtom } from '../atoms/theme.atom';
import { Button } from './ui/button';

const ThemeToggle = () => {
    const [theme, setTheme] = useAtom(themeAtom);

    const toggleTheme = () => {
        const newTheme = theme === 'light' ? 'dark' : 'light';
        setTheme(newTheme);
        document.documentElement.classList.toggle('dark', newTheme === 'dark');
    };

    return (
        <Button
            variant={'noBackground'}
            size={'icon'}
            onClick={toggleTheme}
        >
            {theme === 'light' ? '🌙' : '☀️'}
        </Button>
    );
};

export default ThemeToggle;
