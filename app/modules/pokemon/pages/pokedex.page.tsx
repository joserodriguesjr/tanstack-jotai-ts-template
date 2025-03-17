import { useSetAtom } from "jotai";

import { PokemonModal } from "../components/PokemonModal";
import { PokemonCard } from "../components/PokemonCard";
import { usePokemonViewModel } from "../pokemon.viewModel";
import { pokemonAtom } from "../filters.atom";

export function PokedexPage() {
  const { pokemons, lastPokemonIndex, loadMoreRef } = usePokemonViewModel();
  const setPokemon = useSetAtom(pokemonAtom);

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {pokemons.map((pokemon, index) => (
          <PokemonCard
            ref={index === lastPokemonIndex ? loadMoreRef : undefined}
            key={pokemon.nationalNumber}
            englishName={pokemon.englishName}
            nationalNumber={pokemon.nationalNumber}
            primaryType={pokemon.primaryType}
            secondaryType={pokemon.secondaryType}
            onClick={() => setPokemon(pokemon)}
          />
        ))}
      </div>
      <PokemonModal />
    </div>
  );
}
