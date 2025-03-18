import { useQuery, queryOptions } from "@tanstack/react-query";
import { useParams } from "@tanstack/react-router";
import { getPokemonAction } from "../../server/pokemon.server";

export const fetchPokemonOptions = (pokemonName: string) => {
    return queryOptions({
        queryKey: ["pokemon", pokemonName],
        queryFn: () => getPokemonAction({ data: pokemonName }),
    });
}

export const usePokemon = () => {
    const {pokemonName} = useParams({from: "/(pokemons)/pokemons_/$pokemonName"})
    
    const {data: pokemon} = useQuery({
        ...fetchPokemonOptions(pokemonName)
    })

    return pokemon
}
