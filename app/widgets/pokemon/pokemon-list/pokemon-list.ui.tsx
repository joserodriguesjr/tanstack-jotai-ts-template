import { useAtomValue, useSetAtom } from 'jotai';
import { useMemo } from 'react';

import { PokemonCard, usePokemons } from '@/entities/pokemon';
import {
  searchAtom,
  selectedPokemonAtom,
  useInfiniteScroll,
} from '@/features/pokemon';

export function PokemonList() {
  const setSelectedPokemon = useSetAtom(selectedPokemonAtom);
  const search = useAtomValue(searchAtom);

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } = usePokemons({
    search,
    queryConfig: {
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
    },
  });
  const pokemons = useMemo(
    () => data?.pages.flatMap((page) => page.content) ?? [],
    [data],
  );
  const lastPokemonIndex = pokemons.length > 5 ? pokemons.length - 5 : 0;

  const { loadMoreRef } = useInfiniteScroll({
    onIntersect: fetchNextPage,
    hasMore: hasNextPage,
    isFetching: isFetchingNextPage,
  });

  return (
    <div className="mx-auto grid max-w-4xl grid-cols-2 gap-4 p-6 md:grid-cols-3 lg:grid-cols-4">
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
  );
}
