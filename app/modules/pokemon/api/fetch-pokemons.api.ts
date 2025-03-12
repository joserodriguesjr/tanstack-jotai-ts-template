import { queryOptions, infiniteQueryOptions } from '@tanstack/react-query'
import { getPokemonAction, getAllPokemonsAction } from './server/get-pokemons.server'
import { queryClient } from '@/router';
import type { Pokemon } from "@/modules/pokemon/pokemon.schema";

export const fetchAllPokemonsOptions = infiniteQueryOptions({
    queryKey: ['pokemons'],
    queryFn: async ({ pageParam }) => getAllPokemonsAction({ data: pageParam }),
    getNextPageParam: (_, __, lastPageParam, ) => lastPageParam + 1,
    initialPageParam: 1
})

export const fetchPokemonOptions = (pokemonName: string) => 
    queryOptions({
        queryKey: ['pokemon', pokemonName],
        queryFn: async ({ queryKey }) => {
            const name = queryKey[1];

            const cachedPokemons = queryClient.getQueryData<{pages: Pokemon[]}>(['pokemons']);
            
            const foundPokemon = cachedPokemons?.pages
                .flatMap(page => page)
                .find(pokemon => pokemon.englishName.toLowerCase() === name.toLowerCase());

            if (foundPokemon) {
                return foundPokemon;
            }

            return getPokemonAction({ data: pokemonName });
        },
})