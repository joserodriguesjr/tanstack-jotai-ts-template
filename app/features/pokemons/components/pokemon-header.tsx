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
    <header className="bg-gray-800 shadow-md sticky top-0 z-50">
      <div className="max-w-6xl mx-auto flex justify-between items-center p-4">
        {/* Logo */}
        <Link
          to="/"
          className="text-white text-2xl font-bold flex items-center gap-2"
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
              className={`w-6 h-6 cursor-pointer transition-all ${language === 'pt-BR' ? '' : 'grayscale opacity-50'}`}
            />
          </button>

          <button
            onClick={() => onChangeLanguage('en-US')}
            aria-label="Switch to English"
          >
            <img
              src={EuaFlag}
              alt="US flag"
              className={`w-6 h-6 cursor-pointer transition-all ${language === 'en-US' ? '' : 'grayscale opacity-50'}`}
            />
          </button>
        </div>

        <Button variant={'noBackground'} size={'icon'} onClick={onToggleTheme}>
          {theme === 'light' ? '🌙' : '☀️'}
        </Button>

        {/* Barra de pesquisa */}
        <div className="hidden sm:flex items-center bg-gray-700 px-3 py-2 rounded-lg">
          <Search className="text-white w-5 h-5 mr-2" />
          <input
            type="text"
            placeholder={translator({ path: 'pokemons.header.searchBar' })}
            onChange={onChangeSearch}
            className="bg-transparent outline-none text-white placeholder-gray-300"
          />
        </div>

        {/* Menu desktop */}
        <nav className="hidden md:flex gap-6">
          <Link
            to="/pokemons"
            className="text-white font-medium hover:underline"
          >
            {translator({ path: 'pokemons.header.allPokemons' })}
          </Link>
          <Link
            to="/pokemons/types"
            className="text-white font-medium hover:underline"
          >
            {translator({ path: 'pokemons.header.types' })}
          </Link>
          <Link
            to="/pokemons/about"
            className="text-white font-medium hover:underline"
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
              className="md:hidden text-white"
            >
              ☰
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="bg-gray-900 text-white p-6">
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
