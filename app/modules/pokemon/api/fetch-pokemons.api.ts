import { queryOptions, infiniteQueryOptions } from "@tanstack/react-query";
import {
  getPokemonAction,
  getAllPokemonsAction,
} from "../server/get-pokemons.server";

export const fetchAllPokemonsOptions = (search?: string ) => infiniteQueryOptions({
  queryKey: ["pokemons", search ?? ""],
    queryFn: async ({ pageParam }) => {
      const result = await getAllPokemonsAction({ data: { search, pageParam } });

      return {
        content: result.content,
        nextPage: result.pagination.page < result.pagination.totalPages ? pageParam + 1 : null,
      };
    },
    getNextPageParam: (lastPage) => lastPage.nextPage ?? undefined,
    initialPageParam: 1,
});

export const fetchPokemonOptions = (pokemonName: string) =>
  queryOptions({
    queryKey: ["pokemon", pokemonName],
    queryFn: async () => {
      console.log("Running queryFn for pokemon", pokemonName);
      return getPokemonAction({ data: pokemonName });
    },
  });
