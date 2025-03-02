import { infiniteQueryOptions } from '@tanstack/react-query'
import { getPokemonsAction } from '../actions/get-pokemons'
import { atomWithSuspenseInfiniteQuery } from "jotai-tanstack-query"

export const fetchPokemonsOptions = infiniteQueryOptions({
    queryKey: ['pokemons'],
    queryFn: async ({ pageParam }) => getPokemonsAction({ data: pageParam }),
    getNextPageParam: (_, __, lastPageParam, ) => lastPageParam + 1,
    initialPageParam: 1
})

export const pokemonsAtom = atomWithSuspenseInfiniteQuery(() => fetchPokemonsOptions)
