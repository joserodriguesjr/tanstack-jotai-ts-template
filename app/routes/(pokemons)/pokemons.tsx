import SearchInput from "@/modules/pokemon/components/SearchInput";
import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/(pokemons)/pokemons")({
  component: () => (
    <div>
      <PokemonHeader />
      <Outlet />
    </div>
  ),
});

const PokemonHeader = () => {
  return (
    <header className="bg-gray-500 shadow-md sticky top-0 z-50">
      <div className="max-w-6xl mx-auto flex justify-between items-center p-4">
        <a
          href="/"
          className="text-white text-2xl font-bold flex items-center gap-2"
        >
          {/* <img src="/pokeball.svg" alt="Pokeball" className="w-8 h-8" /> */}
          PokéDex
        </a>

        <SearchInput />

        <nav className="hidden md:flex gap-6">
          <a
            href="/pokemons"
            className="text-white font-medium hover:underline"
          >
            All Pokémon
          </a>
          <a href="/types" className="text-white font-medium hover:underline">
            Types
          </a>
          <a href="/about" className="text-white font-medium hover:underline">
            About
          </a>
        </nav>
      </div>
    </header>
  );
};

export default PokemonHeader;
