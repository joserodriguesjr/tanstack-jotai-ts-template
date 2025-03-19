import { useAtomValue, useSetAtom } from 'jotai';
import { useMemo } from 'react';

import { usePokemons } from '@/features/pokemons/api/get-pokemons';
import { PokemonCard } from '@/features/pokemons/components/pokemon-card';
import { PokemonModal } from '@/features/pokemons/components/pokemon-modal';
import { useInfiniteScroll } from '@/features/pokemons/hooks/use-infinite-scroll';
import {
  searchAtom,
  selectedPokemonAtom,
} from '@/features/pokemons/pokemons.filters';

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
