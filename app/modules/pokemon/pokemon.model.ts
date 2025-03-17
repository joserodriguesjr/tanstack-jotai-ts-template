import { infiniteQueryOptions, queryOptions, useInfiniteQuery, type QueryClient } from "@tanstack/react-query";
import type { Pokemon } from "./pokemon.schema";
import { getPokemonAction, getAllPokemonsAction } from "./server/get-pokemons.server";

export const fetchPokemon = async (
  queryClient: QueryClient,
  pokemon: string
): Promise<Pokemon> => {
  // Checking if pokemon is cached
    const cachedPokemon = queryClient.getQueryData<Pokemon>(["pokemon", pokemon]);
    if (cachedPokemon) {
      console.log("[LOADER] cachedPokemon", cachedPokemon);
      return cachedPokemon;
    }
  
    // Checking if pokemon is inside cached pokemons
    const cachedPokemons = queryClient.getQueryData<{ pages: Pokemon[] }>(["pokemons"]);
    const foundPokemon = cachedPokemons?.pages
      .flatMap((page) => page)
      .find((item) => item.englishName.toLowerCase() === pokemon.toLowerCase());
  
    if (foundPokemon) {
      console.log("[LOADER] foundPokemon", foundPokemon);
      return foundPokemon;
    }
  
    // If not cached, fetch from the API
    console.log("[LOADER] fetchPokemon in API", pokemon);
    return await queryClient.ensureQueryData(
      queryOptions({
        queryKey: ["pokemon", pokemon],
        queryFn: async () => getPokemonAction({ data: pokemon }),
      })
    );
}

export const fetchPokemons = (
  search?: string
) => {
  return useInfiniteQuery(
    infiniteQueryOptions({
      queryKey: ["pokemons", search ?? ""],
      queryFn: async ({ pageParam }) => {
        const result = await getAllPokemonsAction({ data: { search, pageParam } });
  
        return {
          content: result.content,
          nextPage: result.pagination.page < result.pagination.totalPages ? pageParam + 1 : null,
        };
      },
      getNextPageParam: (lastPage) => lastPage.nextPage ?? undefined,
      initialPageParam: 1
    })
  );
};
