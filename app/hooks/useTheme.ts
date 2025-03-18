import { useAtom } from "jotai";
import { atomWithStorage } from "jotai/utils";

type Theme = 'light' | 'dark';

export const themeAtom = atomWithStorage<Theme>('theme', 'light');

export const useTheme = () => {
    const [theme, setTheme] = useAtom(themeAtom)

    const onToggleTheme = () => {
        setTheme(prev => prev === 'light' ? 'dark' : 'light')
    }

    return {
        theme,
        onToggleTheme
    }
}