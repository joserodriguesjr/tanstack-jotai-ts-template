import { QueryClient } from "@tanstack/react-query";
import type { fetchPokemon } from "./pokemon.model";

export const pokemonLoader = async (
    queryClient: QueryClient,
    pokemonName: string,
    fetchPokemonFn: (pokemonName: string) => ReturnType<typeof fetchPokemon>) => {
        queryClient.prefetchQuery(fetchPokemonFn(pokemonName))
}