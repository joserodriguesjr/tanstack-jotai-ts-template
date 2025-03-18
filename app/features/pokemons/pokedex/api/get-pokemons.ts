import { useMemo } from "react";
import { useAtomValue } from "jotai";
import { useInfiniteQuery } from "@tanstack/react-query";
import { infiniteQueryOptions } from "@tanstack/react-query";
import { getAllPokemonsAction } from "../../server/pokemon.server";
import { searchAtom } from "../../pokemons-filters.atom";
import { useInfiniteScroll } from "../use-infinite-scroll";

export const fetchInfinitePokemonsOptions = (search = "") => {
    return infiniteQueryOptions({
        queryKey: ["pokemon", search ?? ""],
        queryFn: async ( {pageParam} ) => {
            const result = await getAllPokemonsAction({ data: { search, pageParam } })

            // TODO: cache or not cache?
            // result.content.map((pokemon) => {
            //     const pokemonKey = ["pokemon", pokemon.englishName]
            //     client.setQueryData(pokemonKey, pokemon)
            // })
        
            return {
                content: result.content,
                nextPage: 
                    result.pagination.page < result.pagination.totalPages ? pageParam + 1 : null,
            };
        },
        getNextPageParam: (lastPage) => lastPage.nextPage ?? undefined,
        initialPageParam: 1
    })
}

export const usePokedexList = () => {
    const search = useAtomValue(searchAtom)

    const { data, fetchNextPage, hasNextPage, isFetchingNextPage } = useInfiniteQuery({
        ...fetchInfinitePokemonsOptions(search)
    });
    
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
