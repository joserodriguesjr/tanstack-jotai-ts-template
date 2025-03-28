import { Link } from '@tanstack/react-router';
import { RefreshCw } from 'lucide-react';

import { SearchPokemon } from '@/features/pokemon';
import { LanguageSwitch } from '@/shared/components/language-switch';
import { ThemeSwitch } from '@/shared/components/theme-switch';
import { Button } from '@/shared/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from '@/shared/components/ui/sheet';
import { useI18n } from '@/shared/hooks/use-i18n';

// todo: remove this shi
export default function HardReloadButton() {
  const handleReload = () => {
    const SW_NAME = '::pokedexServiceWorker';
    const VERSION = 'v0.0.1';
    const CACHE_NAME = VERSION + SW_NAME;

    window.caches.delete(CACHE_NAME);
    window.location.replace(window.location.pathname);
  };

  return (
    <Button
      onClick={handleReload}
      variant="noBackground"
      className="flex items-center gap-2"
    >
      <RefreshCw className="h-4 w-4" color="white" />
    </Button>
  );
}

export const PokemonHeader = () => {
  const { translator } = useI18n();

  return (
    <header className="sticky top-0 z-50 bg-gray-800 shadow-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between p-4">
        {/* Logo */}
        <Link
          to="/"
          className="flex items-center gap-2 text-2xl font-bold text-white"
        >
          {/* <img src="/pokeball.svg" alt="Pokeball" className="w-8 h-8" /> */}
          PokéDex
        </Link>
        <HardReloadButton />

        {/* todo: create component from changing language */}
        <LanguageSwitch />

        {/* <Button variant={'noBackground'} size={'icon'} onClick={onToggleTheme}>
          {theme === 'light' ? '🌙' : '☀️'}
        </Button> */}
        <ThemeSwitch />

        {/* Barra de pesquisa */}
        <SearchPokemon />

        {/* Menu desktop */}
        <nav className="hidden gap-6 md:flex">
          <Link
            to="/pokemons"
            className="font-medium text-white hover:underline"
          >
            {translator('pokemons.header.allPokemons')}
          </Link>
          <Link
            to="/pokemons/types"
            className="font-medium text-white hover:underline"
          >
            {translator('pokemons.header.types')}
          </Link>
          <Link
            to="/pokemons/about"
            className="font-medium text-white hover:underline"
          >
            {translator('pokemons.header.about')}
          </Link>
        </nav>

        {/* Menu mobile */}
        <Sheet>
          <SheetTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="text-white md:hidden"
            >
              ☰
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="bg-gray-900 p-6 text-white">
            <nav className="flex flex-col gap-4">
              <Link
                to="/pokemons"
                className="text-lg font-medium hover:underline"
              >
                {translator('pokemons.header.allPokemons')}
              </Link>
              <Link
                to="/pokemons/types"
                className="text-lg font-medium hover:underline"
              >
                {translator('pokemons.header.types')}
              </Link>
              <Link
                to="/pokemons/about"
                className="text-lg font-medium hover:underline"
              >
                {translator('pokemons.header.about')}
              </Link>
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
};
