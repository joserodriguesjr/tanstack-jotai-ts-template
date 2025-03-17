import { PokemonModal } from "./components/PokemonModal";
import { PokemonCard } from "./components/PokemonCard";
import type { UsePokedexViewModelReturn } from "./pokedex.viewModel";

export function PokedexView({
  pokemons,
  lastPokemonIndex,
  loadMoreRef,
  selectedPokemon,
  setSelectedPokemon }: UsePokedexViewModelReturn) {

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
      <PokemonModal pokemon={selectedPokemon} setSelectedPokemon={setSelectedPokemon} />
    </div>
  );
}
