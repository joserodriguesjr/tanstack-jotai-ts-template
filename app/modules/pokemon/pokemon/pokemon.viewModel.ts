import { useQuery } from "@tanstack/react-query";
import type { Pokemon } from "../pokemon.schema";
import { useParams } from "@tanstack/react-router";
import type { fetchPokemon } from "./pokemon.model";

export interface UsePokemonViewModelReturn {
    pokemon?: Pokemon;
}

export const usePokemonViewModel = (
    fetchPokemonFn: (pokemonName: string) => ReturnType<typeof fetchPokemon> 
): UsePokemonViewModelReturn | null => {
    const {pokemonName} = useParams({from: "/(pokemons)/pokemons_/$pokemonName"})
    
    const {data: pokemon} = useQuery(fetchPokemonFn(pokemonName))

    if (!pokemon) {
        return null
    }

    return {
        pokemon
    }
}