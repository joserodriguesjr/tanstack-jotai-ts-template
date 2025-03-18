import { queryOptions } from "@tanstack/react-query";
import { getPokemonAction } from "../server/pokemon.server";
import type { Pokemon } from "../pokemon.schema";

export const fetchPokemon = (pokemonName: string) => {
    if (!pokemonName) {
        throw new Error("Pokemon name is required");
    }

    return queryOptions<Pokemon, Error>({
        queryKey: ["pokemon", pokemonName],
        queryFn: () => getPokemonAction({ data: pokemonName }),
    });
}
