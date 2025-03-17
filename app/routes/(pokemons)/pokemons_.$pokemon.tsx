import { Suspense } from "react";
import Loading from "@/components/Loading";
import { PokemonPage } from "@/modules/pokemon/pages/pokemon.page";
import { createFileRoute, redirect } from "@tanstack/react-router";
import { fetchPokemon } from "@/modules/pokemon/pokemon.model";

export const Route = createFileRoute("/(pokemons)/pokemons_/$pokemon")({
  loader: async ({
    context: { queryClient },
    params: { pokemon }
  }) => fetchPokemon(queryClient, pokemon),
  onError(err: Error) {
    throw redirect({ to: "/pokemons", replace: true, throw: err });
  },
  component: () => (
    <Suspense fallback={<Loading />}>
      <PokemonPage />
    </Suspense>
  ),
});
