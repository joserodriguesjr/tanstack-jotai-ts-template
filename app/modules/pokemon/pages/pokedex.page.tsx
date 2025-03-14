import { useMemo } from "react";

import { useAtomValue, useSetAtom } from "jotai";

import { pokemonsAtom } from "../atoms/pokemons.atom";
import { PokemonModal } from "../components/PokemonModal";
import { PokemonCard } from "../components/PokemonCard";
import { useInfiniteScroll } from "../hooks/useInfiniteScroll";
import { pokemonAtom } from "../atoms/pokemon.atom";

export function PokedexPage() {
  const setPokemon = useSetAtom(pokemonAtom);
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } = useAtomValue(pokemonsAtom);

  const pokemons = useMemo(() => data.pages.flatMap((page) => page.content), [data]);

  const lastPokemonIndex = pokemons.length > 5 ? pokemons.length - 5 : 0;

  const { loadMoreRef } = useInfiniteScroll({
    onIntersect: fetchNextPage,
    hasMore: hasNextPage,
    isFetching: isFetchingNextPage,
  });

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
