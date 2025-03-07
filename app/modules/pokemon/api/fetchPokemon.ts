import { queryOptions } from '@tanstack/react-query'
import { getPokemonAction } from '../actions/get-pokemon'

export const fetchPokemonOptions = (pokemonName: string) => 
    queryOptions({
        queryKey: ['pokemon', pokemonName],
        queryFn: async () => getPokemonAction({ data: pokemonName }),
})