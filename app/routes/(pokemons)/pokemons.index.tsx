import { Suspense } from "react";
import Loading from "@/components/Loading";
import { createFileRoute } from "@tanstack/react-router";
import { fetchAllPokemonsOptions } from "@/modules/pokemon/api/fetch-pokemons.api";
import { PokedexPage } from "@/modules/pokemon/pages/pokedex.page";

export const Route = createFileRoute("/(pokemons)/pokemons/")({
  loader: ({ context: { queryClient } }) =>
    queryClient.prefetchInfiniteQuery(fetchAllPokemonsOptions()),
  component: () => (
    <Suspense fallback={<Loading />}>
      <PokedexPage />
    </Suspense>
  ),
});
