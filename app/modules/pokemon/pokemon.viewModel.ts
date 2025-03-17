import { useMemo } from "react";
import { useAtomValue } from "jotai";
import { useInfiniteScroll } from "./hooks/useInfiniteScroll";
import { searchAtom } from "./filters.atom";
import { fetchPokemons } from "./pokemon.model";

export const usePokemonViewModel = () => { 
    const search = useAtomValue(searchAtom)
    const { data, fetchNextPage, hasNextPage, isFetchingNextPage } = fetchPokemons(search);

    const pokemons = useMemo(() => data?.pages.flatMap((page) => page.content) ?? [], [data]);
    const lastPokemonIndex = pokemons.length > 5 ? pokemons.length - 5 : 0;
  
    const { loadMoreRef } = useInfiniteScroll({
      onIntersect: fetchNextPage,
      hasMore: hasNextPage,
      isFetching: isFetchingNextPage,
    });

    return { 
        pokemons,
        lastPokemonIndex,
        loadMoreRef
    };   
}