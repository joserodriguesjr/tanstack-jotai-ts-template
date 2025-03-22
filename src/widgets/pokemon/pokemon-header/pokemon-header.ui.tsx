import { Link } from '@tanstack/react-router';

import { SearchPokemon } from '@/features/pokemon/search-pokemon/search-pokemon.ui';
import { BrasilFlag, EuaFlag } from '@/shared/assets';
import { Button } from '@/shared/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from '@/shared/components/ui/sheet';
import { useTheme } from '@/shared/hooks/use-theme';
import { useTranslate } from '@/shared/lib/i18n';

export const PokemonHeader = () => {
  const { theme, onToggleTheme } = useTheme();
  const { language, onChangeLanguage, translator } = useTranslate();

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

        {/* todo: create component from changing language */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => onChangeLanguage('pt-BR')}
            aria-label="Switch to Portuguese"
          >
            <img
              src={BrasilFlag}
              alt="Brazilian flag"
              className={`h-6 w-6 cursor-pointer transition-all ${language === 'pt-BR' ? '' : 'opacity-50 grayscale'}`}
            />
          </button>

          <button
            onClick={() => onChangeLanguage('en-US')}
            aria-label="Switch to English"
          >
            <img
              src={EuaFlag}
              alt="US flag"
              className={`h-6 w-6 cursor-pointer transition-all ${language === 'en-US' ? '' : 'opacity-50 grayscale'}`}
            />
          </button>
        </div>

        <Button variant={'noBackground'} size={'icon'} onClick={onToggleTheme}>
          {theme === 'light' ? '🌙' : '☀️'}
        </Button>

        {/* Barra de pesquisa */}
        <SearchPokemon />

        {/* Menu desktop */}
        <nav className="hidden gap-6 md:flex">
          <Link
            to="/pokemons"
            className="font-medium text-white hover:underline"
          >
            {translator({ path: 'pokemons.header.allPokemons' })}
          </Link>
          <Link
            to="/pokemons/types"
            className="font-medium text-white hover:underline"
          >
            {translator({ path: 'pokemons.header.types' })}
          </Link>
          <Link
            to="/pokemons/about"
            className="font-medium text-white hover:underline"
          >
            {translator({ path: 'pokemons.header.about' })}
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
                {translator({ path: 'pokemons.header.allPokemons' })}
              </Link>
              <Link
                to="/pokemons/types"
                className="text-lg font-medium hover:underline"
              >
                {translator({ path: 'pokemons.header.types' })}
              </Link>
              <Link
                to="/pokemons/about"
                className="text-lg font-medium hover:underline"
              >
                {translator({ path: 'pokemons.header.about' })}
              </Link>
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
};
