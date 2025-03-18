import { getAllPokemonsAction } from "../server/pokemon.server";
import { infiniteQueryOptions } from "@tanstack/react-query";

export const fetchPokemons = (search = "") => {

    return infiniteQueryOptions({
        queryKey: ["pokemon", search ?? ""],
        queryFn: async ( {pageParam} ) => {
            const result = await getAllPokemonsAction({ data: { search, pageParam } })

            // TODO: cache or not cache?
            // result.content.map((pokemon) => {
            //     const pokemonKey = ["pokemon", pokemon.englishName]
            //     client.setQueryData(pokemonKey, pokemon)
            // })
        
            return {
                content: result.content,
                nextPage: result.pagination.page < result.pagination.totalPages ? pageParam + 1 : null,
            };
        
        },
        getNextPageParam: (lastPage) => lastPage.nextPage ?? undefined,
        initialPageParam: 1
    })
}