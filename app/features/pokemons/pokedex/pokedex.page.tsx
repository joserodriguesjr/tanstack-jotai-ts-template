import { PokemonModal } from "./pokedex-modal.component";
import { PokemonCard } from "./pokedex-card.component";
import { useSetAtom } from "jotai";
import { selectedPokemonAtom } from "../pokemons-filters.atom";
import { usePokedexList } from "./api/get-pokemons";

export function PokedexPage() {
  const { pokemons, lastPokemonIndex, loadMoreRef } = usePokedexList()
  const setSelectedPokemon = useSetAtom(selectedPokemonAtom);

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
            onClick={() => setSelectedPokemon(pokemon)}
          />
        ))}
      </div>
      <PokemonModal />
    </div>
  );
}
