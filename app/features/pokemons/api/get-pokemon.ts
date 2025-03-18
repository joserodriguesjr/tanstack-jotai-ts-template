import { useQuery, queryOptions } from "@tanstack/react-query";
import { getPokemon } from "../server/pokemon.controller";
import type { QueryConfig } from "@/lib/react-query";

export const getPokemonQueryOptions = (pokemonName: string) => {
    return queryOptions({
        queryKey: ["pokemon", pokemonName],
        queryFn: () => getPokemon({ data: pokemonName }),
    });
}

type UsePokemonOptions = {
    queryConfig?: QueryConfig<typeof getPokemonQueryOptions>;
    pokemonName: string;
};

export const usePokemon = ({
    queryConfig,
    pokemonName
  }: UsePokemonOptions) => {
    return useQuery({
      ...getPokemonQueryOptions(pokemonName),
      ...queryConfig,
    });
};