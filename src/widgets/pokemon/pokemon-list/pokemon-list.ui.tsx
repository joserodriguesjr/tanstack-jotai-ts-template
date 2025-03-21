import { useAtomValue, useSetAtom } from 'jotai';
import { useMemo } from 'react';

import { usePokemons } from '@/entities/pokemon/api/get-pokemons';
import { PokemonCard } from '@/entities/pokemon/ui/pokemon-card';
import { useInfiniteScroll } from '@/features/pokemon/infinite-pokemon/infinite-pokemon.model';
import { searchAtom } from '@/features/pokemon/search-pokemon/search-pokemon.model';
import { selectedPokemonAtom } from '@/features/pokemon/select-pokemon/select-pokemon.model';

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
    <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
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
