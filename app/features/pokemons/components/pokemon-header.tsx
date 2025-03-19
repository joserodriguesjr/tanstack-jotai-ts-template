import { Link } from '@tanstack/react-router';
import { useSetAtom } from 'jotai';
import debounce from 'lodash.debounce';
import { Search } from 'lucide-react';

import { BrasilFlag, EuaFlag } from '@/assets';
import { Button } from '@/components/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/sheet';
import { searchAtom } from '@/features/pokemons/pokemons.filters';
import { useTheme } from '@/hooks/use-theme';
import { useTranslate } from '@/lib/i18n';

export const PokemonHeader = () => {
  const { theme, onToggleTheme } = useTheme();
  const { language, onChangeLanguage, translator } = useTranslate();
  const setSearch = useSetAtom(searchAtom);
  const onChangeSearch = debounce(
    (e: React.ChangeEvent<HTMLInputElement>) => setSearch(e.target.value),
    350,
  );

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
        <div className="hidden items-center rounded-lg bg-gray-700 px-3 py-2 sm:flex">
          <Search className="mr-2 h-5 w-5 text-white" />
          <input
            type="text"
            placeholder={translator({ path: 'pokemons.header.searchBar' })}
            onChange={onChangeSearch}
            className="bg-transparent text-white placeholder-gray-300 outline-none"
          />
        </div>

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
