import { Suspense } from "react";
import Loading from "@/components/Loading";
import { createFileRoute } from '@tanstack/react-router'
import { fetchPokemonsOptions } from "@/modules/pokemon/api/fetchPokemons";
import { PokedexPage } from "@/modules/pokemon/pages/pokedex.page";

export const Route = createFileRoute('/(pokemons)/pokemons')({
    loader: ({ context: { queryClient } }) =>
        queryClient.prefetchInfiniteQuery(fetchPokemonsOptions),
    component: () => (
        <Suspense fallback={<Loading />}>
            <PokedexPage />
        </Suspense>
    ),
})
