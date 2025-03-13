import { queryOptions, infiniteQueryOptions } from '@tanstack/react-query'
import { getPokemonAction, getAllPokemonsAction } from '../server/get-pokemons.server'

export const fetchAllPokemonsOptions = infiniteQueryOptions({
    queryKey: ['pokemons'],
    queryFn: async ({ pageParam }) => getAllPokemonsAction({ data: pageParam }),
    getNextPageParam: (_, __, lastPageParam, ) => lastPageParam + 1,
    initialPageParam: 1
})

export const fetchPokemonOptions = (pokemonName: string) => 
    queryOptions({
        queryKey: ['pokemon', pokemonName],
        queryFn: async () => {
            console.log("Running queryFn for pokemon", pokemonName);
            return getPokemonAction({ data: pokemonName });
        },        
})