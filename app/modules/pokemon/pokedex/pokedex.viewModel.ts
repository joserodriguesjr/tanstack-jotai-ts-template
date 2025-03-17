import { useMemo } from "react";
import { useAtom, useAtomValue } from "jotai";
import { useInfiniteScroll } from "../hooks/useInfiniteScroll";
import { searchAtom, selectedPokemonAtom } from "../filters.atom";
import { useInfiniteQuery } from "@tanstack/react-query";
import type { Pokemon } from "../pokemon.schema";
import type { fetchPokemons } from "./pokedex.model";

export interface UsePokedexViewModelReturn {
    pokemons: Pokemon[];
    lastPokemonIndex: number;
    loadMoreRef: React.RefObject<HTMLDivElement | null>;
    selectedPokemon: Pokemon | null;
    setSelectedPokemon: (pokemon: Pokemon | null) => void;
}

export const usePokedexViewModel = (
    fetchPokemonsFn: (search?: string) => ReturnType<typeof fetchPokemons>
): UsePokedexViewModelReturn => {
    const search = useAtomValue(searchAtom)

    const { data, fetchNextPage, hasNextPage, isFetchingNextPage } = useInfiniteQuery(fetchPokemonsFn(search));
    const pokemons = useMemo(() => data?.pages.flatMap((page) => page.content) ?? [], [data]);

    const lastPokemonIndex = pokemons.length > 5 ? pokemons.length - 5 : 0;
  
    const { loadMoreRef } = useInfiniteScroll({
      onIntersect: fetchNextPage,
      hasMore: hasNextPage,
      isFetching: isFetchingNextPage,
    });

    const [selectedPokemon, setSelectedPokemon] = useAtom(selectedPokemonAtom);

    return { 
        pokemons,
        lastPokemonIndex,
        loadMoreRef,
        selectedPokemon,
        setSelectedPokemon
    };   
}
