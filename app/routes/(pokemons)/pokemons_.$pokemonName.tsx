import { createFileRoute, redirect } from "@tanstack/react-router";
import { PokemonPage } from "@/features/pokemons/pokemon/pokemon.page";
import { fetchPokemonOptions } from "@/features/pokemons/pokemon/api/get-pokemon";

export const Route = createFileRoute("/(pokemons)/pokemons_/$pokemonName")({
  loader: async ({
    context: { queryClient },
    params: { pokemonName }
  }) => queryClient.prefetchQuery(fetchPokemonOptions(pokemonName)),
  onError(err: Error) {
    throw redirect({ to: "/pokemons", replace: true, throw: err });
  },
  component: PokemonPage,
});
